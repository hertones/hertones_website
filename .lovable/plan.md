# Put the Hertones site live on a Cloudflare Worker

The settings in the screenshot are correct: the name is `hertones-web`, the build command is `npm run build`, and the deploy command is `npx wrangler deploy`. You don't need to change any code.

## Steps for you
1. Scroll up and check that the branch is set to `dev`. Then click **Deploy**.
2. When it finishes, open the new Worker and go to **Settings → Variables and Secrets**. Add these:
   - `BREVO_API_KEY`
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Use the same values as the two `VITE_` ones.
3. Run the deploy again so the new secrets take effect. You can click Retry, or push a small change to `dev`.
4. Open the `hertones-web...workers.dev` link and check that the homepage shows up.
5. Remove `dev-env.hertones.com` from the old **hertones-dev** Pages site. Then add it to the Worker under **Settings → Domains & Routes**.

## Steps for me
- If the deploy fails, send me the error from the build log and I'll fix the code.
- When the domain is moved, I'll check the homepage, the product pages and the signup popup on `dev-env.hertones.com`.
