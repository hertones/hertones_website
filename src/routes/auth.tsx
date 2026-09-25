import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Team Sign In | hertones" },
      { name: "description", content: "Private sign-in for the hertones team to manage the launch list." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Team Sign In | hertones" },
      { property: "og:description", content: "Private sign-in for the hertones team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/subscribers" });
    });
  }, [navigate]);

  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const creds = { email: email.trim(), password };
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword(creds)
        : await supabase.auth.signUp({
            ...creds,
            options: { emailRedirectTo: `${window.location.origin}/auth` },
          });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (mode === "signup") {
      toast.success("Account created. Ask for admin access to view the list.");
    }
    navigate({ to: "/admin/subscribers" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl mb-2">{mode === "signin" ? "Team sign in" : "Create account"}</h1>
        <p className="text-sm text-muted-foreground mb-8">Access the hertones launch list.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-foreground text-background py-3 text-sm tracking-wide disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-xs underline text-muted-foreground"
          >
            {mode === "signin" ? "Create an account" : "I already have an account"}
          </button>
        </form>
      </div>
    </main>
  );

}
