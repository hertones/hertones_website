import { useScrollReveal } from "@/hooks/useScrollReveal";
const pack3Img = "/images/pack-3.jpg";
const pack6Img = "/images/pack-6.webp";
const packAllImg = "/images/pack-all3.webp";
const packs = [
  {
    name: "3-Pack",
    badge: "17% Off",
    description: "3 Pack Cotton Essentials",
    price: "$42",
    image: pack3Img,
  },
  {
    name: "6-Pack",
    badge: "25% Off",
    description: "6 Pack Foundation Set",
    price: "$76",
    image: pack6Img,
  },
  {
    name: "All Tones",
    badge: "Best Value",
    description: "Full Spectrum Pack",
    price: "$168",
    image: packAllImg,
  },
];

const PackOptions = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="pack-options" className="pt-6 pb-10 md:py-16 px-6 bg-ivory scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-6 pl-4 pr-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {packs.map((pack, i) => (
              <div
                key={pack.name}
                className={`w-[300px] shrink-0 rounded-lg border border-border bg-ivory overflow-hidden flex flex-col transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <h3 className="font-display text-xl font-semibold text-espresso tracking-tight">
                    {pack.name}
                  </h3>
                  <span className="text-[10px] tracking-[0.15em] uppercase font-body border border-border rounded-full px-3 py-1 text-muted-foreground">
                    {pack.badge}
                  </span>
                </div>
                <div className="aspect-square overflow-hidden mx-3 rounded-md">
                  <img
                    src={pack.image}
                    alt={pack.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={800}
                  />
                </div>
                <div className="px-5 pt-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-body text-xs uppercase tracking-[0.1em] text-foreground font-medium">
                      {pack.description}
                    </p>
                    <p className="font-display text-base font-medium text-espresso">
                      {pack.price}
                    </p>
                  </div>
                  <button className="w-full h-11 bg-accent/20 text-accent font-body text-sm tracking-wide rounded-sm hover:bg-accent/30 transition-colors font-medium">
                    Pre-Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {packs.map((pack, i) => (
            <div
              key={pack.name}
              className={`rounded-lg border border-border bg-ivory overflow-hidden flex flex-col transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h3 className="font-display text-xl font-semibold text-espresso tracking-tight">
                  {pack.name}
                </h3>
                <span className="text-[10px] tracking-[0.15em] uppercase font-body border border-border rounded-full px-3 py-1 text-muted-foreground">
                  {pack.badge}
                </span>
              </div>
              <div className="aspect-[3/4] overflow-hidden mx-3 rounded-md">
                <img
                  src={pack.image}
                  alt={pack.description}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={800}
                />
              </div>
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-xs uppercase tracking-[0.1em] text-foreground font-medium">
                    {pack.description}
                  </p>
                  <p className="font-display text-base font-medium text-espresso">
                    {pack.price}
                  </p>
                </div>
                <button className="w-full h-11 bg-accent/20 text-accent font-body text-sm tracking-wide rounded-sm hover:bg-accent/30 transition-colors font-medium">
                  Pre-Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackOptions;
