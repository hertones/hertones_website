import { useScrollReveal } from "@/hooks/useScrollReveal";

const reviews = [
  { text: "I wore hertones through my first postpartum week and genuinely forgot I was dealing with anything. I have never felt that way before. I only wish I had found this sooner.", name: "Amara T.", ctx: "Heavy Flow · Postpartum Recovery" },
  { text: "I run 4 days a week and I used to dread the first two days of my cycle. hertones changed that completely. I ran a half marathon on day two and felt nothing.", name: "Jess R.", ctx: "Heavy Flow · Active Lifestyle" },
  { text: "The price surprised me at first. Then I did the math — I spent more on disposables in a month than a pair of hertones costs. Never going back.", name: "Priya N.", ctx: "Moderate Flow" },
  { text: "I bought a pair for my daughter when she started her cycle. She told me it was the first time she did not feel anxious at school. That alone was worth it.", name: "Linda K.", ctx: "Light Flow · Teen" },
  { text: "After my surgery, everything felt uncomfortable. hertones was the only underwear I could wear without thinking about it. Recovery became so much easier.", name: "Keisha D.", ctx: "Overnight · Post-Surgery" },
  { text: "I have tried every brand out there. hertones is the only one I would actually recommend. The absorbency is real and the fit does not shift.", name: "Sarah M.", ctx: "Heavy Flow" },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-accent fill-accent" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsLanding = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <h2 className={`font-display text-2xl md:text-3xl font-medium text-espresso text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          What 18,000+ women are saying.
        </h2>
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {reviews.map((r, i) => (
            <div key={i} className="bg-background border border-border rounded-lg p-6">
              <Stars />
              <p className="font-body text-sm text-foreground leading-relaxed mb-4">"{r.text}"</p>
              <p className="font-body text-xs text-muted-foreground">
                <span className="font-medium text-espresso">{r.name}</span> — {r.ctx}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsLanding;
