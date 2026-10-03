# Portfolio integrations

## Web3Forms

1. Create a Web3Forms account and verify `lovemaurya1437@gmail.com` as the receiving email.
2. Create an access key for this portfolio and add it to Vercel and local `.env` as `VITE_WEB3FORMS_ACCESS_KEY`.
3. Rebuild the site. The contact form posts directly to Web3Forms and only resets after its API confirms success.

## Supabase visitor feedback

1. Create a Supabase project and run `supabase/migrations/20261003_visitor_reviews.sql` in the SQL Editor.
2. In the Supabase dashboard, review new entries in `visitor_reviews`; change `status` to `approved` or `rejected`. Only approved entries with `public_consent = true` appear on the site.
3. In Vercel project settings, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as server-side environment variables. Do not expose the service-role key to Vite or the browser.
4. Redeploy on Vercel. The `/api/feedback` endpoint validates input, uses a honeypot and a small in-memory rate limit, forces pending status, and exposes only the `public_reviews` view.

## Deploying to both sites

- **Vercel:** Add `VITE_WEB3FORMS_ACCESS_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` in Project Settings → Environment Variables, then redeploy.
- **GitHub Pages:** No email or database secret is needed. Contact uses Web3Forms directly. Feedback uses the Vercel API when Supabase is configured, otherwise it is delivered by email for manual moderation.

Feedback is moderated: a successful submission is stored with `pending` status and appears publicly only after you mark it `approved` in Supabase, with public-display consent checked.
