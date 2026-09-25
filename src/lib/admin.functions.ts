import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type EmailSubscriber = {
  id: string;
  email: string;
  preference: string | null;
  source: string;
  created_at: string;
};

export type SmsSubscriber = {
  id: string;
  email: string;
  phone: string;
  source: string;
  created_at: string;
};

export const getSubscribers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roleRow } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      return { isAdmin: false as const, emails: [] as EmailSubscriber[], texts: [] as SmsSubscriber[] };
    }

    const [emailsRes, textsRes] = await Promise.all([
      context.supabase
        .from("newsletter_subscribers")
        .select("id, email, preference, source, created_at")
        .order("created_at", { ascending: false }),
      context.supabase
        .from("sms_subscribers")
        .select("id, email, phone, source, created_at")
        .order("created_at", { ascending: false }),
    ]);

    if (emailsRes.error) console.error("[admin] emails read failed", emailsRes.error);
    if (textsRes.error) console.error("[admin] texts read failed", textsRes.error);

    return {
      isAdmin: true as const,
      emails: (emailsRes.data ?? []) as EmailSubscriber[],
      texts: (textsRes.data ?? []) as SmsSubscriber[],
    };
  });
