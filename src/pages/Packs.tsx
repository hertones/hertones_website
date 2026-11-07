import { Link } from "@tanstack/react-router";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PACKS } from "@/lib/packs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Packs = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-ivory">
      <AnnouncementBar />
      <Navigation />

      <section ref={ref} className="pt-10 pb-14 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-semibold text-espresso tracking-tight mb-3">
              Packs
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Stock up and save. Every pack comes in the cut you choose, across a considered spectrum of body-tone shades.
            </p>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden -mx-6 pl-4 pr-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {PACKS.map((pack, i) => (
                <Link
                  key={pack.handle}
                  to="/pack/$handle"
                  params={{ handle: pack.handle }}
                  className={`w-[300px] shrink-0 rounded-lg border border-border bg-ivory overflow-hidden flex flex-col transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 120 + 200}ms` }}
                >
                  <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <h2 className="font-display text-xl font-semibold text-espresso tracking-tight">
                      {pack.name}
                    </h2>
                    <span className="text-[10px] tracking-[0.15em] uppercase font-body border border-border rounded-full px-3 py-1 text-muted-foreground">
                      {pack.badge}
                    </span>
                  </div>
                  <div className="aspect-square overflow-hidden mx-3 rounded-md">
                    <img
                      src={pack.image}
                      alt={pack.title}
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
                        {pack.title}
                      </p>
                      <p className="font-display text-base font-medium text-espresso">
                        {pack.price}
                      </p>
                    </div>
                    <span className="block w-full h-11 leading-[2.75rem] text-center bg-accent/20 text-accent font-body text-sm tracking-wide rounded-sm font-medium">
                      Choose Your Cut
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {PACKS.map((pack, i) => (
              <Link
                key={pack.handle}
                to="/pack/$handle"
                params={{ handle: pack.handle }}
                className={`rounded-lg border border-border bg-ivory overflow-hidden flex flex-col transition-all duration-800 hover:border-accent/40 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <h2 className="font-display text-xl font-semibold text-espresso tracking-tight">
                    {pack.name}
                  </h2>
                  <span className="text-[10px] tracking-[0.15em] uppercase font-body border border-border rounded-full px-3 py-1 text-muted-foreground">
                    {pack.badge}
                  </span>
                </div>
                <div className="aspect-[3/4] overflow-hidden mx-3 rounded-md">
                  <img
                    src={pack.image}
                    alt={pack.title}
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
                      {pack.title}
                    </p>
                    <p className="font-display text-base font-medium text-espresso">
                      {pack.price}
                    </p>
                  </div>
                  <span className="block w-full h-11 leading-[2.75rem] text-center bg-accent/20 text-accent font-body text-sm tracking-wide rounded-sm font-medium hover:bg-accent/30 transition-colors">
                    Choose Your Cut
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packs;
