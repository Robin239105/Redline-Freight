import { ShieldCheck, Wrench, Gauge } from "lucide-react";
import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Counter } from "../components/Counter";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { BgImage } from "../components/Media";
import { IMG } from "../data/images";
import { FLEET } from "../data/content";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

const safetyStats = [
  { icon: ShieldCheck, value: 0.4, suffix: "%", decimals: 1, label: "DOT VIOLATION RATE" },
  { icon: Wrench, value: 14, suffix: "-DAY", label: "MAINTENANCE CYCLE" },
  { icon: Gauge, value: 3.1, suffix: "M", decimals: 1, label: "SAFE MILES / DAY" },
];

export default function Fleet() {
  useDocumentMetadata(
    "Our Fleet",
    "Discover Redline Freight's fleet of modern sleeper cabs, day cabs, refrigerated reefers, and flatbeds engineered for safety and reliability."
  );

  const total = FLEET.length + 1;
  return (
    <HorizontalTrack exits={[...FLEET.map((t) => t.name), "SAFETY"]}>
      {FLEET.map((t, i) => {
        const tone = i % 2 === 0 ? "paper" : "white";
        return (
          <Panel key={t.name} tone={tone} ariaLabel={t.name} bleed>
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="editorial-img relative order-2 hidden border-l border-line md:order-1 md:block">
                <img
                  src={t.image}
                  alt={`Redline ${t.name} truck`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-6 left-6 z-10 bg-paper px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink">
                  UNIT 0{i + 1}
                </span>
              </div>

              {/* Spec column */}
              <div className="order-1 flex flex-col justify-between px-6 pb-28 pt-24 sm:px-10 lg:order-2 lg:px-16">
                <div className="flex items-center justify-between">
                  <Eyebrow>The fleet</Eyebrow>
                  <IndexMark current={i + 1} total={total} />
                </div>

                <Reveal>
                  <Headline className="text-display-lg" as={i === 0 ? "h1" : "h2"}>{t.name}</Headline>
                  <Lead className="mt-4">{t.use}</Lead>
                </Reveal>

                <dl>
                  {t.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rule-t flex items-baseline justify-between py-3.5"
                    >
                      <dt className="font-mono text-xs tracking-[0.14em] text-muted">{spec.label}</dt>
                      <dd className="tnum font-display text-xl font-bold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Panel>
        );
      })}

      {/* Safety */}
      <Panel tone="ink" ariaLabel="Safety and maintenance">
        <BgImage src={IMG.safety} alt="" tone="ink" />
        <div className="relative z-10 mb-12 flex items-end justify-between">
          <div>
            <Eyebrow>Kept road-ready</Eyebrow>
            <Headline className="mt-4 max-w-2xl text-display-md">
              Maintained hard. Driven safe.
            </Headline>
          </div>
          <IndexMark current={total} total={total} />
        </div>
        <RevealGroup className="relative z-10 grid grid-cols-1 sm:grid-cols-3">
          {safetyStats.map((s) => (
            <RevealItem key={s.label}>
              <div className="rule-t border-paper/20 py-6 pr-6">
                <s.icon className="mb-4 text-red" size={26} strokeWidth={1.5} />
                <div className="tnum font-display text-5xl font-black lg:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-label text-paper/60">
                  {s.label}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Panel>
    </HorizontalTrack>
  );
}
