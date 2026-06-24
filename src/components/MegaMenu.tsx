import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail, PackageSearch, ArrowUpRight } from "lucide-react";
import { useMegaMenu } from "../hooks/useMegaMenu";
import { NAV_ITEMS } from "../data/nav";
import { cx, prefersReducedMotion } from "../lib/utils";

function DispatchClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs tracking-[0.14em] text-muted">
      DISPATCH 24/7 · <span className="tabular-nums text-ink">{now.toLocaleTimeString("en-US", { hour12: false })}</span>
    </span>
  );
}

export function MegaMenu() {
  const { open, closeMenu } = useMegaMenu();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [preview, setPreview] = useState(0);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, [open, closeMenu]);

  const panelVariants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : { hidden: { y: "-100%" }, show: { y: 0 }, exit: { y: "-100%" } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink"
          variants={panelVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top bar mirrors the dispatch bar */}
          <div className="rule-b flex items-center justify-between px-4 py-3 sm:px-8">
            <span className="group flex items-center gap-2.5">
              <span className="brand-mark-box grid h-6 w-6 shrink-0 place-items-center border border-ink bg-transparent">
                <span className="brand-mark-line-container" />
              </span>
              <span className="font-display text-base uppercase tracking-tight text-ink">
                <span className="font-black">Red</span>
                <span className="font-black text-red">line</span>
                <span className="font-light text-ink/70 ml-1">Freight Co.</span>
              </span>
            </span>
            <button
              onClick={closeMenu}
              className="font-mono text-xs uppercase tracking-[0.14em] text-ink hover:text-red"
            >
              Close ✕
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_38%]">
            {/* Left: oversized exit links, hairline divided */}
            <nav aria-label="Primary" className="flex flex-col">
              {NAV_ITEMS.map((item, i) => {
                const active = item.path === pathname;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={closeMenu}
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "rule-b group flex items-center gap-5 border-line-soft px-4 py-3.5 transition-colors sm:px-8 lg:flex-1",
                      "hover:bg-red hover:text-white"
                    )}
                  >
                    <span className="font-mono text-xs tabular-nums text-muted group-hover:text-white/80">
                      {item.index}
                    </span>
                    <span
                      className={cx(
                        "font-display text-[clamp(2rem,5.5vw,4rem)] font-extrabold uppercase leading-none tracking-tight",
                        active && "text-red group-hover:text-white"
                      )}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-red group-hover:text-white">
                        ● current
                      </span>
                    )}
                    <ArrowUpRight
                      className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                      size={28}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: preview pane */}
            <div className="relative hidden border-l border-line-soft lg:block">
              <div className="editorial-img absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={NAV_ITEMS[preview].image}
                    src={NAV_ITEMS[preview].image}
                    alt={`Preview of the ${NAV_ITEMS[preview].label.toLowerCase()} page`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-paper/95 px-6 py-4 font-mono text-sm">
                {NAV_ITEMS[preview].blurb}
              </div>
            </div>
          </div>

          {/* Bottom utility strip */}
          <div className="rule-t flex flex-wrap items-center justify-between gap-4 border-line-soft px-4 py-3.5 sm:px-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
              <a href="tel:+18005550199" className="flex items-center gap-2 hover:text-red">
                <Phone size={14} /> 1-800-555-0199
              </a>
              <a href="mailto:dispatch@redlinefreight.co" className="flex items-center gap-2 hover:text-red">
                <Mail size={14} /> dispatch@redlinefreight.co
              </a>
              <Link to="/tracking" onClick={closeMenu} className="flex items-center gap-2 hover:text-red">
                <PackageSearch size={14} /> Track a shipment
              </Link>
            </div>
            <DispatchClock />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
