import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, AlertCircle } from "lucide-react";
import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { BgImage } from "../components/Media";
import { TruckIcon } from "../components/TruckIcon";
import { IMG } from "../data/images";
import { MOCK_SHIPMENTS, STAGES, type Shipment } from "../data/tracking";
import { cx } from "../lib/utils";

import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

type Result =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "found"; shipment: Shipment };

const faqs = [
  { q: "Where do I find my tracking number?", a: "It's on your booking confirmation email and your bill of lading, prefixed with RL." },
  { q: "How often does status update?", a: "Live trucks report position every few minutes. Stage changes post the moment a driver scans." },
  { q: "My number says invalid — now what?", a: "Double-check for a leading RL and no spaces. Still stuck? Call dispatch at 1-800-555-0199." },
];

export default function Tracking() {
  useDocumentMetadata(
    "Track Shipment",
    "Track your freight in real-time. Enter your Redline booking number for live coordinates, transit stage logs, and estimated times of arrival."
  );

  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>({ status: "idle" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const key = value.trim().toUpperCase();
    if (!key) {
      setResult({ status: "error", message: "Enter a valid tracking number to see status." });
      return;
    }
    if (!/^RL\d{6}$/.test(key)) {
      setResult({ status: "error", message: "Tracking numbers look like RL480231 — RL plus six digits." });
      return;
    }
    const shipment = MOCK_SHIPMENTS[key];
    if (!shipment) {
      setResult({ status: "error", message: `No shipment found for ${key}. Try RL480231, RL905517, or RL112084.` });
      return;
    }
    setResult({ status: "found", shipment });
  }

  return (
    <HorizontalTrack exits={["TRACK", "FAQ"]}>
      {/* Tracking widget */}
      <Panel tone="paper" ariaLabel="Track a shipment" className="lg:!w-[120vw] h-panel-120">
        <BgImage src={IMG.trackingHero} alt="" tone="paper" />
        <div className="relative z-10 w-full max-w-4xl">
          <div className="mb-5 flex items-center gap-6">
            <Eyebrow>Real-time tracking</Eyebrow>
            <IndexMark current={1} total={2} />
          </div>
          <Headline className="text-display-lg" as="h1">Where's my freight?</Headline>
          <Lead className="mb-8 mt-5">
            Enter your tracking number for live status, location, and ETA. Try a
            demo number: <span className="font-mono text-ink">RL480231</span>.
          </Lead>

          <form onSubmit={onSubmit} className="flex flex-col gap-0 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 border border-ink bg-white px-3">
              <Search size={18} className="text-muted" />
              <label htmlFor="tracking" className="sr-only">Tracking number</label>
              <input
                id="tracking"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="ENTER TRACKING NUMBER"
                className="w-full bg-transparent py-3.5 font-mono text-sm uppercase tracking-[0.1em] text-ink placeholder:text-muted focus:outline-none"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="btn-sweep min-h-[52px] bg-ink px-9 font-mono text-sm uppercase tracking-[0.12em] text-white"
            >
              Track
            </button>
          </form>

          <div className="mt-8" aria-live="polite">
            {result.status === "error" && (
              <p className="flex items-center gap-2 border-l-2 border-red bg-white px-4 py-3 font-mono text-sm text-red-deep">
                <AlertCircle size={16} /> {result.message}
              </p>
            )}
            {result.status === "found" && <ShipmentView shipment={result.shipment} />}
          </div>
        </div>
      </Panel>

      {/* FAQ */}
      <Panel tone="white" ariaLabel="Tracking FAQ">
        <BgImage src={IMG.faq} alt="" tone="paper" />
        <div className="relative z-10 mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Good to know</Eyebrow>
            <Headline className="mt-4 max-w-2xl text-display-md">Tracking, answered.</Headline>
          </div>
          <IndexMark current={2} total={2} className="hidden sm:block" />
        </div>
        <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 md:grid-cols-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.08}>
              <div className={cx("rule-t h-full py-6", i !== 0 && "md:pl-8")}>
                <div className="font-mono text-xs tabular-nums text-red">Q{i + 1}</div>
                <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Panel>
    </HorizontalTrack>
  );
}

function ShipmentView({ shipment }: { shipment: Shipment }) {
  const progress = shipment.currentStageIndex / (STAGES.length - 1);
  const delivered = shipment.currentStageIndex === STAGES.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-ink bg-white p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-lg font-bold tracking-[0.1em]">{shipment.id}</span>
        <span
          className={cx(
            "px-3 py-1 font-mono text-xs uppercase tracking-[0.12em]",
            delivered ? "bg-ink text-white" : "bg-red text-white"
          )}
        >
          {STAGES[shipment.currentStageIndex]}
        </span>
      </div>
      <div className="mt-2 font-mono text-sm text-muted">
        {shipment.origin} → {shipment.destination}
      </div>

      {/* mini road */}
      <div className="relative mt-8 h-10">
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line-soft" />
        <div className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-red" style={{ width: `${progress * 100}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `calc(${progress * 100}% - 18px)` }}>
          <TruckIcon className="h-7 w-auto" />
        </div>
      </div>

      <ol className="mt-4 grid grid-cols-4 gap-2">
        {STAGES.map((stage, i) => {
          const done = i <= shipment.currentStageIndex;
          return (
            <li key={stage} className="flex flex-col items-center text-center">
              <span className={cx("h-3 w-3 rounded-full", done ? "bg-red" : "border border-line-soft bg-white")} />
              <span className={cx("mt-2 font-mono text-[10px] uppercase leading-tight tracking-[0.08em]", done ? "text-ink" : "text-muted")}>
                {stage}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="rule-t mt-6 grid grid-cols-1 gap-3 pt-4 font-mono text-sm sm:grid-cols-3">
        <div className="flex items-center gap-2"><MapPin size={15} className="text-red" /> {shipment.currentLocation}</div>
        <div className="flex items-center gap-2"><Clock size={15} className="text-red" /> {shipment.eta}</div>
        <div className="text-muted">{shipment.service} · {shipment.weight}</div>
      </div>
    </motion.div>
  );
}
