import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ACTIVE_TONES, ACTIVE_CUTS, mapToneHandle, renameCut } from "@/lib/productCatalog";
import { getBikiniImage, getFrenchCutImage, getBoyShortImage } from "@/lib/productImages";

// Local images for tones that have them
const caramel1 = "/images/products/caramel-1.png";
const caramel5 = "/images/products/caramel-5.png";
const espresso1 = "/images/products/espresso-1.png";
const espresso5 = "/images/products/espresso-5.png";
const tones = ACTIVE_TONES.map((t) => ({ name: t.name, color: t.hex, key: t.key }));

// Local hero images per tone (only for tones with uploaded photos)
const LOCAL_TONE_IMAGES: Record<string, string[]> = {
  caramel: [caramel1, caramel5],
  espresso: [espresso1, espresso5],
};

const ShopByTone = () => {
  const defaultTone = tones.find((t) => t.key === "caramel") || tones[0];
  const [selectedTone, setSelectedTone] = useState(defaultTone);
  const { ref, isVisible } = useScrollReveal();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    fetchProducts(50).then(setProducts).catch(() => {});
  }, []);

  // Build display cards: use local imagery where we have it, else Shopify
  const localImages = LOCAL_TONE_IMAGES[selectedTone.key];
  const cards = ACTIVE_CUTS.map((cut, i) => {
    const handle = mapToneHandle(selectedTone.key, cut.key);
    let image = "";
    if (cut.key === "brazilian-bikini") {
      image = getBikiniImage(selectedTone.key)?.url || "";
    } else if (cut.key === "high-rise-french-cut") {
      image = getFrenchCutImage(selectedTone.key)?.url || "";
    } else if (cut.key === "boy-short") {
      image = getBoyShortImage(selectedTone.key)?.url || "";
    } else if (localImages) {
      image = localImages[1] || "";
    }
    if (!image) {
      const shopify = products.find((p) => p.node.handle === handle);
      image = shopify?.node.images.edges[0]?.node.url || "";
    }
    return { image, handle, label: cut.name };
  });

  return (
    <section ref={ref} className="pt-12 pb-24 md:py-24 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <div id="shop-by-tone" className="scroll-mt-28" />
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Find Your Match</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-espresso mb-4">
            Shop by Tone
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-md mx-auto">
            A considered spectrum of body-tone shades. Choose the tone that disappears against your skin.
          </p>
        </div>

        <div className={`flex justify-center gap-4 sm:gap-6 mb-12 transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {tones.map((tone) => (
            <button
              key={tone.name}
              onClick={() => setSelectedTone(tone)}
              className="group flex flex-col items-center gap-2 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-300 shadow-sm hover:scale-110 ${
                  selectedTone.name === tone.name ? 'border-accent scale-110 shadow-md' : 'border-border'
                }`}
                style={{ backgroundColor: tone.color }}
              />
              <span className={`text-[10px] sm:text-xs font-body tracking-wide transition-colors ${
                selectedTone.name === tone.name ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {tone.name}
              </span>
            </button>
          ))}
        </div>

        {/* Product cards */}
        <div className={`-mx-6 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-3">
            {cards.length > 0 ? (
              cards.map((card, i) => (
                <Link
                  key={`${selectedTone.key}-${i}`}
                  to="/product/$handle" params={{ handle: card.handle }}
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-sand/30">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={`${selectedTone.name} ${card.label}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: selectedTone.color + '40' }}>
                        <div className="text-center px-4">
                          <div className="w-8 h-8 rounded-full mx-auto mb-3 border border-border" style={{ backgroundColor: selectedTone.color }} />
                          <p className="font-body text-xs text-muted-foreground">{selectedTone.name} · {card.label}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {card.label}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              /* Fallback placeholders when no products/images */
              [1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] flex items-center justify-center rounded-lg" style={{ backgroundColor: selectedTone.color + '40' }}>
                  <div className="text-center px-4">
                    <div className="w-8 h-8 rounded-full mx-auto mb-3 border border-border" style={{ backgroundColor: selectedTone.color }} />
                    <p className="font-body text-xs text-muted-foreground">
                      {selectedTone.name} · Style {i}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByTone;
