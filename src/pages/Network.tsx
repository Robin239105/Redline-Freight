import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Counter } from "../components/Counter";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { Button } from "../components/Button";
import { ImageColumn, BgImage } from "../components/Media";
import { IMG } from "../data/images";
import { HUBS, LANES } from "../data/content";
import { prefersReducedMotion } from "../lib/utils";

import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

const coverage = [
  { value: 32, label: "REGIONAL HUBS" },
  { value: 1450, suffix: "+", label: "ACTIVE LANES" },
  { value: 48, label: "STATES SERVED" },
  { value: 2, suffix: "-DAY", label: "AVG TRANSIT" },
];

function RouteMap() {
  const reduce = prefersReducedMotion();
  const hubById = Object.fromEntries(HUBS.map((h) => [h.id, h]));

  return (
    <svg
      viewBox="0 0 100 80"
      className="w-full max-w-3xl"
      role="img"
      aria-label="Stylized US route map with hubs in Los Angeles, Dallas, Chicago, Atlanta and New York"
    >
      {LANES.map(([a, b], i) => {
        const A = hubById[a];
        const B = hubById[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="#E4002B"
            strokeWidth={0.5}
            strokeLinecap="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: "easeInOut" }}
          />
        );
      })}
      {HUBS.map((h, i) => (
        <motion.g
          key={h.id}
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1 }}
          style={{ transformOrigin: `${h.x}px ${h.y}px` }}
        >
          <circle cx={h.x} cy={h.y} r={1.6} fill="#0B0B0A" />
          <circle cx={h.x} cy={h.y} r={3} fill="none" stroke="#0B0B0A" strokeWidth={0.25} opacity={0.4} />
          <text
            x={h.x}
            y={h.y - 4}
            textAnchor="middle"
            fill="#0B0B0A"
            style={{ font: "2.4px 'Space Mono', monospace", letterSpacing: "0.1px" }}
          >
            {h.id}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export default function Network() {
  useDocumentMetadata(
    "Shipping Network",
    "Explore Redline Freight's nationwide logistics network connecting regional hubs and shipping lanes coast-to-coast."
  );

  return (
    <HorizontalTrack exits={["MAP", "COVERAGE", "LANES"]}>
      {/* Map */}
      <Panel tone="paper" ariaLabel="Route map">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="mb-4 flex items-center gap-6">
              <Eyebrow>The network</Eyebrow>
              <IndexMark current={1} total={3} />
            </div>
            <Headline className="text-display-lg" as="h1">
              One network.<br />
              <span className="text-red">Every lane.</span>
            </Headline>
            <Lead className="mt-6">
              Five primary hubs anchor a web of lanes that reach every corner of
              the lower 48. Freight moves hub-to-hub on schedules, not guesses.
            </Lead>
          </Reveal>
          <Reveal delay={0.15}>
            <RouteMap />
          </Reveal>
        </div>
      </Panel>

      {/* Coverage */}
      <Panel tone="white" ariaLabel="Coverage" bleed>
        <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_36%]">
        <div className="flex h-full flex-col justify-center px-6 pt-24 sm:px-10 lg:px-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Eyebrow>Coverage</Eyebrow>
              <Headline className="mt-4 max-w-2xl text-display-md">Reach without the gaps.</Headline>
            </div>
            <IndexMark current={2} total={3} className="hidden sm:block" />
          </div>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
            {coverage.map((s, i) => (
              <RevealItem key={s.label}>
                <div className={i !== 0 ? "rule-t py-6 lg:pl-8" : "rule-t py-6"}>
                  <div className="tnum font-display text-6xl font-black lg:text-7xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-label text-muted">
                    {s.label}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <ImageColumn src={IMG.coverage} alt="Redline coverage across the United States" caption="COAST TO COAST" />
        </div>
      </Panel>

      {/* Lane lookup */}
      <Panel tone="ink" ariaLabel="Lane lookup">
        <BgImage src={IMG.lane} alt="" tone="ink" />
        <Reveal className="relative z-10">
          <div className="mb-4 flex items-center gap-6">
            <Eyebrow>Lane lookup</Eyebrow>
            <IndexMark current={3} total={3} />
          </div>
          <Headline className="max-w-2xl text-display-md">Know your lane before you book.</Headline>
          <Lead className="mt-6">
            Check transit time and service options between any two hubs. Full
            lane search is rolling out — start with a quote and dispatch maps it
            for you.
          </Lead>
          <div className="mt-8 flex max-w-md items-center gap-2 border border-paper/30 p-2">
            <Search size={18} className="ml-2 text-paper/50" />
            <input
              disabled
              placeholder="Los Angeles → Chicago"
              aria-label="Lane lookup (coming soon)"
              className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-paper placeholder:text-paper/40"
            />
            <span className="bg-red px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
              Soon
            </span>
          </div>
          <div className="mt-8">
            <Button to="/contact" variant="white">Get a quote</Button>
          </div>
        </Reveal>
      </Panel>
    </HorizontalTrack>
  );
}
