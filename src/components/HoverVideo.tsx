import { useEffect, useRef, useState } from "react";

interface HoverVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

/** Shows a still poster; plays the video on hover (desktop) or tap (touch).
 *  The video file starts downloading as soon as the card nears the viewport,
 *  so playback begins instantly on hover with no loading gap. */
const HoverVideo = ({ src, poster, alt, className }: HoverVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const wantPlay = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Preload the video file when the card approaches the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // If a tap requested playback before the src was attached, play once ready.
  useEffect(() => {
    if (loaded && wantPlay.current) void ref.current?.play().catch(() => undefined);
  }, [loaded]);

  const play = () => {
    wantPlay.current = true;
    setLoaded(true);
    const v = ref.current;
    if (v && v.src) void v.play().catch(() => undefined);
  };

  const stop = () => {
    wantPlay.current = false;
    const v = ref.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onClick={() => {
        if (window.matchMedia("(hover: hover)").matches) return;
        if (playing) stop();
        else play();
      }}
    >
      <video
        ref={ref}
        src={loaded ? src : undefined}
        className={className}
        muted
        loop
        playsInline
        preload={loaded ? "auto" : "none"}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={alt}
      />
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={928}
        height={1152}
        className={`${className} absolute inset-0 transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
};

export default HoverVideo;
