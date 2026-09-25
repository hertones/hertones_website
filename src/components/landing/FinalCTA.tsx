import { useScrollReveal } from "@/hooks/useScrollReveal";

const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-sand/50">
      <div className={`max-w-[800px] mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-4">
          Your recovery starts with one decision.
        </h2>
        <p className="font-body text-base text-muted-foreground mb-8">
          Join 18,000+ women who chose hertones.
        </p>
        <a
          href="#offer"
          className="inline-flex items-center justify-center h-14 px-10 bg-espresso text-primary-foreground font-body text-sm tracking-wide rounded-sm hover:bg-espresso/90 transition-colors mb-4"
        >
          Start with Your First Pair
        </a>
        <p className="font-body text-xs text-muted-foreground">
          30-day guarantee · Free shipping · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
