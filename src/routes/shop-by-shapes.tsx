import { createFileRoute } from "@tanstack/react-router";
import ShopByShapesPage from "@/pages/ShopByShapes";

export const Route = createFileRoute("/shop-by-shapes")({
  validateSearch: (search: Record<string, unknown>) => ({
    cut: typeof search["cut"] === "string" ? (search["cut"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop by Shapes — hertones" },
      {
        name: "description",
        content: "Find your cut: brazilian bikini, high-rise french cut, boy short and the slip dress.",
      },
      { property: "og:title", content: "Shop by Shapes — hertones" },
      {
        property: "og:description",
        content: "Find your cut: brazilian bikini, high-rise french cut, boy short and the slip dress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopByShapesPage,
});
