import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "hertones — Leakproof Underwear in Your Skin Tone" },
      {
        name: "description",
        content:
          "Period-proof, leakproof underwear designed in six skin-tone shades. Comfort that disappears into you.",
      },
      { property: "og:title", content: "hertones — Leakproof Underwear in Your Skin Tone" },
      {
        property: "og:description",
        content:
          "Period-proof, leakproof underwear designed in six skin-tone shades. Comfort that disappears into you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
