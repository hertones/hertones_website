import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/BestSellers";
import SlipDressCard from "@/components/product/SlipDressCard";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Loader2, ShoppingBag } from "lucide-react";

const Collections = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(50).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navigation />
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Collection</p>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-espresso mb-4">Shop All</h1>
            <p className="font-body text-base text-muted-foreground max-w-md mx-auto">
              Cotton-focused underwear in a considered spectrum of body-tone shades.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 rounded-lg bg-oat border border-border">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-display text-lg text-foreground/60 mb-2">No products yet</p>
              <p className="font-body text-sm text-muted-foreground">Products will appear here once added to the store.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
              <SlipDressCard />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Collections;
