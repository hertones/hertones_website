import { createFileRoute } from "@tanstack/react-router";
import TermsOfServicePage from "@/pages/TermsOfService";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — hertones" },
      { name: "description", content: "The terms that govern your use of hertones." },
      { property: "og:title", content: "Terms of Service — hertones" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsOfServicePage,
});
