import { useScrollReveal } from "@/hooks/useScrollReveal";
const allShapesFan = "/images/all-shapes-fan.jpg";
const AllTonesPromo = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="pt-4 pb-16 md:py-16 px-3 md:px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <div
          className={`rounded-xl border border-border overflow-hidden bg-sand/20 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Mobile: single card — landscape image top, copy bottom */}
          <div className="md:hidden flex flex-col">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={allShapesFan}
                alt="hertones Cotton underwear fanned out across body-tone shades"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={576}
              />
            </div>
            <div className="p-6 text-center">
              <span className="inline-block bg-accent/20 text-accent font-body text-xs tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-4 font-medium">
                Limited Time
              </span>
              <h2 className="font-display text-2xl font-medium text-espresso mb-2">
                All Shapes Pack
              </h2>
              <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto mb-5">
                Boy Short, Bikini &amp; Classic Brief — one tone, three silhouettes.
              </p>
              <a
                href="https://hertones.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-11 bg-accent text-ivory font-body text-sm tracking-wide rounded-sm hover:bg-accent/90 transition-colors font-medium"
              >
                Shop the All Shapes Pack
              </a>
            </div>
          </div>

          {/* Desktop: original two-column layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-0">
            <div className="flex flex-col items-center justify-center p-8 min-h-[500px]">
              <span className="inline-block bg-accent/20 text-accent font-body text-xs tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-6 font-medium">
                Limited Time
              </span>
              <img
                src={allShapesFan}
                alt="hertones Cotton underwear fanned out across body-tone shades"
                className="w-full max-w-[360px] object-contain"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="mt-6 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-2">
                  All Shapes Pack
                </h2>
                <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
                  Boy Short, Bikini &amp; Classic Brief — one tone, three silhouettes.
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              <img
                src={allShapesFan}
                alt="hertones underwear assortment in considered body-tone shades"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1280}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTonesPromo;
