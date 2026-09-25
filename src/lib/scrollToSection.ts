/**
 * Smoothly scroll to a section, tolerating late layout shifts
 * (images loading, reveal animations) without visible re-jumping.
 */
export function scrollToSection(id: string, delay = 120) {
  if (typeof window === "undefined") return;

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  // A manual wheel/touch gesture aborts any pending correction.
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });

  const start = () => {
    const el = document.getElementById(id);
    if (!el || cancelled) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Watch until scrolling settles, then silently correct any drift.
    let lastY = window.scrollY;
    let stableFrames = 0;
    let elapsed = 0;

    const tick = () => {
      if (cancelled) return;
      elapsed += 16;
      const y = window.scrollY;
      stableFrames = Math.abs(y - lastY) < 1 ? stableFrames + 1 : 0;
      lastY = y;

      if (stableFrames > 6 || elapsed > 2000) {
        const node = document.getElementById(id);
        if (node) {
          const drift = node.getBoundingClientRect().top;
          const margin =
            parseFloat(getComputedStyle(node).scrollMarginTop || "0") || 0;
          const offset = drift - margin;
          if (Math.abs(offset) > 6) {
            window.scrollTo({ top: window.scrollY + offset, behavior: "auto" });
          }
        }
        window.removeEventListener("wheel", cancel);
        window.removeEventListener("touchstart", cancel);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  window.setTimeout(start, delay);
}
