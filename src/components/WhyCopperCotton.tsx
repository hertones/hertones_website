import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Layers, Ruler } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Cotton-Led Construction",
    description: "An Cotton-focused approach to what sits closest to your skin — with reduced reliance on unnecessary synthetic fabrics.",
  },
  {
    icon: Leaf,
    title: "Made with Cotton",
    description: "Soft, breathable Cotton designed for everyday comfort, movement, and life in your own skin.",
  },
  {
    icon: Ruler,
    title: "Thoughtful Construction",
    description: "Flattering silhouettes, smooth seams, and thoughtfully placed support for a fit that feels secure without feeling restrictive.",
  },
];

const WhyCopperCotton = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="story" className="py-24 px-6 bg-oat">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Material Transparency</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-espresso mb-6">
              Cotton Without<br />the Fine Print
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Many underwear brands lead with cotton while still relying heavily on polyester and synthetic materials. hertones takes a more considered, Cotton-focused approach to what you wear closest to your skin — designed for softness, breathability, and everyday comfort.
            </p>
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-medium text-espresso mb-1">{feature.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="aspect-[4/5] rounded-lg bg-sand/60 flex items-center justify-center border border-border">
              <div className="text-center px-8">
                <Leaf className="h-12 w-12 text-accent/40 mx-auto mb-4" />
                <p className="font-body text-sm text-muted-foreground">Material close-up imagery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCopperCotton;
