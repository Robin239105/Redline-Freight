import { useEffect, useRef, useState, useCallback } from "react";
import { clamp, lerp, prefersReducedMotion } from "../lib/utils";

/**
 * useHorizontalScroll — maps native vertical scroll to horizontal movement.
 *
 * Technique:
 *  - The track is `position:fixed` and laid out as a horizontal flex row.
 *  - We set `document.body.style.height` to trackWidth - innerWidth + innerHeight,
 *    which maps the native vertical scroll range exactly to the horizontal scrollable
 *    range (so trackpad, scrollbar, arrow keys, Page Up/Down and mobile swipe all work).
 *  - On every frame we lerp the current translate toward `scrollY` and apply
 *    it as `translate3d(-x, 0, 0)`.
 *  - With reduced motion we skip the lerp and apply the transform instantly.
 */
export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // rAF / lerp state kept in refs so the animation loop never re-subscribes.
  const targetX = useRef(0);
  const currentX = useRef(0);
  const rafId = useRef<number | null>(null);
  const trackWidth = useRef(0);

  /** Measure the track and size the body so the scroll range matches it. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.scrollWidth;
    trackWidth.current = width;

    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      document.body.style.height = `${width - window.innerWidth + window.innerHeight}px`;
    } else {
      document.body.style.height = "";
    }
    updateProgress();
  }, []);

  const updateProgress = useCallback(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      const max = trackWidth.current - window.innerWidth;
      const p = max > 0 ? clamp(window.scrollY / max) : 0;
      setProgress(p);
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max) : 0;
      setProgress(p);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = prefersReducedMotion();

    const onScroll = () => {
      targetX.current = window.scrollY;
      updateProgress();
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        if (reduce) {
          // No smoothing: jump straight to the scroll position.
          currentX.current = targetX.current;
          track.style.transform = `translate3d(${-currentX.current}px,0,0)`;
        }
      } else {
        track.style.transform = "";
      }
    };

    const tick = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) {
        track.style.transform = "";
        rafId.current = requestAnimationFrame(tick);
        return;
      }
      currentX.current = lerp(currentX.current, targetX.current, 0.1);
      // Snap when close enough to avoid sub-pixel jitter forever.
      if (Math.abs(targetX.current - currentX.current) < 0.1) {
        currentX.current = targetX.current;
      }
      track.style.transform = `translate3d(${-currentX.current}px,0,0)`;
      rafId.current = requestAnimationFrame(tick);
    };

    // New page always starts at the beginning of the drive.
    window.scrollTo(0, 0);
    currentX.current = 0;
    targetX.current = 0;

    // Use ResizeObserver to track container width changes dynamically (handles HMR, fonts, and images)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === track) {
          measure();
        }
      }
    });
    resizeObserver.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    if (!reduce) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      onScroll();
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      // Reset body height so the next page measures cleanly.
      document.body.style.height = "";
    };
  }, [measure, updateProgress]);

  return { trackRef, progress, remeasure: measure };
}
