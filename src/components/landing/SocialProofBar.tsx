const stats = [
  { number: "4.9 Stars", label: "from 2,400+ reviews" },
  { number: "18,000+", label: "women trust hertones" },
  { number: "OEKO-TEX", label: "Certified · Lab-Tested" },
];

const SocialProofBar = () => (
  <section className="bg-sand/60 py-8">
    <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:divide-x md:divide-border">
      {stats.map((s, i) => (
        <div key={i} className="text-center px-8 md:px-12">
          <span className="font-display text-lg font-semibold text-accent">{s.number}</span>
          <span className="font-body text-sm text-muted-foreground ml-2">{s.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default SocialProofBar;
