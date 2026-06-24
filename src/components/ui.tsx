import { type ReactNode } from "react";
import { cx } from "../lib/utils";

/** Mono label with a red tick — Swiss section marker. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-label",
        className
      )}
    >
      <span className="inline-block h-2 w-2 shrink-0 bg-red" aria-hidden />
      {children}
    </span>
  );
}

/** Oversized Archivo headline. */
export function Headline({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={cx(
        "font-display uppercase text-display-md [font-weight:800]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Readable body lead, constrained measure. */
export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "max-w-[46ch] text-lg leading-relaxed text-current/80",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Big numbered section index, e.g. "01 / 04". */
export function IndexMark({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <span className={cx("font-mono text-xs tracking-widest text-muted", className)}>
      {String(current).padStart(2, "0")}{" "}
      <span className="text-muted/50">/ {String(total).padStart(2, "0")}</span>
    </span>
  );
}
