import { createFileRoute } from "@tanstack/react-router";
import SlipDressPage from "@/pages/SlipDress";

export const Route = createFileRoute("/product/slip-dress")({
  head: () => ({
    meta: [
      { title: "The Slip Dress — hertones" },
      {
        name: "description",
        content: "The hertones slip dress: effortless, skin-tone layering in six shades.",
      },
      { property: "og:title", content: "The Slip Dress — hertones" },
      {
        property: "og:description",
        content: "The hertones slip dress: effortless, skin-tone layering in six shades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SlipDressPage,
});
