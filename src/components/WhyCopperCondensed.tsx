import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Layers, Palette } from "lucide-react";

const points = [
  { icon: Leaf, label: "Cotton-Led", desc: "Made with Cotton, designed for softness next to skin." },
  { icon: Layers, label: "Considered Materials", desc: "A more thoughtful material approach, with less unnecessary synthetic." },
  { icon: Palette, label: "Made in Thoughtful Tones", desc: "A considered spectrum of body-tone shades for every you." },
];

const WhyCopperCondensed = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-4 px-6 bg-accent">
      <div className="max-w-5xl mx-auto">

        <h3 className="font-display text-lg font-medium text-ivory text-center mb-3">Why hertones?</h3>
        <div className="grid grid-cols-3 gap-4">
          {points.map((pt, i) => (
            <div
              key={pt.label}
              className={`flex flex-col items-center text-center transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-7 h-7 rounded-full bg-ivory/20 flex items-center justify-center mb-1.5">
                <pt.icon className="h-3.5 w-3.5 text-ivory" />
              </div>
              <h3 className="font-display text-sm font-medium text-ivory mb-0.5">{pt.label}</h3>
              <p className="font-body text-xs text-ivory/80 leading-relaxed max-w-[200px]">{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCopperCondensed;
