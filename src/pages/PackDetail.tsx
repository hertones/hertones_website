import { useRef, useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductAccordion from "@/components/product/ProductAccordion";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { getPackByHandle, PACK_CUTS, getCutGallery, type PackCut } from "@/lib/packs";
import { Loader2, ShoppingBag, Leaf, Truck, ChevronLeft, Heart, Sparkles, Layers } from "lucide-react";
import { toast } from "sonner";

const PackDetail = () => {
  const { handle } = useParams({ strict: false }) as { handle?: string };
  const pack = getPackByHandle(handle);
  const [selectedCut, setSelectedCut] = useState<PackCut | null>(null);
  const [cutError, setCutError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);
  const addToCartRef = useRef<HTMLButtonElement>(null);

  if (!pack) {
    return (
      <div className="min-h-screen">
        <AnnouncementBar />
        <Navigation />
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mb-4" />
          <p className="font-display text-lg text-foreground/60 mb-2">Pack not found</p>
          <Link to="/packs" className="font-body text-sm text-accent hover:underline">
            Back to packs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = selectedCut
    ? getCutGallery(selectedCut)
    : [{ url: pack.image, alt: pack.title }];

  const handleAddToCart = async () => {
    if (!selectedCut) {
      setCutError(true);
      return;
    }
    try {
      const product = await fetchProductByHandle(pack.shopifyHandle);
      const variant = product?.variants?.edges?.find((v: any) =>
        v.node.selectedOptions.some(
          (o: any) => o.name === "Cut" && o.value === selectedCut.label
        )
      )?.node;
      if (!product || !variant) {
        toast.error("Pack not available yet", {
          description: "This pack isn't quite ready for pre-order. Please check back soon.",
        });
        return;
      }
      await addItem({
        product: { node: product },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: [
          ...(variant.selectedOptions || []),
          { name: "Cut", value: selectedCut.label },
        ],
      });
      toast.success("Pre-Order Added to Bag", {
        description: `${pack.title} — Cut: ${selectedCut.label}`,
      });
    } catch {
      toast.error("Something went wrong", {
        description: "We couldn't add that pack to your bag. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <AnnouncementBar />
      <Navigation />

      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16">
        {/* Breadcrumb */}
        <div className="px-4 lg:px-6 mb-4 lg:mb-6 max-w-6xl mx-auto">
          <Link
            to="/packs"
            className="inline-flex items-center gap-0.5 font-body text-[10px] font-light text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3 w-3" /> Back to packs
          </Link>
        </div>

        {/* Mobile: title + price above image */}
        <div className="px-4 lg:hidden mb-3">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl font-medium text-espresso">
              {pack.title}
            </h1>
            <span className="text-[10px] tracking-[0.15em] uppercase font-body border border-border rounded-full px-3 py-1 text-muted-foreground">
              {pack.badge}
            </span>
          </div>
          <p className="font-display text-lg text-espresso">{pack.price}</p>
        </div>

        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:px-6">
          {/* Images */}
          <div className="lg:sticky lg:top-24 lg:self-start relative scroll-mt-24">
            <ProductImageCarousel
              images={[]}
              productTitle={pack.title}
              localImages={gallery}
              placeholderImage={{ url: pack.image, alt: pack.title }}
            />
          </div>

          {/* Pack info */}
          <div className="px-4 lg:px-0 mt-4 lg:mt-0">
            {/* Desktop: title + price */}
            <div className="hidden lg:flex items-center gap-3 mb-2">
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-espresso">
                {pack.title}
              </h1>
              <span className="text-[10px] tracking-[0.15em] uppercase font-body border border-border rounded-full px-3 py-1 text-muted-foreground">
                {pack.badge}
              </span>
            </div>
            <p className="hidden lg:block font-display text-xl text-espresso mb-5">{pack.price}</p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              {pack.description}
            </p>

            {/* Cut selection */}
            <div>
              <h2 className="font-body text-[11px] tracking-[0.2em] uppercase text-foreground mb-3">
                Choose Your Cut
              </h2>
              <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Choose your cut">
                {PACK_CUTS.map((cut) => {
                  const selected = selectedCut?.label === cut.label;
                  return (
                    <button
                      key={cut.label}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setSelectedCut(cut);
                        setCutError(false);
                      }}
                      className={`rounded-lg border overflow-hidden flex flex-col transition-all ${
                        selected
                          ? "border-accent ring-2 ring-accent/40"
                          : "border-border hover:border-accent/40"
                      }`}
                    >
                      <div className="aspect-square overflow-hidden bg-oat">
                        <img
                          src={cut.thumbnail.url}
                          alt={cut.thumbnail.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span
                        className={`py-2 font-body text-xs tracking-wide text-center ${
                          selected ? "text-accent font-medium" : "text-foreground/80"
                        }`}
                      >
                        {cut.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="font-body text-xs text-muted-foreground mt-2">
                All pieces in your pack come in your chosen cut.
              </p>
              {cutError && !selectedCut && (
                <p className="font-body text-xs text-destructive mt-2">
                  Please choose a cut to continue.
                </p>
              )}
            </div>

            {/* Pre-Order CTA */}
            <button
              ref={addToCartRef}
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedCut}
              className="w-full h-11 mt-6 bg-accent/20 text-accent font-body text-sm tracking-wider rounded-sm transition-colors disabled:opacity-50 hover:bg-accent/30 flex items-center justify-center gap-2 font-medium"
            >
              {isCartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedCut ? (
                "Choose Your Cut"
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {`Pre-Order Now — ${pack.price}`}
                </>
              )}
            </button>

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

            {/* Why You'll Love It */}
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
              <ProductAccordion description={pack.description} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      <Footer />

      {/* Sticky mobile CTA */}
      <StickyAddToCart
        productTitle={pack.title}
        price={pack.price.replace("$", "")}
        onAddToCart={handleAddToCart}
        isLoading={isCartLoading}
        isAvailable={true}
        hasSizeSelected={!!selectedCut}
        triggerRef={addToCartRef as React.RefObject<HTMLButtonElement>}
        selectPrompt="Choose Your Cut"
      />
    </div>
  );
};

export default PackDetail;
