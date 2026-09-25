import { createFileRoute } from "@tanstack/react-router";
import ProductDetailPage from "@/pages/ProductDetail";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Product — hertones" },
      {
        name: "description",
        content: "Leakproof hertones underwear in your skin tone.",
      },
      { property: "og:title", content: "Product — hertones" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetailPage,
});
