import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductOptions from "@/components/product/ProductOptions";
import ProductAccordion from "@/components/product/ProductAccordion";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import { ChevronLeft, Heart, Layers, Sparkles, ShoppingBag, Loader2 } from "lucide-react";
import { CHAMPAGNE_TONE, SLIP_DRESS } from "@/lib/productCatalog";
import { toast } from "sonner";

const slipDressImages = [
  { url: "/images/models/tonya-slip-dress-fullbody-real.jpg", alt: "Tonya Slip Dress — Full Body" },

  { url: "/images/models/tonya-slip-dress-closeup-real.jpg", alt: "Tonya Slip Dress — Close Up" },
];

const SlipDress = () => {
  const activeTone = CHAMPAGNE_TONE.key;
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState<any>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  const tone = CHAMPAGNE_TONE;

  useEffect(() => {
    let active = true;
    fetchProductByHandle(SLIP_DRESS.handle)
      .then((p) => { if (active) setProduct(p); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const selectedVariant =
    product?.variants?.edges?.find((v: any) =>
      v.node.selectedOptions?.some((o: any) => o.name === "Size" && o.value === selectedSize)
    )?.node || product?.variants?.edges?.[0]?.node;

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) {
      toast("Pre-orders open soon", {
        description: `${SLIP_DRESS.name} isn't available to pre-order just yet.`,
      });
      return;
    }
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

  return (
    <div
      className="min-h-screen transition-colors duration-500 ease-in-out"
      style={{ backgroundColor: tone.bgTint }}
    >
      <AnnouncementBar />
      <Navigation />

      <section className="pt-4 pb-12 lg:pt-8 lg:pb-16">
        <div className="px-4 lg:px-6 mb-4 lg:mb-6 max-w-6xl mx-auto">
          <Link
            to="/collections"
            className="inline-flex items-center gap-0.5 font-body text-[10px] font-light text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3 w-3" /> Back to shop
          </Link>
        </div>

        <div className="px-4 lg:hidden mb-3">
          <h1 className="font-display text-2xl font-medium text-espresso mb-1">{SLIP_DRESS.name}</h1>
          <p className="font-display text-lg text-espresso">{SLIP_DRESS.price}</p>
        </div>

        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:px-6">
          {/* Image gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageCarousel
              images={[]}
              productTitle={SLIP_DRESS.name}
              localImages={slipDressImages}
            />
          </div>

          <div className="px-4 lg:px-0 mt-4 lg:mt-0">
            <h1 className="hidden lg:block font-display text-3xl lg:text-4xl font-medium text-espresso mb-2">{SLIP_DRESS.name}</h1>
            <p className="hidden lg:block font-display text-xl text-espresso mb-5">{SLIP_DRESS.price}</p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              {SLIP_DRESS.shortDescription}
            </p>

            <ProductOptions
              toneLabel="Shade"
              tones={[CHAMPAGNE_TONE]}
              currentTone={activeTone}
              selectedSize={selectedSize}
              onToneChange={() => {}}
              onSizeChange={setSelectedSize}
            />

            {/* Pre-Order Now CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedSize}
              className="w-full h-11 mt-6 font-body text-sm tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ backgroundColor: tone.hex, color: tone.textColor }}
            >
              {isCartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedSize ? (
                "Pick a Size"
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {`Pre-Order Now — ${SLIP_DRESS.price}`}
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <Layers className="h-4 w-4 text-accent mx-auto mb-1.5" />
                <p className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">Cotton Led</p>
              </div>
              <div className="text-center">
                <Heart className="h-4 w-4 text-accent mx-auto mb-1.5" />
                <p className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">Considered Make</p>
              </div>
              <div className="text-center">
                <Sparkles className="h-4 w-4 text-accent mx-auto mb-1.5" />
                <p className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">Champagne Shade</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-body text-[11px] tracking-[0.2em] uppercase text-foreground mb-3">Why You'll Love It</h3>
              <ul className="space-y-1.5">
                {[
                  { icon: Layers, text: "Cotton-focused construction designed for softness" },
                  { icon: Heart, text: "A softly draped silhouette for layering and lounging" },
                  { icon: Sparkles, text: "Offered in a single warm Champagne shade" },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span className="font-body text-xs text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 mb-2">
              <ProductAccordion description={SLIP_DRESS.shortDescription} />
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts currentHandle={SLIP_DRESS.handle} />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default SlipDress;
