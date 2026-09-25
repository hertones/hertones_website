import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicSupabase() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; preference?: string; source?: string; firstName?: string }) => {
    const email = String(input?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 255) throw new Error("Invalid email address");
    const preference = String(input?.preference ?? "everything").slice(0, 64);
    const source = String(input?.source ?? "homepage_popup").slice(0, 64);
    const firstName = String(input?.firstName ?? "").trim().slice(0, 64);
    return { email, preference, source, firstName };
  })
  .handler(async ({ data }) => {
    const { upsertBrevoContact, brevoContactExists } = await import("./brevo.server");

    // Brevo's contact list is the single source of truth for duplicates.
    // This runs before any Brevo write or welcome email.
    const existsInBrevo = await brevoContactExists(data.email);
    if (existsInBrevo === true) return { ok: false as const, duplicate: true as const };
    if (existsInBrevo === null) {
      // Could not reach Brevo — fail safe rather than risk a duplicate welcome email.
      return { ok: false as const };
    }

    // Local record only mirrors the signup; never treat it as a duplicate
    // (Brevo already said this is a new contact).
    const { error } = await publicSupabase()
      .from("newsletter_subscribers")
      .insert({ email: data.email, preference: data.preference, source: data.source });

    if (error && error.code !== "23505") {
      console.error("[newsletter] insert failed", error);
    }

    await upsertBrevoContact({
      email: data.email,
      preference: data.preference,
      source: data.source,
      firstName: data.firstName || null,
    });
    // Welcome email is sent by Brevo automation workflow #4 ("Welcome message"),
    // triggered by the contact being added to the list above. No direct send here.

    return { ok: true as const };
  });

export const subscribePhone = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; phone: string }) => {
    const email = String(input?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 255) throw new Error("Invalid email address");
    const phone = String(input?.phone ?? "").replace(/\D/g, "");
    if (phone.length < 10 || phone.length > 15) throw new Error("Invalid phone number");
    return { email, phone };
  })
  .handler(async ({ data }) => {
    const { error } = await publicSupabase()
      .from("sms_subscribers")
      .insert({ email: data.email, phone: data.phone, source: "homepage_popup" });

    if (error && error.code !== "23505") {
      console.error("[newsletter] sms insert failed", error);
      return { ok: false as const };
    }

    const { upsertBrevoContact } = await import("./brevo.server");
    await upsertBrevoContact({ email: data.email, phone: data.phone, source: "homepage_popup" });

    return { ok: true as const };
  });
