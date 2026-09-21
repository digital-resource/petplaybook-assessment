import type { Request, Response } from "express";
import { getSupabaseClient } from "../../../supabase.js";
import { requireAdminSession } from "../../../lib/adminSession.js";

export default async function handler(req: Request, res: Response) {
	res.set("Cache-Control", "no-store");
	if (!requireAdminSession(req, res)) return;

	try {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase
			.from("waitlist")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;

		const entries = (data ?? []).map((e) => ({
			id: e.id,
			email: e.email,
			createdAt: e.created_at,
		}));

		res.json({ entries, total: entries.length });
	} catch (error) {
		console.error("admin.waitlist.fetch.failed", error);
		res.status(500).json({ error: "Failed to fetch waitlist" });
	}
}
