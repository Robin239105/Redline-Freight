import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { Button } from "../components/Button";
import { SERVICES } from "../data/content";
import { cx } from "../lib/utils";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

export default function Services() {
  useDocumentMetadata(
    "Logistics Services",
    "Discover Redline Freight's transport options: Full-Truckload (FTL), Less-Than-Truckload (LTL), Cold Chain, Warehousing, and Last-Mile delivery."
  );

  return (
    <HorizontalTrack exits={SERVICES.map((s) => s.abbr)}>
      {SERVICES.map((s, i) => {
        const tone = i % 2 === 0 ? "paper" : "white";
        return (
          <Panel key={s.abbr} tone={tone} ariaLabel={s.title} bleed>
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              {/* Text column */}
              <div className="flex flex-col justify-between px-6 pb-28 pt-24 sm:px-10 lg:px-16">
                <div className="flex items-center justify-between">
                  <Eyebrow>What we move</Eyebrow>
                  <IndexMark current={i + 1} total={SERVICES.length} />
                </div>

                <Reveal>
                  <div className="flex items-center gap-4">
                    <s.icon size={34} strokeWidth={1.5} className="text-red" />
                    <span className="font-mono text-sm tracking-[0.14em] text-muted">{s.abbr}</span>
                  </div>
                  <Headline className="mt-4 text-display-md" as={i === 0 ? "h1" : "h2"}>{s.title}</Headline>
                  <Lead className="mt-5">{s.body}</Lead>
                </Reveal>

                <div>
                  <dl className="mb-7 grid grid-cols-2 gap-x-8">
                    {s.specs.map((spec, j) => (
                      <div key={spec} className={cx("rule-t py-2.5", j < 2 && "")}>
                        <dt className="font-mono text-xs tracking-[0.1em] text-ink">{spec}</dt>
                      </div>
                    ))}
                  </dl>
                  <Button to="/contact">Get a quote</Button>
                </div>
              </div>

              {/* Image column */}
              <div className="editorial-img relative hidden border-l border-line md:block">
                <img
                  src={s.image}
                  alt={`${s.title} in operation`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-6 left-6 z-10 bg-paper px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink">
                  {s.abbr} · REDLINE
                </span>
              </div>
            </div>
          </Panel>
        );
      })}
    </HorizontalTrack>
  );
}
