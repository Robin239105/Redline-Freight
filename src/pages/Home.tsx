import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Counter } from "../components/Counter";
import { Button } from "../components/Button";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { ImageColumn, BgImage } from "../components/Media";
import { ScrollHint } from "../components/ScrollHint";
import { HOME_STATS, SERVICES } from "../data/content";
import { IMG } from "../data/images";
import { cx } from "../lib/utils";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

const teasers = SERVICES.slice(0, 3);

export default function Home() {
  useDocumentMetadata(
    "Freight That Never Idles",
    "Redline Freight Co. provides premier full-truckload, LTL, and last-mile delivery across all 48 states, tracked in real-time."
  );

  return (
    <>
      <ScrollHint />
      <HorizontalTrack exits={["INTRO", "NUMBERS", "SERVICES", "QUOTE"]}>
        {/* Panel 1 — Hero */}
        <Panel tone="paper" ariaLabel="Hero" bleed>
          <div className="grid h-full grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left: type block */}
            <div className="flex flex-col justify-between px-6 pb-28 pt-24 sm:px-10 lg:px-16">
              <div className="flex items-center justify-between">
                <Eyebrow>Coast to coast · 48 states</Eyebrow>
                <IndexMark current={1} total={4} />
              </div>

              <div className="max-w-[16ch]">
                <motion.h1
                  className="font-display text-display-xl font-black uppercase flex flex-wrap"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.03,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {"Freight that never idles.".split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.22em] last:mr-0">
                      {word.split("").map((char, cIdx) => {
                        const isDot = char === ".";
                        return (
                          <motion.span
                            key={cIdx}
                            className={cx("inline-block origin-bottom", isDot ? "text-red" : "text-ink")}
                            variants={{
                              hidden: {
                                opacity: 0,
                                x: -50,
                                skewX: -30,
                              },
                              visible: {
                                opacity: 1,
                                x: 0,
                                skewX: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 140,
                                  damping: 14,
                                },
                              },
                            }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  ))}
                </motion.h1>
              </div>

              <div>
                <Lead className="mb-7">
                  Full-truckload, less-than-truckload, and last-mile delivery
                  across all 48 states — tracked in real time.
                </Lead>
                <div className="flex flex-wrap gap-3">
                  <Button to="/contact">Get a quote</Button>
                  <Button variant="outline" to="/tracking">
                    Track a shipment
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: full-bleed editorial image */}
            <div className="editorial-img relative hidden border-l border-line md:block">
              <img
                src={IMG.truckHero}
                alt="A Redline Freight semi-truck on an open highway"
                className="h-full w-full object-cover"
              />
              <div className="absolute right-5 top-24 z-10 flex items-center gap-2 bg-paper px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-red" /> 99.2% ON-TIME
              </div>
            </div>
          </div>
        </Panel>

        {/* Panel 2 — By the numbers */}
        <Panel tone="white" ariaLabel="By the numbers" bleed>
          <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_36%]">
          <div className="flex h-full flex-col justify-center px-6 pt-24 sm:px-10 lg:px-16">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <Eyebrow>By the numbers</Eyebrow>
                <Headline className="mt-4 max-w-2xl text-display-md">
                  A network built to run.
                </Headline>
              </div>
              <IndexMark current={2} total={4} className="hidden sm:block" />
            </div>
            <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {HOME_STATS.map((s, i) => (
                <RevealItem key={s.label}>
                  <div className={cx("rule-t py-6 pr-6", i !== 0 && "lg:pl-8")}>
                    <div className="tnum font-display text-6xl font-black lg:text-7xl">
                      <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
                    </div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-label text-muted">
                      {s.label}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <ImageColumn src={IMG.stats} alt="Redline dispatch operations" caption="DISPATCH" />
          </div>
        </Panel>

        {/* Panel 3 — Services teaser (dark) */}
        <Panel tone="ink" ariaLabel="Services teaser" bleed>
          <BgImage src={IMG.servicesHub} alt="" tone="ink" />
          <div className="relative z-10 flex h-full flex-col justify-center px-6 pt-24 sm:px-10 lg:px-16">
            <div className="mb-8 flex items-end justify-between">
              <Eyebrow>What we move</Eyebrow>
              <IndexMark current={3} total={4} />
            </div>
            <div>
              {teasers.map((s, i) => (
                <Reveal key={s.abbr} delay={i * 0.08}>
                  <a
                    href="/services"
                    className="rule-t group flex items-center gap-6 border-paper/20 py-6 transition-colors hover:text-red"
                  >
                    <span className="font-mono text-xs tabular-nums text-paper/50">0{i + 1}</span>
                    <s.icon size={26} strokeWidth={1.5} className="shrink-0" />
                    <span className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                      {s.title}
                    </span>
                    <span className="ml-auto hidden max-w-sm text-sm text-paper/60 group-hover:text-red md:block">
                      {s.body}
                    </span>
                    <ArrowUpRight className="shrink-0 opacity-40 group-hover:opacity-100" size={24} />
                  </a>
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="/services"
                className="link-underline inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.12em] text-paper hover:text-red"
              >
                See all services <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Panel>

        {/* Panel 4 — CTA */}
        <Panel tone="paper" ariaLabel="Get a quote">
          <BgImage src={IMG.cta} alt="" tone="paper" />
          <Reveal className="relative z-10">
            <Eyebrow>Ready to ship</Eyebrow>
            <Headline className="mt-5 max-w-[14ch] text-display-lg">
              Let's get your freight on the road.
            </Headline>
            <Lead className="mt-7">
              Tell us the lane and the load. Dispatch comes back with a quote
              within one business hour.
            </Lead>
            <div className="mt-8">
              <Button to="/contact">Get a quote</Button>
            </div>
          </Reveal>
        </Panel>
      </HorizontalTrack>
    </>
  );
}
