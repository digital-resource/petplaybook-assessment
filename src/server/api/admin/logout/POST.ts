import type { Request, Response } from "express";
import { clearAdminSessionCookie } from "../../../lib/adminSession.js";

export default async function handler(_req: Request, res: Response) {
	res.set("Cache-Control", "no-store");
	clearAdminSessionCookie(res);
	res.json({ ok: true });
}
