/**
 * Canonical "How did you hear about us?" options.
 *
 * Source of truth: the dropdown shown to users in public/assessment.html.
 * The server and the admin dashboard must all agree with this list so
 * admin statistics never split one source across multiple labels.
 */
export const HEARD_ABOUT_OPTIONS = [
	"Instagram",
	"Facebook",
	"TikTok",
	"Google Search",
	"A friend or family member",
	"Veterinarian or pet professional",
	"Podcast or blog",
	"Other",
] as const;

export type HeardAboutOption = (typeof HEARD_ABOUT_OPTIONS)[number];

export const NOT_PROVIDED_LABEL = "Not provided";
