import { type ReactNode } from "react";
import { cx } from "../lib/utils";

type Tone = "paper" | "white" | "ink";

interface PanelProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
  /** Remove default padding for full-bleed compositions. */
  bleed?: boolean;
}

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-paper",
};

/** A single full-viewport-width section within a horizontal page. */
export function Panel({
  tone = "paper",
  className,
  children,
  id,
  ariaLabel,
  bleed = false,
}: PanelProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cx(
        "h-panel flex flex-col justify-center",
        // Leave room for the fixed dispatch bar (top) and highway (bottom).
        !bleed && "px-6 sm:px-10 lg:px-16 pt-24 pb-28",
        tones[tone],
        className
      )}
    >
      {children}
    </section>
  );
}
