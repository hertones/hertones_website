import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What makes hertones different from other cotton underwear?",
    a: "Many brands lead with cotton while still relying heavily on polyester and synthetic materials. hertones takes a more considered, Cotton-focused approach to what you wear closest to your skin — paired with flattering silhouettes and a thoughtfully designed spectrum of body-tone shades.",
  },
  {
    q: "Is hertones made with Cotton?",
    a: "Yes. Our pieces are Cotton focused and designed for softness, breathability, and everyday comfort, with a more thoughtful material approach than the standard cotton-blend underwear.",
  },
  {
    q: "How do I choose my tone?",
    a: "The Shop by Tone selector lets you compare all six shades — Espresso, Chocolate, Mocha, Almond, Caramel, and Nude. Most people choose the tone closest to their natural skin so it disappears under everything.",
  },
  {
    q: "How do the three cuts fit differently?",
    a: "The Bikini is a flattering everyday cut with a higher leg and minimal back coverage. The French Cut is a waist-defining silhouette with an elongated leg line and comfortable coverage. The Boy Short is a soft, full-coverage shape designed for lounging, layering, and everyday wear.",
  },
  {
    q: "How should I care for my hertones pieces?",
    a: "We recommend a cool gentle wash with a mild detergent and hang or low-tumble drying to preserve the softness of the cotton. Specific care details are printed on each piece.",
  },
  {
    q: "Will additional tones be introduced?",
    a: "The Foundation Collection launches in six considered body-tone shades. We're listening — sign up to be the first to hear about future tones.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} id="faq" className="py-24 px-6 bg-ivory scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Questions</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-espresso">
            Frequently Asked
          </h2>
        </div>

        <div className={`transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-6 bg-oat">
                <AccordionTrigger className="font-display text-sm font-medium text-espresso hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
