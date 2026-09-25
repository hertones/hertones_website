import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const CountUp = ({ end, duration = 1500, isVisible, delay = 0, suffix = "" }: { end: number; duration?: number; isVisible: boolean; delay?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isVisible, end, duration, delay]);

  return <>{count}{suffix}</>;
};

const MissionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const stats = [
    { value: "1:1", label: "Buy One, Give One", delay: 0 },
    { value: "Cotton", label: "Cotton Focused", delay: 200 },
    { value: "6", label: "Tones for Every You", delay: 400 },
  ];

  return (
    <section ref={ref} className="py-14 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mx-auto mb-6 mt-6">
            <Heart className="h-5 w-5 text-accent" />
          </div>
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Our Promise</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-espresso mb-6">
            Comfort Beyond You
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            For every order placed, hertones donates a pair to women in need. Because every body deserves the comfort of soft, considered Cotton — in a tone made for them.
          </p>
          <div className="flex flex-row gap-6 justify-center items-center pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-row items-center gap-6">
                <div
                  className={`text-center transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-75 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  <p className="font-display text-3xl font-semibold text-accent">
                    {stat.value === "1:1" ? (
                      <span className={`inline-block transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: `${stat.delay}ms` }}>
                        1:1
                      </span>
                    ) : stat.value === "6" ? (
                      <CountUp end={6} isVisible={isVisible} delay={stat.delay} />
                    ) : (
                      <span className={`inline-block transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: `${stat.delay}ms` }}>
                        {stat.value}
                      </span>
                    )}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</p>
                </div>
                {i < 2 && <div className="hidden sm:block w-px h-12 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
