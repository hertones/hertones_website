import { useScrollReveal } from "@/hooks/useScrollReveal";

const rows = [
  { label: "Material Standard", them: "Synthetic or unspecified blends", us: "OEKO-TEX certified, body-safe, breathable" },
  { label: "Absorbency Engineering", them: "Single-layer or unverified absorbency", us: "Multi-layer, independently lab-tested" },
  { label: "Recovery Design", them: "Built for leakage management only", us: "Engineered for whole-cycle comfort and recovery" },
  { label: "All-Day Comfort", them: "Bulky construction, waistband discomfort common", us: "Designed for 18-hour wear — gym, office, sleep" },
  { label: "Independent Testing", them: "Brand claims only", us: "Third-party lab verified — every batch" },
];

const ComparisonSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-oat">
      <div className="max-w-[1200px] mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-3">
            Why intimate recovery demands a different standard.
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Not all period underwear is the same. Here is the difference.
          </p>
        </div>

        <div className={`overflow-x-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="font-body text-xs tracking-wide uppercase text-muted-foreground text-left p-4 border-b border-border w-1/4"></th>
                <th className="font-body text-xs tracking-wide uppercase text-muted-foreground text-left p-4 border-b border-border w-[37.5%]">Standard Period Underwear</th>
                <th className="font-display text-xs tracking-wide uppercase text-accent font-semibold text-left p-4 border-b border-accent/30 bg-accent/5 w-[37.5%] rounded-t-lg">hertones Recovery Brief</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="font-body text-xs font-medium text-espresso p-4 border-b border-border">{row.label}</td>
                  <td className="font-body text-sm text-muted-foreground p-4 border-b border-border">{row.them}</td>
                  <td className="font-body text-sm text-espresso p-4 border-b border-border bg-accent/5">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
