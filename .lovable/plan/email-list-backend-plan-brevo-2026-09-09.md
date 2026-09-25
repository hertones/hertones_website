# Email List Backend Plan (Brevo)

Connect the signup popup to Brevo, plus a private admin page to view and export subscribers.

## 1. Brevo connection

- Store the Brevo API key as a project secret named `BREVO_API_KEY` (server-side only, never in the code or the browser).
- Security note: the key was pasted in chat, so it should be regenerated in Brevo once things work; the new one gets saved through the secure secret form.
- All Brevo calls happen in server code — the browser never sees the key.

## 2. Signup popup → Brevo

- Keep saving every signup in the app database (so you always own your list even if Brevo changes).
- On email submit, the server also:
  - Creates/updates the contact in Brevo with their style preference as an attribute
  - Adds them to a "Hertones Launch List" in Brevo
- On phone submit (step 2), the same contact is updated in Brevo with their SMS number so you can text them later.
- Duplicate signups update the existing Brevo contact instead of erroring.
- If Brevo is briefly unavailable, the signup still succeeds — the visitor never sees a failure.

## 3. Welcome email

- A branded welcome email (espresso/ivory, hertones wordmark) sent through Brevo right after email signup.
- Requires a verified sender in Brevo (their guided sender/domain step) — until that's done, contacts are still collected, just no welcome email goes out.

## 4. Admin page — view & export the list

- Sign-in (email + password) with an admin role stored securely, so only approved team members get in.
- Private page at `/admin/subscribers` showing email signups (email, preference, date, source) and text signups (email, phone, date), with search, date sorting, and a **Download CSV** button.
- Public can still subscribe; only admins can read the list.

## 5. Launch announcements

Bulk launch blasts are sent from Brevo's own campaign tools, using the list the popup is now feeding automatically — the app itself doesn't send mass marketing email.

## Technical details

- `BREVO_API_KEY` project secret; Brevo calls via `createServerFn` server functions (`POST /v3/contacts`, `POST /v3/smtp/email`), never from the client.
- Popup submit path moves from a direct client insert to a server function that does the database insert plus the Brevo sync.
- `user_roles` table + `has_role()` security-definer function; admin-only RLS SELECT policies on `newsletter_subscribers` / `sms_subscribers`; `/auth` route and `_authenticated` layout for `/admin/*`.

## Order of work

1. Save `BREVO_API_KEY` and wire popup signups into Brevo contacts/lists
2. Welcome email through Brevo (after sender verification)
3. Admin sign-in, roles, subscribers page with CSV export
4. Rotate the exposed Brevo key
