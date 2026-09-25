import { createFileRoute } from "@tanstack/react-router";
import CollectionsPage from "@/pages/Collections";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — hertones" },
      {
        name: "description",
        content: "Shop all hertones leakproof underwear and packs in six skin-tone shades.",
      },
      { property: "og:title", content: "Collections — hertones" },
      {
        property: "og:description",
        content: "Shop all hertones leakproof underwear and packs in six skin-tone shades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});
