import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/BestSellers";
import SlipDressCard from "@/components/product/SlipDressCard";
import { Loader2, ShoppingBag } from "lucide-react";
import { ACTIVE_CUTS, SLIP_DRESS } from "@/lib/productCatalog";

const ShopByShapes = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const search = useSearch({ strict: false }) as { cut?: string };
  const [activeShape, setActiveShape] = useState<string | null>(search.cut ?? null);

  // Keep the selected cut in sync when the URL search param changes
  // (e.g. picking a different cut from the Shop dropdown while on this page)
  useEffect(() => {
    if (search.cut) setActiveShape(search.cut);
  }, [search.cut]);

  useEffect(() => {
    fetchProducts(50)
      .then((p) => {
        setProducts(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cutDef = activeShape ? ACTIVE_CUTS.find((c) => c.key === activeShape) : null;
  const showSlipDress = activeShape === SLIP_DRESS.key;
  const filtered = showSlipDress
    ? []
    : cutDef
      ? products.filter((p) => {
          const t = p.node.title.toLowerCase();
          return cutDef.matchTokens.some((tok) => t.includes(tok));
        })
      : products;

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navigation />
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Collection</p>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-espresso mb-4">Shop by Cut</h1>
            <p className="font-body text-base text-muted-foreground max-w-md mx-auto">
              Three essential silhouettes in Cotton-focused construction.
            </p>
          </div>

          {/* Shape filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveShape(null)}
              className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${activeShape === null ? "bg-espresso text-white" : "bg-sand text-espresso hover:bg-espresso/10"}`}
            >
              All Cuts
            </button>
            {ACTIVE_CUTS.map((cut) => (
              <button
                key={cut.key}
                onClick={() => setActiveShape(cut.key)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${activeShape === cut.key ? "bg-espresso text-white" : "bg-sand text-espresso hover:bg-espresso/10"}`}
              >
                {cut.name}
              </button>
            ))}
            <button
              onClick={() => setActiveShape(SLIP_DRESS.key)}
              className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${activeShape === SLIP_DRESS.key ? "bg-espresso text-white" : "bg-sand text-espresso hover:bg-espresso/10"}`}
            >
              {SLIP_DRESS.name}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
            </div>
          ) : filtered.length === 0 && !showSlipDress ? (
            <div className="text-center py-20 rounded-lg bg-oat border border-border">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-display text-lg text-foreground/60 mb-2">
                No products found
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Products will appear here once added to the store.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.node.id} product={product} preferModelImage />
              ))}
              {showSlipDress && <SlipDressCard />}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ShopByShapes;
