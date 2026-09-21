import type { Request, Response } from "express";
import { sendEmail } from "../../email.js";
import { escapeHtml } from "../../lib/escapeHtml.js";

const NOTIFY_EMAILS = ["sandy@petplaybook.ai", "michelle@petplaybook.ai"];

export default async function handler(req: Request, res: Response) {
	const { name, email, message } = req.body ?? {};

	if (!name || !email || !message) {
		return res.status(400).json({ error: "All fields are required" });
	}

	if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
		return res.status(400).json({ error: "Invalid input" });
	}

	if (name.length > 100 || email.length > 200 || message.length > 5000) {
		return res.status(400).json({ error: "Input exceeds maximum length" });
	}

	try {
		await sendEmail({
			to: NOTIFY_EMAILS,
			subject: `New Contact Form Submission from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
			html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
		});
		return res.json({ success: true });
	} catch (error) {
		console.error("contact.send.failed", error instanceof Error ? error.message : error);
		return res.status(500).json({ error: "Failed to send message" });
	}
}
