import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  url: string;
  alt: string;
  type?: "image" | "video";
}

interface ProductImageCarouselProps {
  images: Array<{ node: { url: string; altText: string | null } }>;
  productTitle: string;
  localImages?: Array<{ url: string; alt: string; type?: "image" | "video" }> | null;
  placeholderImage?: { url: string; alt: string } | null;
}

const ProductImageCarousel = ({ images, productTitle, localImages, placeholderImage }: ProductImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Use local images if available, otherwise fall back to Shopify images
  const shopifySlides: Slide[] = images.map((img) => ({ url: img.node.url, alt: img.node.altText || productTitle, type: "image" }));
  const slides: Slide[] = localImages && localImages.length > 0
    ? localImages.map((img) => ({ url: img.url, alt: img.alt, type: img.type || "image" }))
    : shopifySlides.length > 0
      ? shopifySlides
      : placeholderImage
        ? [{ ...placeholderImage, type: "image" }]
        : [];

  // Reset index when slides change (tone switch)
  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [localImages, images]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const slideWidth = container.offsetWidth;
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < slides.length - 1) scrollToIndex(activeIndex + 1);
      if (diff < 0 && activeIndex > 0) scrollToIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (slides.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-sand/20 flex items-center justify-center">
        <span className="font-body text-xs text-muted-foreground/40 tracking-widest uppercase">No images</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile: full-bleed swipeable carousel */}
      <div className="lg:hidden relative">
        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {slides.map((slide, i) => (
            <div
              key={`${slide.url}-${i}`}
              className="w-full flex-shrink-0 snap-center aspect-[3/4] bg-sand/30"
            >
              {slide.type === "video" ? (
                <video
                  src={slide.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full object-contain"
                  aria-label={slide.alt}
                />
              ) : (
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              )}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-espresso" : "w-1.5 bg-espresso/20"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: main image + thumbnail strip */}
      <div className="hidden lg:flex gap-3">
        {/* Thumbnail strip */}
        <div className="flex flex-col gap-2 w-16 shrink-0">
          {slides.map((slide, i) => (
            <button
              key={`${slide.url}-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`aspect-[3/4] rounded overflow-hidden border transition-all ${
                i === activeIndex
                  ? "border-espresso ring-1 ring-espresso"
                  : "border-border opacity-50 hover:opacity-100"
              }`}
            >
              {slide.type === "video" ? (
                <video src={slide.url} muted className="w-full h-full object-cover" aria-hidden="true" />
              ) : (
                <img src={slide.url} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-sand/30 relative group">
          {slides[activeIndex]?.type === "video" ? (
            <video
              src={slides[activeIndex].url}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              className="w-full h-full object-contain"
              aria-label={slides[activeIndex].alt}
            />
          ) : (
            <img
              src={slides[activeIndex]?.url}
              alt={slides[activeIndex]?.alt}
              className="w-full h-full object-contain"
            />
          )}

          {/* Navigation arrows */}
          {activeIndex > 0 && (
            <button
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-foreground/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4 text-espresso" />
            </button>
          )}
          {activeIndex < slides.length - 1 && (
            <button
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-foreground/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4 text-espresso" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
