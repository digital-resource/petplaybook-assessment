/**
 * Admin session cookie: a signed, expiring token issued after password
 * verification. Replaces sending ADMIN_PASSWORD on every admin request.
 *
 * Token format: "<expiryEpochMs>.<hex hmac-sha256 of expiryEpochMs>"
 * signed with SESSION_SECRET. No session state is stored server-side —
 * the signature and expiry are enough to trust the cookie.
 */
import type { Request, Response } from "express";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "pp_admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSessionSecret(): string {
	const secret = process.env.SESSION_SECRET;
	if (!secret) {
		throw new Error("SESSION_SECRET server environment variable is not set.");
	}
	return secret;
}

function sign(value: string, secret: string): string {
	return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken(): string {
	const secret = getSessionSecret();
	const expiresAt = String(Date.now() + SESSION_DURATION_MS);
	return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
	if (!token) return false;
	const [expiresAt, signature] = token.split(".");
	if (!expiresAt || !signature) return false;

	const secret = getSessionSecret();
	const expected = sign(expiresAt, secret);
	const expectedBuf = Buffer.from(expected, "hex");
	const actualBuf = Buffer.from(signature, "hex");
	if (expectedBuf.length !== actualBuf.length) return false;
	if (!timingSafeEqual(expectedBuf, actualBuf)) return false;

	return Date.now() < Number(expiresAt);
}

export function verifyAdminPassword(candidate: unknown): boolean {
	const adminPassword = process.env.ADMIN_PASSWORD;
	if (!adminPassword || typeof candidate !== "string" || candidate.length === 0) {
		return false;
	}
	const expectedBuf = Buffer.from(adminPassword);
	const candidateBuf = Buffer.from(candidate);
	if (expectedBuf.length !== candidateBuf.length) return false;
	return timingSafeEqual(expectedBuf, candidateBuf);
}

function parseCookies(header: string | undefined): Record<string, string> {
	const out: Record<string, string> = {};
	if (!header) return out;
	for (const part of header.split(";")) {
		const idx = part.indexOf("=");
		if (idx === -1) continue;
		const key = part.slice(0, idx).trim();
		const value = part.slice(idx + 1).trim();
		if (key) out[key] = decodeURIComponent(value);
	}
	return out;
}

export function getAdminSessionFromRequest(req: Request): string | undefined {
	return parseCookies(req.headers.cookie)[ADMIN_SESSION_COOKIE];
}

export function setAdminSessionCookie(res: Response, token: string): void {
	const secure = process.env.NODE_ENV === "production";
	const parts = [
		`${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}`,
		"HttpOnly",
		"Path=/api/admin",
		"SameSite=Lax",
		`Max-Age=${Math.floor(SESSION_DURATION_MS / 1000)}`,
	];
	if (secure) parts.push("Secure");
	res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearAdminSessionCookie(res: Response): void {
	const secure = process.env.NODE_ENV === "production";
	const parts = [
		`${ADMIN_SESSION_COOKIE}=`,
		"HttpOnly",
		"Path=/api/admin",
		"SameSite=Lax",
		"Max-Age=0",
	];
	if (secure) parts.push("Secure");
	res.setHeader("Set-Cookie", parts.join("; "));
}

/**
 * Returns true and lets the caller proceed when the request carries a
 * valid admin session. Otherwise sends 401 and returns false.
 */
export function requireAdminSession(req: Request, res: Response): boolean {
	const token = getAdminSessionFromRequest(req);
	if (!verifySessionToken(token)) {
		res.status(401).set("Cache-Control", "no-store").json({ error: "Unauthorized" });
		return false;
	}
	return true;
}
