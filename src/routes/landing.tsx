import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/pages/Landing";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "hertones — Made for Your Tone" },
      {
        name: "description",
        content: "Discover hertones: leakproof essentials in shades made for your skin.",
      },
      { property: "og:title", content: "hertones — Made for Your Tone" },
      {
        property: "og:description",
        content: "Discover hertones: leakproof essentials in shades made for your skin.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
