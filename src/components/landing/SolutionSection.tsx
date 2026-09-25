import { useScrollReveal } from "@/hooks/useScrollReveal";

const columns = [
  {
    icon: "🌿",
    title: "Material & Comfort",
    body: "Built from OEKO-TEX certified Cotton — body-safe, breathable, and certified free from harmful chemicals. Feels like nothing you have worn in this category before.",
  },
  {
    icon: "💧",
    title: "Absorbency Performance",
    body: "Independently lab-tested to absorb 5× more than a standard pad. Our multi-layer system moves moisture away from your skin and locks it in — even on heavy days.",
  },
  {
    icon: "✦",
    title: "Flow-Level Engineering",
    body: "hertones comes in four flow levels — Light, Moderate, Heavy, and Overnight — so you wear exactly what your body needs. Not more. Not less.",
  },
];

const SolutionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-3">
            hertones is intimate recovery underwear.
          </h2>
          <p className="font-body text-base text-muted-foreground">
            Engineered for your body. Your cycle. Your confidence.
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {columns.map((col, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-4">{col.icon}</div>
              <h3 className="font-display text-lg font-medium text-espresso mb-3">{col.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#offer"
            className="inline-flex items-center justify-center font-body text-sm text-accent underline underline-offset-4 hover:text-espresso transition-colors"
          >
            Start with Your First Pair →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
