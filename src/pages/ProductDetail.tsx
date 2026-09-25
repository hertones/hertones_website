import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductOptions from "@/components/product/ProductOptions";
import ProductAccordion from "@/components/product/ProductAccordion";
// ScienceAbsorption is intentionally NOT imported. It has been removed from the
// active product page for the V2 Cotton launch and is preserved at
// src/components/product/ScienceAbsorption.tsx for possible future use.
import FeaturedProducts from "@/components/product/FeaturedProducts";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { Loader2, ShoppingBag, Leaf, Truck, ChevronLeft, Heart, Sparkles, Layers } from "lucide-react";
import { getLocalImages, getPlaceholderFromProduct, getCutKeyFromTitle } from "@/lib/productImages";
import { ACTIVE_TONES, ACTIVE_TONE_KEYS, SHOPIFY_TONE_ALIAS, getTone, renameCut } from "@/lib/productCatalog";
import { toast } from "sonner";

const TONE_COLORS: Record<string, string> = Object.fromEntries(
  ACTIVE_TONES.map((t) => [t.key, t.hex])
);
const TONE_TEXT_COLORS: Record<string, string> = Object.fromEntries(
  ACTIVE_TONES.map((t) => [t.key, t.textColor])
);
const TONE_BG_TINTS: Record<string, string> = Object.fromEntries(
  ACTIVE_TONES.map((t) => [t.key, t.bgTint])
);

// Legacy Shopify handles still use a smaller tone set — map them onto active tones.
const LEGACY_HANDLE_TONES = ["ivory", "sand", "caramel", "mocha", "espresso"];
const HANDLE_TONE_ALIAS: Record<string, string> = {
  ivory: "nude",
  sand: "almond",
  caramel: "caramel",
  mocha: "mocha",
  espresso: "espresso",
};

function getToneFromHandle(handle: string): string {
  if (!handle) return ACTIVE_TONE_KEYS[0];
  for (const tone of ACTIVE_TONE_KEYS) {
    if (handle.startsWith(tone)) return tone;
  }
  for (const legacy of LEGACY_HANDLE_TONES) {
    if (handle.startsWith(legacy)) return HANDLE_TONE_ALIAS[legacy];
  }
  return ACTIVE_TONE_KEYS[0];
}

// The store only carries a subset of tone variants; map any displayed tone
// onto a real Shopify handle so every swatch loads a product.
function getShapeFromHandle(handle: string): string {
  return (handle || "").replace(/^[a-z]+-/, "");
}

function toShopifyHandle(tone: string, shape: string): string {
  const shopifyTone = SHOPIFY_TONE_ALIAS[tone] || tone;
  return `${shopifyTone}-${shape}`;
}

