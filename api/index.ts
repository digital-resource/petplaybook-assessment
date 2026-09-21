/**
 * Vercel serverless function entry point.
 *
 * Vercel discovers this file because it lives under /api and treats its
 * default export as a Node.js request handler. An Express app IS a valid
 * (req, res) request handler, so we import the already-bundled SSR server
 * (produced by `vite build --ssr src/server/entry.ts`, see package.json
 * "build" script and vercel.json "buildCommand") and re-export it as-is.
 *
 * `src/server/entry.ts` guards its `app.listen()` call behind
 * `!process.env.VERCEL`, so importing it here never tries to bind a port —
 * Vercel invokes the exported app directly per-request instead.
 *
 * This file is intentionally outside tsconfig.json's `include`, so it is
 * not part of `npm run type-check`; Vercel transpiles it (strips types)
 * without needing dist/server.bundle.mjs to exist at typecheck time.
 */
// @ts-expect-error - dist/server.bundle.mjs is a build artifact created by
// `npm run build` right before Vercel bundles this function; it does not
// exist in source control or at local typecheck time.
import app from "../dist/server.bundle.mjs";

export default app;
