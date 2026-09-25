import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  { q: "Will it actually hold on a heavy day?", a: "Yes — and we have the lab data to prove it. Every hertones pair is independently tested for absorbency performance. Choose the Heavy or Overnight flow level for your highest-demand days." },
  { q: "How do I know which flow level is right for me?", a: "We have a 60-second flow guide on the product page. Most women use two levels — one for lighter days, one for heavy days. When in doubt, size up." },
  { q: "Is it worth the cost compared to disposables?", a: "One pair of hertones lasts 2+ years with proper care. The average woman spends over $150 per year on disposables. A single pair pays for itself within a few cycles." },
  { q: "What is it made of — is it safe for intimate skin?", a: "hertones is made from OEKO-TEX certified materials — rigorously tested and free from 100+ harmful substances including formaldehyde, heavy metals, and pesticides. It is dermatologist reviewed for sensitive skin." },
  { q: "Can I exercise in it?", a: "Yes. hertones was designed for all-day wear, including movement. The waistband stays in place, the absorbency layer performs through sweat and activity, and the fit does not shift." },
  { q: "What if I do not like it?", a: "Our 30-day full-cycle guarantee means you can wear hertones through one complete cycle. If you are not completely satisfied, contact us for a full refund — no questions, no returns needed." },
];

const FAQLanding = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-[800px] mx-auto">
        <h2 className={`font-display text-2xl md:text-3xl font-medium text-espresso text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Your questions, answered.
        </h2>
        <div className={`space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-lg bg-ivory overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-sm font-medium text-espresso">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-muted-foreground shrink-0 ml-4 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-5 font-body text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQLanding;