const ProductDetail = () => {
  const { handle } = useParams({ strict: false }) as { handle?: string };
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFlow, setSelectedFlow] = useState("Medium");
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);
  const addToCartRef = useRef<HTMLButtonElement>(null);

  // Track all tone products so switching is instant
  const [toneProducts, setToneProducts] = useState<Record<string, any>>({});
  const [activeTone, setActiveTone] = useState(() => getToneFromHandle(handle || ""));
  const [isToneSwitching, setIsToneSwitching] = useState(false);
  const imageSectionRef = useRef<HTMLDivElement>(null);

  // Set when the URL change comes from a tone switch — skip the refetch
  const skipFetchRef = useRef(false);

  useEffect(() => {
    if (!handle) return;
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }
    const tone = getToneFromHandle(handle);
    const shape = getShapeFromHandle(handle);
    setLoading(true);
    setProduct(null);
    const cacheKey = `${tone}:${shape}`;
    fetchProductByHandle(toShopifyHandle(tone, shape))
      .then((p) => {
        setProduct(p);
        setActiveTone(tone);
        setToneProducts({ [cacheKey]: p });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [handle]);

  // Prefetch every displayed tone in the background
  useEffect(() => {
    if (!handle) return;
    const shape = getShapeFromHandle(handle);
    ACTIVE_TONE_KEYS.forEach((tone) => {
      const cacheKey = `${tone}:${shape}`;
      if (!toneProducts[cacheKey]) {
        fetchProductByHandle(toShopifyHandle(tone, shape)).then((p) => {
          if (p) setToneProducts((prev) => ({ ...prev, [cacheKey]: p }));
        }).catch(() => {});
      }
    });
  }, [handle]);

  // Title transition key for smooth swap
  const [titleKey, setTitleKey] = useState(0);

  const navigate = useNavigate();

  // When tone changes locally, swap the active product without navigation
  const handleToneChange = (tone: string) => {
    if (tone === activeTone) return;
    // Show refresh overlay
    setIsToneSwitching(true);
    // Update the URL through the router with scroll reset disabled, then
    // scroll to the top of the image (not all the way up the page).
    const shapeKey = getShapeFromHandle(handle || "");
    skipFetchRef.current = true;
    navigate({
      to: "/product/$handle",
      params: { handle: `${tone}-${shapeKey}` },
      replace: true,
      resetScroll: false,
    });
    window.setTimeout(() => {
      if (imageSectionRef.current) {
        const imageTop = imageSectionRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(imageTop - 96, 0), behavior: "smooth" });
      }
    }, 50);
    setActiveTone(tone);
    const finishSwitch = () => {
      // Brief pause so the overlay reads as a deliberate refresh
      window.setTimeout(() => setIsToneSwitching(false), 450);
    };
    const cacheKey = `${tone}:${shapeKey}`;
    if (toneProducts[cacheKey]) {
      setProduct(toneProducts[cacheKey]);
      setTitleKey((k) => k + 1);
      finishSwitch();
    } else {
      fetchProductByHandle(toShopifyHandle(tone, shapeKey))
        .then((p) => {
          if (!p) return;
          setToneProducts((prev) => ({ ...prev, [cacheKey]: p }));
          setProduct(p);
          setTitleKey((k) => k + 1);
        })
        .catch(() => {})
        .finally(finishSwitch);
    }
  };

  // Find the variant matching selected Flow + Size
  const selectedVariant =
    product?.variants?.edges?.find((v: any) =>
      v.node.selectedOptions.every(
        (o: any) =>
          (o.name === "Flow" && o.value === selectedFlow) ||
          (o.name === "Size" && o.value === selectedSize)
      )
    )?.node || product?.variants?.edges?.[0]?.node;

  const price = parseFloat(
    selectedVariant?.price?.amount ||
      product?.priceRange?.minVariantPrice?.amount ||
      "0"
  ).toFixed(2);

  const images = product?.images?.edges || [];

  const handleAddToCart = async () => {
    if (!selectedVariant || !product) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Pre-Order Added to Bag", { description: product.title });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <Navigation />
        <div className="flex justify-center items-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <Navigation />
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mb-4" />
          <p className="font-display text-lg text-foreground/60 mb-2">Product not found</p>
          <Link to="/collections" className="font-body text-sm text-accent hover:underline">
            Back to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-500 ease-in-out"
      style={{ backgroundColor: TONE_BG_TINTS[activeTone] }}
    >
      <AnnouncementBar />
      <Navigation />

      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16">
        {/* Breadcrumb - mobile compact */}
        <div className="px-4 lg:px-6 mb-4 lg:mb-6 max-w-6xl mx-auto">
          <Link
            to="/collections"
            className="inline-flex items-center gap-0.5 font-body text-[10px] font-light text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3 w-3" /> Back to shop
          </Link>
        </div>

        {/* Mobile: title + price above image */}
        <div className="px-4 lg:hidden mb-3">
          <h1
            key={titleKey}
            className="font-display text-2xl font-medium text-espresso mb-1 animate-fade-in"
          >
            {renameCut(product.title)}
          </h1>
          <p className="font-display text-lg text-espresso">${price}</p>
        </div>

        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:px-6">
          {/* Images */}
          <div ref={imageSectionRef} className="lg:sticky lg:top-24 lg:self-start relative scroll-mt-24">
            <ProductImageCarousel
              images={images}
              productTitle={product.title}
              localImages={getLocalImages(activeTone, getCutKeyFromTitle(product.title, product.handle))}
              placeholderImage={getPlaceholderFromProduct(product.title, product.handle)}
            />

          </div>

          {/* Product info */}
          <div className="px-4 lg:px-0 mt-4 lg:mt-0">

            {/* Desktop: title + price (hidden on mobile) */}
            <h1
              key={`desktop-${titleKey}`}
              className="hidden lg:block font-display text-3xl lg:text-4xl font-medium text-espresso mb-2 animate-fade-in"
            >
              {renameCut(product.title)}
            </h1>
            <p className="hidden lg:block font-display text-xl text-espresso mb-5">${price}</p>



            {/* Options */}
            <ProductOptions
              currentTone={activeTone}
              selectedFlow={selectedFlow}
              selectedSize={selectedSize}
              onToneChange={handleToneChange}
              onFlowChange={setSelectedFlow}
              onSizeChange={setSelectedSize}
            />

            {/* Pre-Order Now CTA */}
            {(() => {
              const tone = activeTone;
              return (
                <button
                  ref={addToCartRef}
                  onClick={handleAddToCart}
                  disabled={isCartLoading || !selectedVariant?.availableForSale || !selectedSize}
                  className="w-full h-11 mt-6 font-body text-sm tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: TONE_COLORS[tone], color: TONE_TEXT_COLORS[tone] }}
                >
              {isCartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedSize ? (
                "Pick a Size"
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {selectedVariant?.availableForSale
                    ? `Pre-Order Now — $${price}`
                    : "Sold Out"}
                </>
              )}
                </button>
              );
            })()}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <Layers className="h-4 w-4 text-accent mx-auto mb-1.5" />
                <p className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">
                  Cotton Led
                </p>
              </div>
              <div className="text-center">
                <Leaf className="h-4 w-4 text-accent mx-auto mb-1.5" />
                <p className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">
                  Cotton
                </p>
              </div>
              <div className="text-center">
                <Truck className="h-4 w-4 text-accent mx-auto mb-1.5" />
                <p className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">
                  Free Ship $75+
                </p>
              </div>
            </div>

            {/* Why You'll Love It — compact */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-body text-[11px] tracking-[0.2em] uppercase text-foreground mb-3">
                Why You'll Love It
              </h3>
              <ul className="space-y-1.5">
                {[
                  { icon: Layers, text: "Cotton-focused construction with material transparency" },
                  { icon: Heart, text: "Soft, breathable cotton designed for everyday comfort" },
                  { icon: Sparkles, text: "Considered body-tone shades made to disappear against skin" },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span className="font-body text-xs text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accordion sections */}
            <div className="mt-6 mb-2">
              <ProductAccordion description={(product.description || "Soft, breathable Cotton-focused underwear designed for everyday comfort in a considered spectrum of body-tone shades.").replace(/brazilian\s+bikini/gi, "Bikini")} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts currentHandle={handle || ""} />

      {/*
        ScienceAbsorption (absorption-flow interface) is intentionally not rendered
        in the V2 Cotton launch. The component file is preserved at
        src/components/product/ScienceAbsorption.tsx for possible future use.
      */}

      {/* FAQ */}
      <FAQSection />

      <Footer />

      {/* Sticky mobile CTA */}
      <StickyAddToCart
        productTitle={renameCut(product.title)}
        price={price}
        onAddToCart={handleAddToCart}
        isLoading={isCartLoading}
        isAvailable={selectedVariant?.availableForSale ?? false}
        hasSizeSelected={!!selectedSize}
        triggerRef={addToCartRef as React.RefObject<HTMLButtonElement>}
      />

      {/* Tone refresh overlay — brown circular progress */}
      <div
        aria-hidden={!isToneSwitching}
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-ivory/60 backdrop-blur-[1px] transition-opacity duration-200 pointer-events-none ${
          isToneSwitching ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-14 w-14 rounded-full border-[3px] border-espresso/20 border-t-espresso animate-spin" />
      </div>
    </div>
  );
};

export default ProductDetail;
