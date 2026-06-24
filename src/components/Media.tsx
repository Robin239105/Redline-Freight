import { cx } from "../lib/utils";

/**
 * Full-height editorial image column with a hairline border and a mono caption
 * chip. Shown from the `md` breakpoint up (hidden on small phones where it
 * would crowd the type). Use inside a two-column panel grid.
 */
export function ImageColumn({
  src,
  alt,
  caption,
  side = "right",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "editorial-img relative hidden md:block",
        side === "right" ? "border-l border-line" : "border-r border-line",
        className
      )}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      {caption && (
        <span className="absolute bottom-6 left-6 z-10 bg-paper px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink">
          {caption}
        </span>
      )}
    </div>
  );
}

/**
 * Full-bleed background image with a readability scrim and subtle
 * Ken Burns zoom drift. `tone` controls the scrim color so text stays legible.
 */
export function BgImage({
  src,
  alt,
  tone = "paper",
}: {
  src: string;
  alt: string;
  tone?: "paper" | "ink";
}) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden={!alt}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{
          animation: "kenBurns 25s ease-in-out infinite alternate",
        }}
      />
      <div
        className={cx(
          "absolute inset-0",
          tone === "paper"
            ? "bg-gradient-to-r from-paper via-paper/95 to-paper/50"
            : "bg-gradient-to-r from-ink via-ink/95 to-ink/50"
        )}
      />
    </div>
  );
}
