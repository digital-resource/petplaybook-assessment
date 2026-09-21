/**
 * Transactional email abstraction.
 *
 * Replaces the old GoDaddy/Airo local email gateway (127.0.0.1:2525),
 * which only existed inside Airo preview/publish containers and is not
 * reachable on Vercel.
 *
 * Uses the Resend HTTP API directly (no SDK dependency) when
 * RESEND_API_KEY is configured. When it isn't configured, sending is
 * treated as "not available": callers that already isolate notification
 * email from primary database writes (see waitlist POST) keep working
 * without email; callers whose whole purpose is sending email (contact
 * form) will surface a clear error to the caller instead of silently
 * pretending to succeed.
 */

const RESEND_API_URL = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 10_000;

export type SendEmailInput = {
	to: string | string[];
	cc?: string | string[];
	bcc?: string | string[];
	subject: string;
	text?: string;
	html?: string;
	replyTo?: string;
	from?: string;
};

export type SendEmailResult = {
	messageId: string;
};

function toArray(value: string | string[] | undefined): string[] {
	if (value === undefined) return [];
	return Array.isArray(value) ? value : [value];
}

export function isEmailConfigured(): boolean {
	return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
	const apiKey = process.env.RESEND_API_KEY;
	const from = input.from ?? process.env.EMAIL_FROM;

	if (!apiKey || !from) {
		console.warn(
			"email.not-configured",
			"Set RESEND_API_KEY and EMAIL_FROM server environment variables to enable outbound email.",
		);
		throw new Error("Email is not configured on this deployment.");
	}

	const payload: Record<string, unknown> = {
		from,
		to: toArray(input.to),
		subject: input.subject,
	};
	const cc = toArray(input.cc);
	if (cc.length > 0) payload.cc = cc;
	const bcc = toArray(input.bcc);
	if (bcc.length > 0) payload.bcc = bcc;
	if (input.text) payload.text = input.text;
	if (input.html) payload.html = input.html;
	if (input.replyTo) payload.reply_to = input.replyTo;

	let response: Response;
	try {
		response = await fetch(RESEND_API_URL, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		});
	} catch (err) {
		throw new Error(`email provider unreachable: ${describeError(err)}`);
	}

	let body: { id?: string; message?: string } = {};
	try {
		body = await response.json();
	} catch {
		// Non-JSON error body; fall through to the status-based error below.
	}

	if (!response.ok || !body.id) {
		throw new Error(`email send failed: ${body.message ?? `HTTP ${response.status}`}`);
	}

	return { messageId: body.id };
}

function describeError(err: unknown): string {
	if (err instanceof Error) {
		if (err.name === "AbortError" || err.name === "TimeoutError") {
			return `timed out after ${REQUEST_TIMEOUT_MS}ms`;
		}
		return err.message;
	}
	return String(err);
}
