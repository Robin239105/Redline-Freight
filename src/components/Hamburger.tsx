import { motion } from "framer-motion";
import { cx } from "../lib/utils";

interface HamburgerProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

/** Hamburger that morphs into an X. Identical on desktop and mobile. */
export function Hamburger({ open, onClick, className }: HamburgerProps) {
  const bar = "absolute left-0 h-[2.5px] w-7 bg-current rounded-full";
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cx(
        "relative grid h-10 w-10 place-items-center text-ink rounded-full border border-transparent transition-all duration-300 hover:border-ink/20 hover:bg-ink/5 focus:outline-none",
        className
      )}
    >
      <span className="relative block h-5 w-7">
        <motion.span
          className={bar}
          style={{ top: 2 }}
          animate={open ? { rotate: 45, top: 9 } : { rotate: 0, top: 2 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={bar}
          style={{ top: 9 }}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className={bar}
          style={{ top: 16 }}
          animate={open ? { rotate: -45, top: 9 } : { rotate: 0, top: 16 }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </button>
  );
}
