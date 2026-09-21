/**
 * Server-only Supabase client.
 *
 * Uses the service role key, which bypasses Row Level Security. This file
 * must never be imported from client/browser code — only from files under
 * src/server. The service role key must never be exposed with a VITE_
 * prefix or otherwise shipped to the browser bundle.
 *
 * Construction is lazy so importing this module (e.g. transitively, via
 * API handler imports in tests) does not throw when env vars aren't set;
 * the error only surfaces when a request actually needs the database.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
	if (cached) return cached;

	const url = process.env.SUPABASE_URL;
	const secretKey = process.env.SUPABASE_SECRET_KEY;

	if (!url || !secretKey) {
		throw new Error(
			"Supabase is not configured: SUPABASE_URL and SUPABASE_SECRET_KEY must be set as server environment variables.",
		);
	}

	cached = createClient(url, secretKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	});
	return cached;
}
