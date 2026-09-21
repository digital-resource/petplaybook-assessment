import type { Request, Response } from "express";
import {
	createSessionToken,
	setAdminSessionCookie,
	verifyAdminPassword,
} from "../../../lib/adminSession.js";

export default async function handler(req: Request, res: Response) {
	res.set("Cache-Control", "no-store");

	const password = req.body?.password;

	if (!verifyAdminPassword(password)) {
		return res.status(401).json({ error: "Incorrect password." });
	}

	const token = createSessionToken();
	setAdminSessionCookie(res, token);
	res.json({ ok: true });
}
