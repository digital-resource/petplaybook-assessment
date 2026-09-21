import express, { type NextFunction, type Request, type Response } from "express";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";
import { readFileSync } from "node:fs";

// <api-imports>
import admin_assessments_get_0 from "./api/admin/assessments/GET";
import admin_waitlist_get_1 from "./api/admin/waitlist/GET";
import admin_login_post from "./api/admin/login/POST";
import admin_logout_post from "./api/admin/logout/POST";
import assessment_post_2 from "./api/assessment/POST";
import contact_post_3 from "./api/contact/POST";
import health_get_4 from "./api/health/GET";
import waitlist_post_5 from "./api/waitlist/POST";
// </api-imports>
import { seoRoutes } from "../lib/seo-routes";

// Origins allowed to iframe-embed this app (e.g. the assessment embedded
// on the marketing site). Configurable per-environment; defaults cover
// the eventual petplaybook.com embed without opening this up to every
// site on the internet. Does not apply to /admin.
const FRAME_ANCESTORS = (
	process.env.FRAME_ANCESTORS ?? "'self' https://petplaybook.com https://www.petplaybook.com"
).trim();

function normalizeCommerceApiBaseUrlEnv() {
	if (process.env.GODADDY_API_BASE_URL) return;
	const hostOnly = process.env.VITE_GODADDY_API_HOST;
	if (!hostOnly) return;
	const normalizedHost = hostOnly.replace(/^https?:\/\//, "").trim();
	if (!normalizedHost) return;
	process.env.GODADDY_API_BASE_URL = `https://${normalizedHost}`;
}

normalizeCommerceApiBaseUrlEnv();

const app = express();

// Honour x-forwarded-* from the load balancer so req.protocol/req.hostname
// reflect the public-facing values. Express-maintained parsing respects the
// existing trust-proxy config; direct header reads would let a client spoof
// the sitemap origin in robots.txt.
app.set("trust proxy", true);

// Request bodies here are small forms (assessment answers, one email, a
// contact message) — 100kb is generous headroom without allowing large
// uploads through routes never meant to accept them.
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Deliberate CSP frame-ancestors instead of X-Frame-Options: DENY, so the
// assessment can later be embedded on petplaybook.com. /admin opts out
// below since it should never be embeddable.
app.use((req, res, next) => {
	const frameAncestors = req.path.startsWith("/admin") ? "'none'" : FRAME_ANCESTORS;
	res.set("Content-Security-Policy", `frame-ancestors ${frameAncestors}`);
	res.set("X-Content-Type-Options", "nosniff");
	res.set("Referrer-Policy", "strict-origin-when-cross-origin");
	next();
});

// <api-registrations>
app.get("/api/admin/assessments", admin_assessments_get_0);
app.get("/api/admin/waitlist", admin_waitlist_get_1);
app.post("/api/admin/login", admin_login_post);
app.post("/api/admin/logout", admin_logout_post);
app.post("/api/assessment", assessment_post_2);
app.post("/api/contact", contact_post_3);
app.get("/api/health", health_get_4);
app.post("/api/waitlist", waitlist_post_5);
// </api-registrations>

// Clean URL for the standalone assessment page
app.get("/assessment", (_req, res) => {
	res.redirect(301, "/assessment.html");
});

// Error middleware must be registered AFTER the routes it protects; Express
// only passes errors to middleware defined later in the stack.
app.use("/api", (err: unknown, req: Request, res: Response, _next: NextFunction) => {
	// Always respond JSON on /api so clients parsing response.json() don't
	// receive Express's default HTML error page for non-Error throws.
	console.error("ssr.api.error", {
		url: req.url,
		error: err instanceof Error ? err.stack : String(err),
	});
	res.status(500).json({ error: "Internal server error" });
});

function baseUrl(req: Request): string {
	const env = process.env.PUBLIC_URL || process.env.SITE_URL;
	if (env) return env.replace(/\/+$/, "");
	return `${req.protocol}://${req.hostname}`;
}

function escapeXml(s: string): string {
	return s.replace(/[&<>"']/g, (c) =>
		({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!,
	);
}

app.get("/robots.txt", (req, res) => {
	const base = baseUrl(req);
	const body = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /admin",
		"",
		`Sitemap: ${base}/sitemap.xml`,
		"",
	].join("\n");
	res.type("text/plain").set("Cache-Control", "public, max-age=3600").send(body);
});

app.get("/sitemap.xml", (req, res) => {
	const base = baseUrl(req);
	const urls = seoRoutes
		.filter((r) => typeof r.path === "string" && r.path.startsWith("/"))
		.map((r) => {
			const loc = `${base}${r.path}`;
			const parts = [`    <loc>${escapeXml(loc)}</loc>`];
			if (r.lastmod) parts.push(`    <lastmod>${escapeXml(r.lastmod)}</lastmod>`);
			if (r.changefreq) parts.push(`    <changefreq>${r.changefreq}</changefreq>`);
			if (r.priority !== undefined)
				parts.push(`    <priority>${r.priority.toFixed(1)}</priority>`);
			return `  <url>\n${parts.join("\n")}\n  </url>`;
		})
		.join("\n");
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	res.type("application/xml").set("Cache-Control", "public, max-age=3600").send(body);
});

export function renderSsrDocument(
	template: string,
	result: { head: string; html: string },
	adsense: { scriptHtml: string },
): string {
	const headContent = adsense.scriptHtml
		? `${result.head}\n${adsense.scriptHtml}`
		: result.head;
	return template
		.replace("<!--app-head-->", () => headContent)
		.replace("<!--app-html-->", () => result.html);
}

type AdSenseTextConfig = {
	publisherId: string | null;
	scriptHtml: string;
	adsTxt: string | null;
	appAdsTxt: string | null;
};

export function registerAdSenseTextRoutes(app: import("express").Express, config: AdSenseTextConfig): void {
	app.get("/ads.txt", (_req, res) => {
		res.type("text/plain").set("Cache-Control", "no-cache");
		if (config.adsTxt) {
			res.status(200).send(config.adsTxt);
		} else {
			res.status(404).send("");
		}
	});
	app.get("/app-ads.txt", (_req, res) => {
		res.type("text/plain").set("Cache-Control", "no-cache");
		if (config.appAdsTxt) {
			res.status(200).send(config.appAdsTxt);
		} else {
			res.status(404).send("");
		}
	});
}


// process.env.NODE_ENV (not import.meta.env.PROD) so this branch behaves
// the same whether the app is loaded from the Vite SSR bundle or imported
// directly by the Vercel function wrapper in api/index.ts.
if (process.env.NODE_ENV === "production") {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const clientDir = join(__dirname, "client");

	app.use(
		express.static(clientDir, {
			index: false,
			setHeaders(res, filePath) {
				res.set(
					"Cache-Control",
					filePath.includes("/assets/")
						? "public, max-age=31536000, immutable"
						: "no-cache",
				);
			},
		}),
	);

	app.use((_req, res, next) => {
		res.set("Cache-Control", "no-cache");
		next();
	});

	let template: string;
	try {
		template = readFileSync(join(clientDir, "index.html"), "utf-8");
	} catch (err) {
		console.error("ssr.template.load-failed", {
			path: join(clientDir, "index.html"),
			error: err instanceof Error ? err.message : String(err),
		});
		process.exit(1);
	}
	if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
		// Fail fast at boot, same as a template load failure above: without
		// markers, every .replace() call on the render path is a no-op and we
		// would serve a shell with no <head> content and no rendered body on
		// every request. Preferring process.exit over a degraded mode ensures
		// an operator notices and fixes the build rather than serving broken
		// SEO-invisible pages indefinitely.
		console.error("ssr.template.markers-missing", {
			hasHead: template.includes("<!--app-head-->"),
			hasHtml: template.includes("<!--app-html-->"),
		});
		process.exit(1);
	}
	const fallbackShell = template
		.replace("<!--app-head-->", "")
		.replace("<!--app-html-->", "");

	// Resolve the SSR module once into a stable render function. A failed
	// load is unrecoverable at runtime - exiting lets the container
	// scheduler restart with a clean slate rather than leaving the server
	// to serve silent 503s indefinitely against a single startup log.
	type RenderResult = {
		html: string;
		head: string;
		status: number;
		redirect?: string;
	};
	let renderFn: ((url: string) => Promise<RenderResult>) | null = null;
	const SSR_MODULE_LOAD_TIMEOUT_MS = 30_000;
	const loadTimeout = setTimeout(() => {
		if (renderFn !== null) return;
		console.error("ssr.module.load-timeout", {
			timeoutMs: SSR_MODULE_LOAD_TIMEOUT_MS,
		});
		process.exit(1);
	}, SSR_MODULE_LOAD_TIMEOUT_MS);
	loadTimeout.unref();
	// Fixed SSR module import; this exact call is also the server-render anchor.
	import("../entry-server").then(
		(mod) => {
			clearTimeout(loadTimeout);
			renderFn = mod.render;
		},
		(err) => {
			clearTimeout(loadTimeout);
			console.error("ssr.module.load-failed", {
				error: err instanceof Error ? err.stack : String(err),
			});
			process.exit(1);
		},
	);

	app.get(/.*/, async (req, res, next) => {
		if (req.method !== "GET") return next();
		if (req.path.startsWith("/api")) return next();
		if (extname(req.path)) return next();
		const sendFallback = () =>
			res
				.status(503)
				.set("Content-Type", "text/html; charset=utf-8")
				.set("Cache-Control", "no-store")
				.send(fallbackShell);
		if (renderFn === null) {
			// Module not yet resolved; fall back without logging to avoid startup
			// noise before the first render is even possible. A terminal load
			// failure (import reject or 30s timeout) process.exit(1)s from the
			// loader above, so this branch is only the brief warmup window.
			return sendFallback();
		}
		try {
			const result = await renderFn(req.url);
			if (result.redirect) {
				// Redirect thrown from a loader/action surfaces as a Response.
				// Forward it so the browser actually navigates to the new URL
				// instead of seeing an empty shell with a stale status.
				res.redirect(result.status, result.redirect);
				return;
			}
			if (!result.html) {
				// A non-redirect Response was thrown from a loader (e.g.
				// `throw new Response(null, { status: 404 })`). renderToString
				// produced no markup, so we have a real status but no body.
				// Log so the case is observable in ops dashboards, and mark
				// no-store so CDNs don't cache an empty page as a valid hit.
				// User-visible 404 / error pages should come from a route
				// errorElement, not from this fallback path.
				console.error("ssr.render.error-response", {
					url: req.url,
					status: result.status,
				});
				res
					.status(result.status)
					.set("Content-Type", "text/html; charset=utf-8")
					.set("Cache-Control", "no-store")
					.send(fallbackShell);
				return;
			}
			// Function replacements disable String.replace's $-special sequences
			// ($&, $', $`, $$) so user-authored titles / JSON-LD like
			// "Save $& today" insert literally instead of being interpolated.
			const out = template
				.replace("<!--app-head-->", () => result.head)
				.replace("<!--app-html-->", () => result.html);
			res
				.status(result.status)
				.set("Content-Type", "text/html; charset=utf-8")
				.set("Cache-Control", "no-cache")
				.send(out);
		} catch (err) {
			// 503 surfaces the failure in CDN/monitoring without caching a broken
			// page as success. console.error (not warn) puts it at the right log
			// level for the observability pipeline to alert on.
			console.error("ssr.render.failed", {
				url: req.url,
				// Log the full stack — React's renderToString annotates it with
				// the failing component's call tree, which the message alone
				// discards.
				error: err instanceof Error ? err.stack : String(err),
			});
			sendFallback();
		}
	});

	// The Supabase client is plain HTTP (no persistent connection pool), so
	// there is nothing to close on shutdown the way the old MySQL pool
	// required.
	(["SIGTERM", "SIGINT"] as const).forEach((signal) => {
		process.once(signal, () => {
			console.log(`Got ${signal}, shutting down gracefully...`);
			process.exit(0);
		});
	});

	// Vercel imports this module's default export (the Express app) into
	// its own serverless function wrapper; it must never call app.listen()
	// itself. Everything above this guard (static assets, SSR render
	// route) still runs, since Vercel's function handler dispatches
	// requests into the same `app`.
	if (!process.env.VERCEL) {
		const rawPort = process.env.PORT || "3000";
		const port = parseInt(rawPort, 10);
		if (!Number.isInteger(port) || port <= 0 || port > 65535) {
			// parseInt("abc") returns NaN; passing that to app.listen throws
			// synchronously before the server.on("error") handler below can catch
			// it. Fail fast with an actionable log rather than a cryptic crash.
			console.error("ssr.server.invalid-port", { rawPort });
			process.exit(1);
		}
		const host = process.env.HOST || "0.0.0.0";
		const server = app.listen(port, host, () => {
			console.log(`Server listening on http://${host}:${port}`);
		});
		server.on("error", (err: NodeJS.ErrnoException) => {
			console.error("ssr.server.listen-failed", {
				port,
				host,
				code: err.code,
				error: err.message,
			});
			process.exit(1);
		});
	}
}

export default app;
