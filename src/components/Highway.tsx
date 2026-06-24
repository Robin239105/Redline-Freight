import { useScrollContext } from "../hooks/useScrollProgress";
import { cx } from "../lib/utils";
import { TruckIcon } from "./TruckIcon";

/**
 * Persistent highway pinned to the bottom of every page. Swiss editorial:
 * a black baseline rule on paper, a red progress fill, the truck driving the
 * fill edge, bordered exit tags, and a mono mile readout.
 */
export function Highway() {
  const { progress, sections, jumpTo } = useScrollContext();
  const mile = Math.round(progress * 1000);

  const currentScroll = typeof window !== "undefined" ? window.scrollY : 0;
  let activeIndex = 0;
  sections.forEach((s, i) => {
    if (currentScroll >= s.offset - 10) activeIndex = i;
  });

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-40 w-full bg-paper/95 backdrop-blur-sm">
      {/* Exit-sign nav */}
      <nav
        aria-label="Section exits"
        className="rule-b pointer-events-auto flex items-stretch overflow-x-auto border-line-soft"
      >
        {sections.map((s, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={s.label + i}
              onClick={() => jumpTo(s.offset)}
              aria-current={active ? "true" : undefined}
              className={cx(
                "group flex shrink-0 items-center gap-2 border-r border-line-soft px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors sm:text-[11px]",
                active
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-red hover:text-white"
              )}
            >
              <span className={cx("tabular-nums", active ? "text-red" : "text-muted group-hover:text-white")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-bold">{s.label}</span>
            </button>
          );
        })}
        <span className="ml-auto hidden items-center px-4 font-mono text-[11px] tracking-[0.14em] text-muted sm:flex">
          MILE <span className="ml-1 tabular-nums text-ink">{String(mile).padStart(4, "0")}</span>
          <span className="mx-1">/</span> 1000
        </span>
      </nav>

      {/* The road */}
      <div className="relative h-9 bg-paper">
        {/* baseline rule */}
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line" />
        {/* red progress fill */}
        <div
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-red"
          style={{ width: `${progress * 100}%` }}
        />
        {/* truck riding the fill edge */}
        <div
          className="absolute top-1/2 z-10 -translate-y-1/2"
          style={{ left: `${1 + progress * 91}%`, transition: "left 0.08s linear" }}
        >
          <TruckIcon className="h-7 w-auto" />
        </div>
      </div>
    </div>
  );
}
