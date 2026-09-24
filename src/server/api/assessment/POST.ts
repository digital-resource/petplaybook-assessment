import type { Request, Response } from "express";
import { getSupabaseClient } from "../../supabase.js";
import { calculateTotalScore, getScoreBand } from "../../lib/scoreBands.js";
import { HEARD_ABOUT_OPTIONS, type HeardAboutOption } from "../../lib/heardAbout.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AssessmentBody {
	firstName?: unknown;
	lastName?: unknown;
	email?: unknown;
	heardAbout?: unknown;
	heardAboutOther?: unknown;
	answers?: unknown;
}

function isValidAnswers(answers: unknown): answers is number[] {
	if (!Array.isArray(answers) || answers.length !== 10) return false;
	return answers.every(
		(a) => typeof a === "number" && Number.isInteger(a) && a >= 1 && a <= 5,
	);
}

export default async function handler(req: Request, res: Response) {
	const body = req.body as AssessmentBody;
	const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
	const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
	const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
	const heardAbout = typeof body.heardAbout === "string" ? body.heardAbout.trim() : "";
	const heardAboutOther =
		typeof body.heardAboutOther === "string" ? body.heardAboutOther.trim() : "";

	if (!firstName || !lastName) {
		return res.status(400).json({ error: "First name and last name are required." });
	}
	if (!email || !EMAIL_RE.test(email)) {
		return res.status(400).json({ error: "A valid email address is required." });
	}
	if (!HEARD_ABOUT_OPTIONS.includes(heardAbout as HeardAboutOption)) {
		return res.status(400).json({ error: "Please tell us how you heard about us." });
	}
	if (heardAbout === "Other" && !heardAboutOther) {
		return res.status(400).json({ error: "Please tell us how you heard about us." });
	}
	if (!isValidAnswers(body.answers)) {
		return res
			.status(400)
			.json({ error: "Exactly 10 answers are required, each an integer from 1 to 5." });
	}

	const answers = body.answers;
	// Never trust a client-supplied score: always compute it server-side.
	const totalScore = calculateTotalScore(answers);
	const scoreBand = getScoreBand(totalScore);

	try {
		const supabase = getSupabaseClient();
		const { error } = await supabase.from("assessment_responses").insert({
			first_name: firstName,
			last_name: lastName,
			email,
			heard_about: heardAbout,
			heard_about_other: heardAbout === "Other" ? heardAboutOther : null,
			q1: answers[0],
			q2: answers[1],
			q3: answers[2],
			q4: answers[3],
			q5: answers[4],
			q6: answers[5],
			q7: answers[6],
			q8: answers[7],
			q9: answers[8],
			q10: answers[9],
			total_score: totalScore,
			score_band: scoreBand,
		});

		if (error) throw error;

		return res.status(201).json({ ok: true, totalScore, scoreBand });
	} catch (error) {
		console.error("assessment.insert.failed", error);
		return res.status(500).json({ error: "Failed to save your assessment. Please try again." });
	}
}
