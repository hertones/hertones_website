import { createFileRoute } from "@tanstack/react-router";
import PacksPage from "@/pages/Packs";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Packs — hertones" },
      {
        name: "description",
        content:
          "Stock up and save with hertones packs: 3-Pack Cotton Essentials, 6-Pack Foundation Set, and 12-Pack The Full Kit — every pair in the cut you choose.",
      },
      { property: "og:title", content: "Packs — hertones" },
      {
        property: "og:description",
        content:
          "Stock up and save with hertones packs: 3-Pack Cotton Essentials, 6-Pack Foundation Set, and 12-Pack The Full Kit — every pair in the cut you choose.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PacksPage,
});
