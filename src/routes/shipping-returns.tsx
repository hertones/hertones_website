import { createFileRoute } from "@tanstack/react-router";
import ShippingReturnsPage from "@/pages/ShippingReturns";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — hertones" },
      { name: "description", content: "Shipping times, costs, and how to return hertones products." },
      { property: "og:title", content: "Shipping & Returns — hertones" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShippingReturnsPage,
});
