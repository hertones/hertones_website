import { useEffect, useRef, useState } from "react";

interface HoverVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

/** Shows a still poster; plays the video on hover (desktop) or tap (touch). */
const HoverVideo = ({ src, poster, alt, className }: HoverVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setLoaded(true);
    setPlaying(true);
  };
  useEffect(() => {
    if (playing && loaded) void ref.current?.play().catch(() => undefined);
  }, [playing, loaded]);

  const stop = () => {
    const v = ref.current;
    setPlaying(false);
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
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
        preload="none"
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
