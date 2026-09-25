import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import CartDrawer from "./CartDrawer";
import MobileNavOverlay from "./MobileNavOverlay";
const hero1 = "/images/hero-1.jpg";
const hero2 = "/images/hero-2.jpg";
const hero3 = "/images/hero-3.jpg";
const hero4 = "/images/hero-0.jpg";
const slides = [
  {
    image: hero1,
    eyebrow: "Underwear, In Your Tone",
    title: <>Real Cotton.<br /><em className="italic font-normal">Designed for Every Tone.</em></>,
  },
  {
    image: hero2,
    eyebrow: "Cotton · Naturally Soft",
    title: <>Thoughtfully Made<br /><em className="italic font-normal">For Everyday Comfort</em></>,
  },
  {
    image: hero4,
    eyebrow: "Six Tones · Every Body",
    title: <>Made for<br /><em className="italic font-normal">Every You</em></>,
  },
  {
    image: hero3,
    eyebrow: "Soft, To The Touch",
    title: <>Made Perfect<br /><em className="italic font-normal">In Every Way</em></>,
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setFadeKey(k => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[70vh] md:min-h-[82vh] overflow-hidden">
      {/* Background images with crossfade */}
      {slides.map((s, i) => {
        const shouldRenderImage = i === 0 || i === current;
        const isDisplayed = i === current && loadedSlides.has(i);
        const showFallback = i === 0 && !loadedSlides.has(current);

        return (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: isDisplayed || showFallback ? 1 : 0 }}
        >
          {shouldRenderImage && (
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              onLoad={() => setLoadedSlides((loaded) => new Set(loaded).add(i))}
              {...(i === 0 ? { fetchpriority: "high" as const } : {})}
            />
          )}
          <div className="absolute inset-0 bg-espresso/40" />
        </div>
        );
      })}

      {/* Overlay nav */}
      <nav className="relative z-50 px-6 pt-5">
        <div className="flex items-center justify-between h-12">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-display text-2xl font-semibold tracking-tight text-primary-foreground">
            hertones
          </Link>

          <CartDrawer variant="light" />
        </div>
      </nav>

      <MobileNavOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Hero content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(70vh-5rem)] md:min-h-[calc(82vh-5rem)]">
        <div key={fadeKey} className="max-w-3xl mx-auto text-center px-6 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-primary-foreground/70 font-body mb-6">
            {slide.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.1] text-primary-foreground mb-8">
            {slide.title}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary-foreground text-espresso font-body text-sm tracking-wide rounded-sm hover:bg-primary-foreground/90 transition-colors"
            >
              Shop the Collection
            </Link>
            <a
              href="#shop-by-tone"
              className="inline-flex items-center justify-center h-12 px-8 border border-primary-foreground/30 text-primary-foreground font-body text-sm tracking-wide rounded-sm hover:bg-primary-foreground/10 transition-colors"
            >
              Explore the Tones
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 ${
              i === current
                ? 'w-7 h-2.5 bg-primary-foreground'
                : 'w-2.5 h-2.5 bg-primary-foreground/40 hover:bg-primary-foreground/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
