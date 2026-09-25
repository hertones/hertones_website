# Fix blank page on Cloudflare (dev-env.hertones.com)

## What changed in the code
- Early on, the site was a simple single-page app: an `index.html` that loaded `src/main.tsx`. Cloudflare Pages ran `npm run build`, got a ready `dist/index.html`, and it deployed perfectly.
- Around Sep 8, the project was upgraded to a server-powered setup (needed for the signup popup, Brevo and admin page). Since then `main.tsx` and the root `index.html` no longer exist, and `npm run build` produces two folders: `dist/client` (files) and `dist/server` (a Cloudflare Worker).
- Cloudflare is still configured the old way (Pages, output folder `dist`). There is no `dist/index.html` anymore, so it serves a leftover page that still points at `/src/main.tsx` — that's the exact error in your screenshot ("responded with text/html").

So the build succeeds, but Cloudflare is set up for the old style of site.

## Fix
1. Add a Cloudflare Worker config file (`wrangler.jsonc`) to the project that points to the built server and the `dist/client` files, with Node compatibility turned on.
2. Make sure the build targets Cloudflare Workers (already the default in the build tooling) and verify locally that `dist/server` and `dist/client` are produced.
3. You switch the Cloudflare deployment from **Pages** to **Workers** (Workers & Pages > Create > Import from GitHub, same repo, branch `dev`):
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Move the variables (`BREVO_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, plus `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY`) to the Worker's settings.
   - Attach `dev-env.hertones.com` to the new Worker and remove it from the old Pages project.
4. After deploy, check the homepage, the signup popup and product pages on the live domain.

## Technical details
- `wrangler.jsonc`: `name`, `main: "dist/server/index.mjs"` (exact path confirmed from a local build), `compatibility_flags: ["nodejs_compat"]`, `compatibility_date` current, `assets: { directory: "dist/client", binding: "ASSETS" }`.
- No changes to app features, design or content.
