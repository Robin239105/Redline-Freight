import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Hamburger } from "./Hamburger";
import { useMegaMenu } from "../hooks/useMegaMenu";
import { cx } from "../lib/utils";

function HeaderClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className="tabular-nums font-semibold">
      {now.toLocaleTimeString("en-US", { hour12: false })}
    </span>
  );
}

/**
 * Fixed top bar on every page. Swiss editorial: paper background, black
 * hairline baseline, monospace utility type. Left: wordmark (routes home).
 * Center: Live system status monitor.
 * Right: Monospace "Get a quote" pill button + the hamburger that opens the mega-menu.
 */
export function DispatchBar() {
  const { open, toggle } = useMegaMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          "flex items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-8 border-b",
          scrolled
            ? "bg-paper/85 py-2.5 backdrop-blur-lg shadow-sm border-ink/10"
            : "bg-paper/95 py-4 border-ink"
        )}
      >
        {/* Wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="Redline Freight Co. — home"
        >
          <span className="brand-mark-box grid h-6 w-6 shrink-0 place-items-center border border-ink bg-transparent">
            <span className="brand-mark-line-container" />
          </span>
          <span className="font-display text-base uppercase tracking-tight text-ink sm:text-lg">
            <span className="font-black">Red</span>
            <span className="font-black text-red">line</span>
            <span className="font-light text-ink/70 ml-1">Freight Co.</span>
          </span>
        </Link>

        {/* Live Dispatch Monitor */}
        <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted md:flex select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red"></span>
          </span>
          <span className="font-bold text-ink">SYS ACTIVE</span>
          <span className="text-muted/30" aria-hidden>//</span>
          <span>LANES CLEAR</span>
          <span className="text-muted/30" aria-hidden>//</span>
          <span className="text-ink">
            <HeaderClock />
          </span>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          <Link
            to="/contact"
            className="hidden rounded-full border border-ink bg-transparent px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-red hover:border-red hover:text-white sm:inline-block"
          >
            Get a quote
          </Link>
          <span className="hidden h-4 w-px bg-line-soft sm:block" aria-hidden />
          <Hamburger open={open} onClick={toggle} />
        </div>
      </div>
    </header>
  );
}
