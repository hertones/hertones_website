const BREVO_BASE = "https://api.brevo.com/v3";


/** Existing Brevo list all website signups are added to. */
export const BREVO_LIST_ID = 3;


type BrevoResult = { ok: boolean; status: number; body: string };

async function brevoFetch(path: string, init: RequestInit): Promise<BrevoResult> {
  const key = process.env["BREVO_API_KEY"];
  if (!key) return { ok: false, status: 0, body: "BREVO_API_KEY is not configured" };

  const res = await fetch(`${BREVO_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "api-key": key,
      ...(init.headers ?? {}),
    },
  });
  const body = await res.text();
  if (!res.ok) console.error(`[brevo] ${path} failed [${res.status}]: ${body}`);
  return { ok: res.ok, status: res.status, body };
}

/** Brevo needs SMS numbers in E.164; assume US/Canada for 10-digit input. */
function toE164(raw: string): string {
  if (raw.startsWith("+")) return raw;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

/** True when the email already exists as a Brevo contact. Null when the check could not run. */
export async function brevoContactExists(email: string): Promise<boolean | null> {
  try {
    const res = await brevoFetch(`/contacts/${encodeURIComponent(email)}`, { method: "GET" });
    if (res.ok) return true;
    if (res.status === 404) return false;
    return null;
  } catch (error) {
    console.error("[brevo] contact lookup threw", error);
    return null;
  }
}

/** Create or update a Brevo contact on list #3. Never throws — signup must not fail on Brevo errors. */

export async function upsertBrevoContact(input: {
  email: string;
  preference?: string | null;
  phone?: string | null;
  source?: string;
  firstName?: string | null;
}): Promise<void> {
  try {
    const attributes: Record<string, string> = {};
    if (input.firstName) attributes["FIRSTNAME"] = input.firstName;
    if (input.preference) attributes["PREFERENCE"] = input.preference;
    if (input.source) attributes["SOURCE"] = input.source;
    if (input.phone) attributes["SMS"] = toE164(input.phone);

    await brevoFetch("/contacts", {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        attributes,
        updateEnabled: true,
        listIds: [BREVO_LIST_ID],
      }),
    });
  } catch (error) {
    console.error("[brevo] contact upsert threw", error);
  }
}

// Welcome email is handled entirely by Brevo automation workflow #4 ("Welcome message"),
// which fires when a contact is added to list #3. No direct transactional send is used.

