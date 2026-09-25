// PRESERVED FOR FUTURE RELEASE
// The absorption-flow interface is intentionally disabled during the V2
// Cotton launch. This component is no longer rendered anywhere in
// the live UI (see src/pages/ProductDetail.tsx). All components, logic,
// copy, animations, and data are preserved here for possible future use.

import { Shield, Droplets, Zap } from "lucide-react";

const ScienceAbsorption = () => {
  return (
    <section className="py-16 px-6 bg-oat">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] tracking-[0.25em] uppercase text-accent font-body mb-2 text-center">
          The Science
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso text-center mb-10">
          Copper-Infused Absorption Technology
        </h2>

        {/* Placeholder diagram */}
        <div className="aspect-[16/9] md:aspect-[2/1] rounded-lg bg-sand/40 border border-border mb-10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="font-body text-xs text-muted-foreground/40 tracking-widest uppercase block mb-2">
                Absorption Diagram
              </span>
              <span className="font-body text-[10px] text-muted-foreground/30">
                Cross-section illustration placeholder
              </span>
            </div>
          </div>

          {/* Layer labels */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-ivory rounded-full" />
              <span className="font-body text-[10px] text-muted-foreground">Cotton</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-accent rounded-full" />
              <span className="font-body text-[10px] text-muted-foreground">Copper Layer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-espresso rounded-full" />
              <span className="font-body text-[10px] text-muted-foreground">Leak-Proof Barrier</span>
            </div>
          </div>
        </div>

        {/* 3 flow levels */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <Droplets className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-sm font-medium text-espresso mb-1">Light</h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              Up to 2 tampons worth. Perfect for light days & spotting.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-3">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-sm font-medium text-espresso mb-1">Medium</h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              Up to 4 tampons worth. Reliable all-day protection.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-sm font-medium text-espresso mb-1">Heavy</h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              Up to 6 tampons worth. Maximum overnight confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceAbsorption;
