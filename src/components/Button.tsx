import { useNavigate } from "react-router-dom";
import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { cx } from "../lib/utils";

type Variant = "primary" | "outline" | "ghost" | "white";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  to?: string;
  children: ReactNode;
}

const base =
  "group inline-flex items-center justify-center gap-2.5 font-mono text-sm uppercase tracking-[0.12em] " +
  "px-7 py-3.5 min-h-[48px] transition-colors duration-300 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  // Black box, red wipe up on hover, white text throughout.
  primary: "btn-sweep bg-ink text-white hover:text-white",
  // Hairline outline that fills red on hover.
  outline: "btn-sweep border border-ink text-ink hover:text-white",
  // Inline text link with animated underline.
  ghost: "px-0 py-0 min-h-0 text-ink link-underline hover:text-red",
  // White box, red wipe up on hover, black text that turns white on hover.
  white: "btn-sweep bg-white text-ink hover:text-white",
};

/** Swiss editorial button: monospace label, sharp corners, red wipe sweep. */
export function Button({
  variant = "primary",
  to,
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      className={cx(base, variants[variant], className)}
      onClick={(e) => {
        onClick?.(e);
        if (to && !e.defaultPrevented) navigate(to);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
