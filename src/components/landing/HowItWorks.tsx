import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { num: "01", title: "Choose your flow level", body: "hertones comes in Light, Moderate, Heavy, and Overnight. Take the 60-second flow guide to find yours." },
  { num: "02", title: "Wear with complete confidence", body: "From your first day to your last, hertones performs — through a workout, a full work day, and overnight. No backup needed." },
  { num: "03", title: "Care and repeat", body: "Machine wash on a gentle cycle. Air dry. Your pair will perform consistently for 2+ years with proper care." },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <h2 className={`font-display text-2xl md:text-3xl font-medium text-espresso text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Three steps. Zero compromise.
        </h2>
        <div className={`grid md:grid-cols-3 gap-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {steps.map((step, i) => (
            <div key={i} className="text-center md:text-left">
              <span className="font-display text-5xl font-light text-almond">{step.num}</span>
              <h3 className="font-display text-lg font-medium text-espresso mt-3 mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block mt-6 text-almond text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
