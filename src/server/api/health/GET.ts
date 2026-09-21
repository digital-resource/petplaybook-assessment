import type { Request, Response } from "express";
import { getSupabaseClient } from "../../supabase.js";

export default async function handler(_req: Request, res: Response) {
	res.set("Cache-Control", "no-store");

	let databaseReachable = false;
	try {
		const supabase = getSupabaseClient();
		const { error } = await supabase.from("waitlist").select("id").limit(1);
		databaseReachable = !error;
	} catch {
		databaseReachable = false;
	}

	const ok = databaseReachable;
	res.status(ok ? 200 : 503).json({
		status: ok ? "ok" : "degraded",
		database: databaseReachable ? "reachable" : "unreachable",
		timestamp: new Date().toISOString(),
	});
}
