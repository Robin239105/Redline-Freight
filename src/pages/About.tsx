import { ShieldCheck, HeartHandshake, Eye, Zap } from "lucide-react";
import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { ImageColumn, BgImage } from "../components/Media";
import { IMG } from "../data/images";
import { cx } from "../lib/utils";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

const values = [
  { icon: ShieldCheck, label: "SAFETY", text: "Every load home safe. No deadline beats a clean record." },
  { icon: HeartHandshake, label: "OWNERSHIP", text: "Your freight is our freight until it's signed for." },
  { icon: Eye, label: "TRANSPARENCY", text: "You see what we see — live status, no black boxes." },
  { icon: Zap, label: "SPEED", text: "Fast lanes, faster answers. Dispatch never sleeps." },
];

const timeline = [
  { year: "1989", text: "Founded with three trucks out of a Bakersfield lot." },
  { year: "1998", text: "Opened the Dallas hub; crossed 100 trucks." },
  { year: "2007", text: "Launched cold-chain hauling for food and pharma." },
  { year: "2015", text: "Real-time tracking goes live across the fleet." },
  { year: "2026", text: "1,200 trucks, 32 hubs, all 48 states." },
];

const team = [
  { name: "Marisol Vega", role: "Chief Executive", image: IMG.teamMarisol },
  { name: "Dwayne Okafor", role: "Head of Dispatch", image: IMG.teamDwayne },
  { name: "Hannah Reyes", role: "VP, Safety & Compliance", image: IMG.teamHannah },
  { name: "Sam Castellano", role: "Fleet Director", image: IMG.teamSam },
];

export default function About() {
  useDocumentMetadata(
    "About Us",
    "Learn about Redline Freight's 35-year history. Built on diesel, dispatch, and keeping our word, servicing logistics nationwide since 1989."
  );

  return (
    <HorizontalTrack exits={["STORY", "VALUES", "HISTORY", "TEAM", "SAFETY"]}>
      {/* Founding */}
      <Panel tone="paper" ariaLabel="Our story">
        <BgImage src={IMG.story} alt="" tone="paper" />
        <div className="relative z-10 mb-6 flex items-center gap-6">
          <Eyebrow>Since 1989</Eyebrow>
          <IndexMark current={1} total={5} />
        </div>
        <Reveal className="relative z-10">
          <Headline className="max-w-[18ch] text-display-lg" as="h1">
            Built on diesel, dispatch, and keeping our word.
          </Headline>
          <Lead className="mt-7">
            Redline started with three trucks and one rule: the load gets there,
            on time, every time. Thirty-five years later that rule still runs the
            company — we just have eleven hundred more trucks to keep it with.
          </Lead>
        </Reveal>
      </Panel>

      {/* Values */}
      <Panel tone="white" ariaLabel="Our values" bleed>
        <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_34%]">
        <div className="flex h-full flex-col justify-center px-6 pt-24 sm:px-10 lg:px-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Eyebrow>What we stand on</Eyebrow>
              <Headline className="mt-4 max-w-2xl text-display-md">Four values, no exceptions.</Headline>
            </div>
            <IndexMark current={2} total={5} className="hidden sm:block" />
          </div>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <RevealItem key={v.label}>
                <div className={cx("rule-t py-6 pr-6", i !== 0 && "lg:pl-8")}>
                  <v.icon className="mb-4 text-red" size={26} strokeWidth={1.5} />
                  <div className="font-mono text-[11px] uppercase tracking-label text-ink">{v.label}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <ImageColumn src={IMG.story} alt="Redline crew and trucks" caption="EST. 1989" />
        </div>
      </Panel>

      {/* Timeline */}
      <Panel tone="ink" ariaLabel="Company history" className="lg:!w-[120vw] h-panel-120">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <Eyebrow>Mile markers</Eyebrow>
            <Headline className="mt-4 max-w-2xl text-display-md">Thirty-five years on the road.</Headline>
          </div>
          <IndexMark current={3} total={5} />
        </div>
        <div className="grid w-full grid-cols-2 md:grid-cols-5">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className="rule-t border-paper/25 py-6 pr-6">
                <div className="font-mono text-[10px] tracking-[0.14em] text-red">MM{i + 1}</div>
                <div className="tnum mt-2 font-display text-4xl font-black">{t.year}</div>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Panel>

      {/* Team */}
      <Panel tone="paper" ariaLabel="Leadership" bleed>
        <div className="flex h-full flex-col justify-center px-6 pt-24 sm:px-10 lg:px-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <Eyebrow>Dispatch leadership</Eyebrow>
              <Headline className="mt-4 max-w-2xl text-display-md">The people behind the wheel.</Headline>
            </div>
            <IndexMark current={4} total={5} className="hidden sm:block" />
          </div>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <RevealItem key={m.name}>
                <div className={cx("group", i !== 0 && "lg:border-l lg:border-line-soft lg:pl-6")}>
                  <div className="editorial-img">
                    <img
                      src={m.image}
                      alt={`${m.name}, ${m.role}`}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <div className="rule-t mt-4 pt-3">
                    <div className="font-display font-bold uppercase tracking-tight text-ink">{m.name}</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-label text-muted">{m.role}</div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Panel>

      {/* Safety */}
      <Panel tone="white" ariaLabel="Safety and compliance">
        <BgImage src={IMG.safety} alt="" tone="paper" />
        <div className="relative z-10 mb-6 flex items-center gap-6">
          <Eyebrow>Safety & compliance</Eyebrow>
          <IndexMark current={5} total={5} />
        </div>
        <Reveal className="relative z-10">
          <Headline className="max-w-[16ch] text-display-md">Compliant by habit, not by audit.</Headline>
          <Lead className="mt-6">
            Every driver runs ELD-logged hours, every truck clears a 14-day
            inspection cycle, and our safety team reviews incidents within 24
            hours. FMCSA-rated satisfactory, and we work to stay there.
          </Lead>
          <ul className="mt-8 flex flex-wrap gap-2.5 font-mono text-xs uppercase tracking-[0.12em]">
            {["FMCSA Satisfactory", "SmartWay Partner", "TSA Certified", "FSMA Compliant"].map((b) => (
              <li key={b} className="border border-ink px-4 py-2">{b}</li>
            ))}
          </ul>
        </Reveal>
      </Panel>
    </HorizontalTrack>
  );
}
