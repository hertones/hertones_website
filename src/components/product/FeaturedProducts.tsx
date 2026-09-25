import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchProducts } from "@/lib/shopify";
import { ShoppingBag } from "lucide-react";
import { renameCut } from "@/lib/productCatalog";
import { resolveProductImage } from "@/lib/productImages";

interface FeaturedProductsProps {
  currentHandle: string;
}

const FeaturedProducts = ({ currentHandle }: FeaturedProductsProps) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts(15).then((data) => {
      // Filter out the current product and pick up to 6
      const filtered = data
        .filter((p: any) => p.node.handle !== currentHandle)
        .slice(0, 6);
      setProducts(filtered);
    });
  }, [currentHandle]);

  if (products.length === 0) return null;

  return (
    <section className="py-6 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.25em] uppercase text-accent font-body mb-2 text-center">
          Complete Your Collection
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso text-center mb-8">
          You May Also Love
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {products.map((p: any) => {
            const image = resolveProductImage(
              p.node.title,
              p.node.handle,
              p.node.images?.edges?.[0]?.node?.url
            ).url;
            const price = parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2);

            return (
              <Link
                key={p.node.handle}
                to="/product/$handle" params={{ handle: p.node.handle }}
                className="w-[180px] md:w-[220px] flex-none snap-start group"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-sand/30 mb-3">
                  {image ? (
                    <img
                      src={image}
                      alt={p.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground/20" />
                    </div>
                  )}
                </div>
                <h3 className="font-body text-xs text-foreground mb-0.5 line-clamp-1">
                  {renameCut(p.node.title)}
                </h3>
                <p className="font-display text-sm text-espresso">${price}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
