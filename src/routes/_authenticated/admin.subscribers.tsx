import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSubscribers } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/subscribers")({
  component: SubscribersPage,
  head: () => ({
    meta: [
      { title: "Launch List | hertones Admin" },
      { name: "description", content: "Private admin view of hertones email and text signups." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Launch List | hertones Admin" },
      { property: "og:description", content: "Private admin view of hertones signups." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function toCsv(rows: Record<string, unknown>[], columns: string[]) {
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [columns.join(","), ...rows.map((r) => columns.map((c) => escape(r[c])).join(","))].join("\n");
}

function download(name: string, contents: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function SubscribersPage() {
  const navigate = useNavigate();
  const fetchSubscribers = useServerFn(getSubscribers);
  const [tab, setTab] = useState<"emails" | "texts">("emails");
  const [search, setSearch] = useState("");
  const [newest, setNewest] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-subscribers"],
    queryFn: () => fetchSubscribers(),
  });

  const rows = useMemo(() => {
    const list: Record<string, unknown>[] = tab === "emails" ? (data?.emails ?? []) : (data?.texts ?? []);
    const q = search.trim().toLowerCase();
    const filtered = q
      ? list.filter((r) => JSON.stringify(r).toLowerCase().includes(q))
      : list;
    return [...filtered].sort((a, b) => {
      const da = new Date(String(a["created_at"])).getTime();
      const db = new Date(String(b["created_at"])).getTime();
      return newest ? db - da : da - db;
    });
  }, [data, tab, search, newest]);

  const columns = tab === "emails" ? ["email", "preference", "source", "created_at"] : ["email", "phone", "source", "created_at"];

  if (isLoading) {
    return <main className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</main>;
  }

  if (!data?.isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center px-6 text-center">
        <div>
          <h1 className="font-serif text-2xl mb-2">No access</h1>
          <p className="text-sm text-muted-foreground">This account isn't approved to view the launch list.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-serif text-3xl">Launch list</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="text-xs tracking-wide underline text-muted-foreground"
          >
            Sign out
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {(["emails", "texts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs tracking-wide border ${
                tab === t ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {t === "emails" ? `Email signups (${data.emails.length})` : `Text signups (${data.texts.length})`}
            </button>
          ))}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="border border-border bg-transparent px-3 py-2 text-xs outline-none focus:border-foreground"
          />
          <button onClick={() => setNewest((v) => !v)} className="text-xs underline text-muted-foreground">
            {newest ? "Newest first" : "Oldest first"}
          </button>
          <button
            onClick={() => download(`hertones-${tab}.csv`, toCsv(rows, columns))}
            className="ml-auto bg-foreground text-background px-4 py-2 text-xs tracking-wide"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40">
              <tr>
                {columns.map((c) => (
                  <th key={c} className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">
                    {c.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                    Nothing here yet.
                  </td>
                </tr>
              )}
              {rows.map((r, i) => (
                <tr key={String(r["id"] ?? i)} className="border-t border-border">
                  {columns.map((c) => (
                    <td key={c} className="px-4 py-3">
                      {c === "created_at"
                        ? new Date(String(r[c])).toLocaleString()
                        : String(r[c] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
