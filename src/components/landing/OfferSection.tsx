import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
  "hertones Recovery Brief in your chosen flow level",
  "Free Welcome Gift with first order (wash bag + care card)",
  "30-Day Full Cycle Guarantee — wear it for a complete cycle",
  "Free shipping on all orders",
  "Cancel or pause your subscription anytime",
];

const OfferSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="offer" className="py-20 md:py-28 px-6 bg-espresso">
      <div className={`max-w-[800px] mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-primary-foreground mb-10">
          Everything included with your first pair.
        </h2>

        <ul className="space-y-4 mb-10 text-left max-w-md mx-auto">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-body text-sm text-primary-foreground/90">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a
            href="#offer"
            className="inline-flex items-center justify-center h-12 px-8 bg-primary-foreground text-espresso font-body text-sm tracking-wide rounded-sm hover:bg-primary-foreground/90 transition-colors"
          >
            Start with Your First Pair — One-Time Purchase
          </a>
          <a
            href="#offer"
            className="inline-flex items-center justify-center h-12 px-8 border border-primary-foreground/30 text-primary-foreground font-body text-sm tracking-wide rounded-sm hover:bg-primary-foreground/10 transition-colors"
          >
            Subscribe and Save 20%
          </a>
        </div>

        <p className="font-body text-xs text-primary-foreground/50">
          30-day guarantee · Free shipping · Body-safe certified · 18,000+ women trust hertones
        </p>
      </div>
    </section>
  );
};

export default OfferSection;
