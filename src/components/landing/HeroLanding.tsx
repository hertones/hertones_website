import { useScrollReveal } from "@/hooks/useScrollReveal";
const heroImg = "/images/landing/hero-lifestyle.jpg";
const HeroLanding = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="min-h-screen pt-[64px] bg-ivory flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-6 py-16 md:py-0">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div className={`md:col-span-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-accent font-body mb-5">
              Intimate Recovery Underwear
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] text-espresso mb-6">
              Feel like yourself.<br />
              <em className="italic font-normal">Every day of the month.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
              hertones is clinically engineered intimate recovery underwear — designed for real absorbency, real comfort, and real confidence. Whatever your flow. Whatever your day.
            </p>
            <a
              href="#offer"
              className="inline-flex items-center justify-center h-12 px-8 bg-espresso text-primary-foreground font-body text-sm tracking-wide rounded-sm hover:bg-espresso/90 transition-colors mb-4"
            >
              Start with Your First Pair
            </a>
            <p className="font-body text-xs text-muted-foreground">
              30-day satisfaction guarantee · Free shipping · Body-safe certified
            </p>
          </div>

          {/* Image */}
          <div className={`md:col-span-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <img
              src={heroImg}
              alt="Woman wearing hertones intimate recovery underwear"
              className="w-full h-auto rounded-lg object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;
