import { useEffect, useState, useCallback, type ReactNode } from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { ScrollProvider, type ExitSection } from "../hooks/useScrollProgress";
import { Highway } from "./Highway";
import { prefersReducedMotion } from "../lib/utils";

interface HorizontalTrackProps {
  /** One label per panel, in order — these become the highway "exits". */
  exits: string[];
  children: ReactNode;
}

/**
 * Wraps a page's panels in the fixed horizontal track, wires up the scroll
 * engine, measures each panel's offset for exit-jumping, and renders the
 * persistent highway at the bottom.
 */
export function HorizontalTrack({ exits, children }: HorizontalTrackProps) {
  const { trackRef, progress } = useHorizontalScroll();
  const [sections, setSections] = useState<ExitSection[]>([]);

  // Measure each panel's scroll offset so nav exits can jump precisely.
  const measureSections = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const panels = Array.from(track.querySelectorAll<HTMLElement>(".h-panel"));
    const isDesktop = window.innerWidth >= 1024;
    setSections(
      panels.map((panel, i) => ({
        label: exits[i] ?? `EXIT ${i + 1}`,
        offset: isDesktop ? panel.offsetLeft : panel.offsetTop,
      }))
    );
  }, [exits, trackRef]);

  useEffect(() => {
    measureSections();
    const t = window.setTimeout(measureSections, 350);
    window.addEventListener("resize", measureSections);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measureSections);
    };
  }, [measureSections]);

  const jumpTo = useCallback((offset: number) => {
    window.scrollTo({
      top: offset,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return (
    <ScrollProvider value={{ progress, sections, jumpTo }}>
      <div ref={trackRef} className="h-track">
        {children}
      </div>
      <Highway />
    </ScrollProvider>
  );
}
