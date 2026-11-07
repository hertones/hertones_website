import { useScrollReveal } from "@/hooks/useScrollReveal";
const allShapesFan = "/images/all-shapes-fan.jpg";
const AllTonesPromo = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="pt-4 pb-16 md:py-16 px-3 md:px-6 bg-ivory">
      <div className="max-w-6xl md:max-w-xl lg:max-w-3xl mx-auto">
        <div
          className={`rounded-xl border border-border overflow-hidden bg-sand/20 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Shared layout: landscape image above centered copy on every screen. */}
          <div className="flex flex-col">
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
                className="inline-flex items-center justify-center w-full md:max-w-sm h-11 bg-accent text-ivory font-body text-sm tracking-wide rounded-sm hover:bg-accent/90 transition-colors font-medium"
              >
                Shop the All Shapes Pack
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AllTonesPromo;
