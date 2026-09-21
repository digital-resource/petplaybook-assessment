import type { Request, Response } from "express";
import { getSupabaseClient } from "../../supabase.js";
import { sendEmail } from "../../email.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTIFY_EMAILS = ["sandy@petplaybook.ai", "michelle@petplaybook.ai"];
const POSTGRES_UNIQUE_VIOLATION = "23505";

export default async function handler(req: Request, res: Response) {
	const rawEmail = req.body?.email;
	const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

	if (!email || !EMAIL_RE.test(email)) {
		return res.status(400).json({ error: "A valid email address is required." });
	}

	// Database insert is primary — it must succeed independently of the
	// notification email below.
	try {
		const supabase = getSupabaseClient();
		const { error } = await supabase.from("waitlist").insert({ email });

		if (error) {
			if (error.code === POSTGRES_UNIQUE_VIOLATION) {
				// Already on the list — treat as success so UX stays smooth.
				return res.json({ success: true });
			}
			throw error;
		}
	} catch (error) {
		console.error("waitlist.insert.failed", error);
		return res.status(500).json({ error: "Failed to save your email. Please try again." });
	}

	// Best-effort notification; failure here must not fail the request.
	try {
		await sendEmail({
			to: NOTIFY_EMAILS,
			subject: "New PetPlaybook.ai Waitlist Signup",
			text: `A new visitor joined the waitlist:\n\n${email}\n\nLog in to view all signups.`,
			html: `<p>A new visitor joined the waitlist:</p><p><strong>${email}</strong></p>`,
		});
	} catch (error) {
		console.warn("waitlist.notify.failed", error instanceof Error ? error.message : error);
	}

	return res.json({ success: true });
}
