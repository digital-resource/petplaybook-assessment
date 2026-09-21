import type { Request, Response } from "express";
import { getSupabaseClient } from "../../../supabase.js";
import { requireAdminSession } from "../../../lib/adminSession.js";
import { CANONICAL_BAND_NAMES, normalizeBandLabel } from "../../../lib/scoreBands.js";

export default async function handler(req: Request, res: Response) {
	res.set("Cache-Control", "no-store");
	if (!requireAdminSession(req, res)) return;

	try {
		const supabase = getSupabaseClient();
		const { data, error } = await supabase
			.from("assessment_responses")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;

		const responses = (data ?? []).map((r) => ({
			id: r.id,
			firstName: r.first_name,
			lastName: r.last_name,
			email: r.email,
			q1: r.q1,
			q2: r.q2,
			q3: r.q3,
			q4: r.q4,
			q5: r.q5,
			q6: r.q6,
			q7: r.q7,
			q8: r.q8,
			q9: r.q9,
			q10: r.q10,
			totalScore: r.total_score,
			scoreBand: normalizeBandLabel(r.score_band),
			createdAt: r.created_at,
		}));

		const bandCounts: Record<string, number> = {};
		for (const name of CANONICAL_BAND_NAMES) bandCounts[name] = 0;
		let totalScoreSum = 0;
		for (const r of responses) {
			bandCounts[r.scoreBand] = (bandCounts[r.scoreBand] ?? 0) + 1;
			totalScoreSum += r.totalScore;
		}
		const averageScore =
			responses.length > 0 ? Math.round((totalScoreSum / responses.length) * 10) / 10 : 0;

		res.json({
			responses,
			total: responses.length,
			averageScore,
			bandCounts,
		});
	} catch (error) {
		console.error("admin.assessments.fetch.failed", error);
		res.status(500).json({ error: "Failed to fetch assessments" });
	}
}
