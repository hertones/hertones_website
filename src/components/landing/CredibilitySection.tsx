import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { number: "92%", label: "of testers said they felt more confident on heavy flow days" },
  { number: "4.9", label: "average rating from 2,400+ verified reviews" },
  { number: "94%", label: "said they would recommend hertones to a friend" },
];

const certs = [
  { title: "OEKO-TEX Standard 100", desc: "Free from 100+ harmful chemicals. Safe for intimate skin." },
  { title: "Independent Absorbency Testing", desc: "Lab-verified performance. Not a marketing claim." },
  { title: "Dermatologist Reviewed", desc: "Reviewed for sensitive skin compatibility." },
  { title: "GOTS Certified Cotton", desc: "Grown without synthetic pesticides or fertilizers." },
];

const CredibilitySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-background">
      <div className={`max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="space-y-8">
          {stats.map((s, i) => (
            <div key={i}>
              <span className="font-display text-4xl md:text-5xl font-semibold text-accent">{s.number}</span>
              <p className="font-body text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {certs.map((c, i) => (
            <div key={i} className="border border-border rounded-lg p-5 bg-ivory">
              <h3 className="font-display text-sm font-semibold text-espresso mb-1">{c.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
