import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import LazyVideo from "@/components/LazyVideo";

const reviewCards = [
  {
    type: "image" as const,
    media: "/images/review-1.jpg",
    poster: undefined,
    quote: "\"The softest underwear I've ever worn. The cotton is unreal.\"",
    reviewer: "Sarah M.",
    product: "Boy Short",
    price: "$24.99",
    productImg: "/images/review-1.jpg",
  },
  {
    type: "video" as const,
    media: "/videos/bikini-espresso-turn-v4-muted.mp4",
    poster: "/images/video-posters/bikini-espresso-turn.jpg",
    quote: "\"The fit is so flattering, and they actually feel like real cotton.\"",
    reviewer: "Jessica R.",
    product: "Bikini",
    price: "$22.99",
    productImg: "/images/review-1.jpg",
  },
  {
    type: "image" as const,
    media: "/images/review-2.jpg",
    poster: undefined,
    quote: "\"Finally a tone that actually matches my skin. Obsessed.\"",
    reviewer: "Aisha K.",
    product: "French Cut",
    price: "$19.99",
    productImg: "/images/review-2.jpg",
  },
  {
    type: "video" as const,
    media: "/videos/boy-short-caramel-turn-v2-muted.mp4",
    poster: "/images/video-posters/boy-short-caramel-turn-v2.jpg",
    quote: "\"They breathe, they hold their shape, they feel considered.\"",
    reviewer: "Maria L.",
    product: "Boy Short",
    price: "$24.99",
    productImg: "/images/review-1.jpg",
  },
  {
    type: "image" as const,
    media: "/images/review-3.jpg",
    poster: undefined,
    quote: "\"Bought one cut, came back for all three. The cotton is that good.\"",
    reviewer: "Taylor N.",
    product: "Bikini",
    price: "$22.99",
    productImg: "/images/review-3.jpg",
  },
  {
    type: "video" as const,
    media: "/videos/boy-short-caramel-turn-v3-muted.mp4",
    poster: "/images/video-posters/boy-short-caramel-turn-v3.jpg",
    quote: "\"The tones are perfect. Truly everyday essentials.\"",
    reviewer: "Priya D.",
    product: "French Cut",
    price: "$19.99",
    productImg: "/images/review-2.jpg",
  },
];

const ReviewCard = ({ card }: { card: typeof reviewCards[0] }) => {
  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[280px] rounded-2xl overflow-hidden">
      {/* Media card */}
      <div className="relative overflow-hidden aspect-[3/4]">
        {card.type === "video" ? (
          <LazyVideo
            src={card.media}
            poster={card.poster}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={card.media}
            alt={card.reviewer}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={400}
            height={600}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Stars + quote overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-white text-xs leading-relaxed font-body line-clamp-3">
            {card.quote}
          </p>
          <p className="text-white/70 text-[10px] font-body mt-1.5">— {card.reviewer}</p>
        </div>
      </div>
      {/* Product info */}
      <div className="bg-white p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-sand">
          <img src={card.productImg} alt={card.product} className="w-full h-full object-cover" loading="lazy" decoding="async" width={40} height={40} />
        </div>
        <div className="min-w-0">
          <p className="font-body text-xs text-espresso font-medium truncate">{card.product}</p>
          <p className="font-body text-xs text-muted-foreground">{card.price}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  const scroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isPaused) {
      animationRef.current = requestAnimationFrame(scroll);
      return;
    }
    el.scrollLeft += 1.5;
    // Reset to start when reaching halfway (we duplicate cards)
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
    }
    animationRef.current = requestAnimationFrame(scroll);
  }, [isPaused]);

  useEffect(() => {
    if (!isVisible) return;
    animationRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, scroll]);

  const handlePointerDown = () => setIsPaused(true);
  const handlePointerUp = () => setIsPaused(false);

  // Duplicate cards for infinite scroll effect
  const allCards = [...reviewCards, ...reviewCards];

  return (
    <section ref={ref} id="reviews" className="py-24 px-0 bg-oat overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3">Community</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-espresso mb-4">
            What People Are Saying
          </h2>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto scrollbar-hide px-6 cursor-grab active:cursor-grabbing transition-opacity duration-800 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        {allCards.map((card, i) => (
          <ReviewCard key={i} card={card} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
