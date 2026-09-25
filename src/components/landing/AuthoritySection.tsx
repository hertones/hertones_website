import { useScrollReveal } from "@/hooks/useScrollReveal";
const expertPhoto = "/images/landing/expert-photo.jpg";
const AuthoritySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-espresso">
      <div className={`max-w-[800px] mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <img
          src={expertPhoto}
          alt="Dr. Amina Osei, OB/GYN"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-6 object-cover border-2 border-primary-foreground/20"
        />
        <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
          Dr. Amina Osei, OB/GYN
        </p>
        <blockquote className="font-display text-lg md:text-xl italic text-primary-foreground/90 leading-relaxed mb-8">
          "The engineering behind hertones addresses something I see in my clinic daily — women tolerating intimate discomfort because nothing in the market was built for recovery. hertones changes that standard."
        </blockquote>
        <div className="flex flex-wrap justify-center gap-4">
          {["OEKO-TEX Certified", "Lab Tested", "Gynecologist Reviewed"].map((badge) => (
            <span key={badge} className="font-body text-xs tracking-wide text-primary-foreground/70 border border-primary-foreground/20 rounded-full px-4 py-1.5">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
