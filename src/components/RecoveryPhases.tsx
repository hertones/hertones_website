import { useEffect, useRef, useState, useCallback } from "react";
import { Layers, Ruler, Leaf } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = "https://lomolmgpwfzxbtmfjgpb.supabase.co/storage/v1/object/public/hertones-video-images/";
const TOTAL_FRAMES = 216;
const PRELOAD_FIRST = 20;
const CHUNK_SIZE = 20;

const frameUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `${BASE_URL}frame_${String(i).padStart(3, "0")}_delay-0.042s.webp`
);

const phases = [
  {
    icon: Ruler,
    eyebrow: "Thoughtful Construction",
    title: "Designed Around the Body",
    description: "Flattering silhouettes, smooth seams, and thoughtfully placed support come together for a fit that feels secure without feeling restrictive.",
  },
  {
    icon: Layers,
    eyebrow: "Material Transparency",
    title: "Cotton Without the Fine Print",
    description: "Many underwear brands lead with cotton while relying heavily on polyester and synthetic materials. hertones takes a more considered, Cotton-focused approach to what you wear closest to your skin.",
  },
  {
    icon: Leaf,
    eyebrow: "Cotton",
    title: "The Foundation of Softness",
    description: "Soft, breathable Cotton creates a naturally comfortable foundation designed for everyday wear, movement, and life in your own skin.",
  },
];

const RecoveryPhases = () => {
  const { ref: revealRef, isVisible } = useScrollReveal(0.1);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const [shouldLoadFrames, setShouldLoadFrames] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadFrames(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Resize canvas to container using ResizeObserver
  useEffect(() => {
    const container = canvasContainerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    return () => observer.disconnect();
  }, [drawFrame]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload frames — show frame 0 ASAP
  useEffect(() => {
    if (!shouldLoadFrames) return;
    let cancelled = false;

    const loadImage = (idx: number): Promise<void> =>
      new Promise((resolve) => {
        if (imagesRef.current[idx]) { resolve(); return; }
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current[idx] = img;
            // Draw frame 0 immediately when it loads
            if (idx === 0 && !isLoaded) {
              drawFrame(0);
              setIsLoaded(true);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrls[idx];
      });

    const preload = async () => {
      // Load frame 0 first for instant display
      await loadImage(0);
      // Then load rest of first batch
      await Promise.all(
        Array.from({ length: PRELOAD_FIRST - 1 }, (_, i) => loadImage(i + 1))
      );

      for (let start = PRELOAD_FIRST; start < TOTAL_FRAMES; start += CHUNK_SIZE) {
        if (cancelled) return;
        const end = Math.min(start + CHUNK_SIZE, TOTAL_FRAMES);
        await Promise.all(
          Array.from({ length: end - start }, (_, i) => loadImage(start + i))
        );
      }
    };

    preload();
    return () => { cancelled = true; };
  }, [drawFrame, isLoaded, shouldLoadFrames]);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollable = sectionHeight - viewportHeight;
        if (scrollable <= 0) return;

        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        const phase = frameIndex < 112 ? 0 : frameIndex < 188 ? 1 : 2;
        setActivePhase(phase);

        setTextOpacity(1);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <section
      ref={(el: HTMLDivElement | null) => {
        (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      id="why-it-feels-different"
      className="relative px-4 mb-24 scroll-mt-20"
      style={{ height: isMobile ? "300vh" : "500vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-start justify-start pt-4 md:pt-8">
        <h2 className={`font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-left mb-4 ml-4 md:ml-8 bg-gradient-to-r from-accent via-espresso to-accent bg-clip-text text-transparent transition-all duration-[800ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-4'}`}>
          Why It Feels Different
        </h2>
        <div className={`w-full mx-auto rounded-2xl overflow-hidden bg-card shadow-lg transition-all duration-[800ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'}`} style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left column — text */}
            <div
              className="relative flex flex-col items-start justify-center p-6 md:p-12 lg:p-16 min-h-[14rem] md:min-h-[28rem] lg:min-h-[32rem] overflow-hidden"
              style={{ opacity: textOpacity, transition: "opacity 0.1s ease-out" }}
            >
              {phases.map((phase, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-12 lg:p-16 transition-all duration-500 ease-out"
                  style={{
                    opacity: activePhase === i ? 1 : 0,
                    transform: activePhase === i ? "translateY(0)" : activePhase > i ? "translateY(-20px)" : "translateY(20px)",
                    pointerEvents: activePhase === i ? "auto" : "none",
                  }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 md:mb-5">
                    <phase.icon className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                  </div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-body mb-2 md:mb-3">
                    {phase.eyebrow}
                  </p>
                  <h2 className="font-display text-xl md:text-3xl lg:text-5xl font-medium text-foreground leading-tight mb-3 md:mb-4">
                    {phase.title}
                  </h2>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right column — animation */}
            <div
              ref={canvasContainerRef}
              className="relative aspect-[5/8] md:aspect-auto md:min-h-[28rem] lg:min-h-[32rem]"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryPhases;
