import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { ACTIVE_CUTS, renameCut } from "@/lib/productCatalog";
import { getModelImageForProduct, resolveProductImage } from "@/lib/productImages";
const flowLightImg = "/images/flow-light.jpg";
const flowMediumImg = "/images/flow-medium.jpg";
const flowHeavyImg = "/images/flow-heavy.jpg";
const ProductCard = ({ product, preferModelImage = false, className = "", imageContainerClassName = "" }: { product: ShopifyProduct; preferModelImage?: boolean; className?: string; imageContainerClassName?: string }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const productImage = resolveProductImage(product.node.title, product.node.handle, image?.url, image?.altText);
  const cardImage = preferModelImage
    ? getModelImageForProduct(product.node.title, product.node.handle) || productImage
    : productImage;


  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Pre-Order Added to Bag", { description: product.node.title });
  };

  return (
    <Link to="/product/$handle" params={{ handle: product.node.handle }} className={`group block ${className}`}>
      <div className={`rounded-lg bg-sand/40 border border-border overflow-hidden mb-4 relative ${imageContainerClassName || "aspect-[3/4]"}`}>
        <img
          src={cardImage.url}
          alt={cardImage.alt}
          loading="lazy"
          decoding="async"
          width={640}
          height={800}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <button
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="absolute bottom-3 right-3 h-9 px-4 bg-espresso text-primary-foreground text-xs font-body tracking-wide rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-espresso/90 disabled:opacity-50 flex items-center gap-1.5"
        >
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Pre-Order Now"}
        </button>
      </div>
      <h3 className="font-display text-sm font-medium text-espresso mb-1">{renameCut(product.node.title)}</h3>
      <p className="font-body text-sm text-muted-foreground">${parseFloat(price.amount).toFixed(2)}</p>
    </Link>
  );
};

/* ─── Mobile hero card: full-bleed image + overlay copy ─── */
const MobileHeroCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;

  return (
    <Link to="/product/$handle" params={{ handle: product.node.handle }} className="block relative min-h-[75vh] overflow-hidden">
      <img
        src={resolveProductImage(product.node.title, product.node.handle, image?.url, image?.altText).url}
        alt={resolveProductImage(product.node.title, product.node.handle, image?.url, image?.altText).alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        width={640}
        height={960}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <span className="absolute top-5 left-5 bg-accent text-ivory text-[10px] tracking-[0.15em] uppercase font-body font-medium px-3 py-1.5 rounded-full">
        Best Seller
      </span>

      <div className="absolute bottom-8 left-6 right-6">
        <h3 className="font-display text-2xl font-medium text-white mb-2">
          {renameCut(product.node.title)}
        </h3>
        <p className="font-body text-sm text-white/70 mb-4 line-clamp-2">
          {product.node.description || "Soft Cotton-focused construction, designed for everyday comfort."}
        </p>
        <span className="inline-block font-body text-sm text-white underline underline-offset-4 tracking-wide">
          Shop Now
        </span>
      </div>
    </Link>
  );
};

/* ─── Mobile small card: image + name underneath ─── */
const MobileSmallCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;

  return (
    <Link to="/product/$handle" params={{ handle: product.node.handle }} className="block">
      <div className="aspect-[2/3] min-h-[65vw] overflow-hidden bg-sand/40">
        <img
          src={resolveProductImage(product.node.title, product.node.handle, image?.url, image?.altText).url}
          alt={resolveProductImage(product.node.title, product.node.handle, image?.url, image?.altText).alt}
          loading="lazy"
          decoding="async"
          width={640}
          height={960}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="font-display text-sm font-bold text-espresso mt-2 text-center uppercase tracking-wide bg-transparent">
        {renameCut(product.node.title)}
      </p>
    </Link>
  );
};

const cutImages: Record<string, string> = {
  "brazilian-bikini": flowLightImg,
  "high-rise-french-cut": flowMediumImg,
  "boy-short": flowHeavyImg,
};

/* ─── Soft luxury cut card (repurposed from the legacy Flow row) ─── */
const CutCard = ({ cutKey, label, description, imageSrc }: { cutKey: string; label: string; description: string; imageSrc: string }) => {
  return (
    <Link to="/shop-by-shapes" search={{ cut: cutKey }} className="block group">
      <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--sand)/0.5)] ring-1 ring-border/40 relative">
        <img src={imageSrc} alt={`hertones ${label} in Cotton`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" width={640} height={960} />
        <div className="absolute inset-0 bg-espresso/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
          <p className="font-body text-[10px] leading-relaxed text-white/90">{description}</p>
        </div>
      </div>
      <p className="font-body text-[11px] font-medium text-mocha tracking-[0.08em] text-center mt-3">
        {label}
      </p>
    </Link>
  );
};

const BestSellers = () => {
  const flowRef = useRef<HTMLDivElement>(null);
  const [flowVisible, setFlowVisible] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    fetchProducts(8).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFlowVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <section ref={ref} className="py-0 px-0 md:py-24 md:px-6 md:bg-oat">
      <div className="max-w-6xl mx-auto">
        <div className={`hidden md:block text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Curated for You</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-espresso">Best Sellers</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className={`text-center py-16 rounded-lg bg-ivory border border-border transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-display text-lg text-foreground/60 mb-2">No products yet</p>
            <p className="font-body text-sm text-muted-foreground">Products will appear here once added to the store.</p>
          </div>
        ) : (
          <>
            {/* ─── Mobile layout ─── */}
            <div className="md:hidden space-y-3">
              {/* Shop by Shape heading */}
              <div className={`text-center py-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className="text-[10px] tracking-[0.25em] uppercase text-accent font-body mb-2">Collection</p>
                <h2 className="font-display text-2xl font-medium text-espresso">Shop by Shape</h2>
              </div>

              <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
                <MobileHeroCard product={products[0]} />
              </div>

              {products.length >= 2 && (
                <div className="grid grid-cols-2 gap-3 px-0">
                  {products.slice(1, 3).map((product, i) => (
                    <div
                      key={product.node.id}
                      className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                      style={{ transitionDelay: `${(i + 1) * 100 + 300}ms` }}
                    >
                      <MobileSmallCard product={product} />
                    </div>
                  ))}
                </div>
              )}

              {/* Shop by Cut — soft luxury row (repurposed from the legacy Flow row) */}
              <div ref={flowRef} className={`pt-20 pb-10 px-2 transition-all duration-1000 ease-out ${flowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className={`text-center mb-6 transition-all duration-700 ease-out ${flowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: flowVisible ? '200ms' : '0ms' }}>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-mocha/60 font-body mb-2">Curated by</p>
                  <h2 className="font-display text-xl font-medium text-espresso italic">Cut</h2>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {ACTIVE_CUTS.map((cut, i) => (
                    <div key={cut.key} className={`transition-all duration-700 ease-out ${flowVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`} style={{ transitionDelay: flowVisible ? `${300 + i * 150}ms` : '0ms' }}>
                      <CutCard cutKey={cut.key} label={cut.name} description={cut.shortDescription} imageSrc={cutImages[cut.key]} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Desktop layout (unchanged) ─── */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div
                  key={product.node.id}
                  className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}

        {products.length > 0 && (
          <div className="hidden md:block text-center mt-12">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center h-11 px-8 border border-espresso/20 text-foreground font-body text-sm tracking-wide rounded-sm hover:bg-espresso/5 transition-colors"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export { ProductCard };
export default BestSellers;
