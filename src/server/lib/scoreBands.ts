/**
 * Canonical assessment score bands.
 *
 * Source of truth: the wording shown to users in public/assessment.html.
 * The server, the admin dashboard, and new database rows must all agree
 * with these labels and ranges so admin statistics never split one score
 * range across multiple category names.
 */
export interface ScoreBand {
	min: number;
	max: number;
	name: string;
}

export const SCORE_BANDS: ScoreBand[] = [
	{ min: 40, max: 50, name: "Continuity Champion" },
	{ min: 30, max: 39, name: "Strong Foundation" },
	{ min: 20, max: 29, name: "Important Gaps to Fill" },
	{ min: 0, max: 19, name: "Your Pet Depends on You" },
];

export const CANONICAL_BAND_NAMES = SCORE_BANDS.map((b) => b.name);

/**
 * Legacy label -> canonical label, for normalizing rows imported from the
 * old GoDaddy/Airo MySQL database, which used different band names for the
 * same score ranges.
 */
export const LEGACY_BAND_ALIASES: Record<string, string> = {
	"Care Continuity Champion": "Continuity Champion",
	"Needs Attention": "Important Gaps to Fill",
};

export function getScoreBand(totalScore: number): string {
	const band = SCORE_BANDS.find((b) => totalScore >= b.min && totalScore <= b.max);
	if (!band) {
		throw new Error(`No score band configured for total score ${totalScore}`);
	}
	return band.name;
}

export function calculateTotalScore(answers: number[]): number {
	return answers.reduce((sum, value) => sum + value, 0);
}

export function normalizeBandLabel(label: string): string {
	return LEGACY_BAND_ALIASES[label] ?? label;
}
