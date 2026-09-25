import { useScrollReveal } from "@/hooks/useScrollReveal";

const bullets = [
  "Bulk and discomfort that reminds you something is wrong",
  "Unreliable performance that makes you second-guess your day",
  "Products designed for a problem — not for your confidence",
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-background">
      <div className={`max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso leading-snug mb-4">
            Most period underwear was built to catch a problem. Not solve it.
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            There is a difference between a product that manages leakage and a product engineered for intimate recovery. Most women have only ever had access to one.
          </p>
        </div>
        <ul className="space-y-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="font-body text-sm text-foreground leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProblemSection;
