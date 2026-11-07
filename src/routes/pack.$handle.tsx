import { createFileRoute } from "@tanstack/react-router";
import PackDetailPage from "@/pages/PackDetail";

export const Route = createFileRoute("/pack/$handle")({
  head: () => ({
    meta: [
      { title: "Pack — hertones" },
      {
        name: "description",
        content:
          "Choose your cut — Bikini, French Cut, or Boy Short — and every pair in your hertones pack comes in it.",
      },
      { property: "og:title", content: "Pack — hertones" },
      {
        property: "og:description",
        content:
          "Choose your cut — Bikini, French Cut, or Boy Short — and every pair in your hertones pack comes in it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackDetailPage,
});
