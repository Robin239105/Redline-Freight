import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle2, Linkedin, Instagram, Facebook } from "lucide-react";
import { HorizontalTrack } from "../components/HorizontalTrack";
import { Panel } from "../components/Panel";
import { Reveal } from "../components/Reveal";
import { Eyebrow, Headline, Lead, IndexMark } from "../components/ui";
import { BgImage } from "../components/Media";
import { IMG } from "../data/images";
import { cx } from "../lib/utils";

import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

interface FormState {
  name: string; company: string; email: string;
  origin: string; destination: string; freight: string; message: string;
}

const empty: FormState = { name: "", company: "", email: "", origin: "", destination: "", freight: "", message: "" };
const freightTypes = ["Full-Truckload", "Less-Than-Truckload", "Cold Chain", "Last-Mile", "Other"];

export default function Contact() {
  useDocumentMetadata(
    "Get a Quote",
    "Request a logistics quote from Redline Freight. Get direct dispatch pricing on FT, LTL, reefer cold chain, and local last-mile shipments."
  );

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  function set<K extends keyof FormState>(key: K, v: string) {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Tell us who to reach.";
    if (!form.email.trim()) next.email = "We need an email to send the quote.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "That email looks off — check it.";
    if (!form.origin.trim()) next.origin = "Where does it ship from?";
    if (!form.destination.trim()) next.destination = "Where is it going?";
    if (!form.freight) next.freight = "Pick a freight type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSent(true); // Placeholder — wire to your backend/email service here.
  }

  const field =
    "w-full border-0 border-b border-line bg-transparent py-2.5 font-sans text-ink placeholder:text-muted focus:border-red focus:outline-none";

  return (
    <HorizontalTrack exits={["QUOTE", "FOOTER"]}>
      {/* Quote form */}
      <Panel tone="paper" ariaLabel="Get a quote">
        <BgImage src={IMG.contact} alt="" tone="paper" />
        <div className="relative z-10 grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="mb-5 flex items-center gap-6">
              <Eyebrow>Get a quote</Eyebrow>
              <IndexMark current={1} total={2} />
            </div>
            <Headline className="max-w-[14ch] text-display-lg" as="h1">Tell us the lane and the load.</Headline>
            <Lead className="mt-6">
              Dispatch reads every request and comes back with real numbers — not
              an auto-reply. Expect an answer within one business hour.
            </Lead>
            <div className="mt-8 space-y-3 font-mono text-sm">
              <a href="tel:+18005550199" className="flex items-center gap-3 hover:text-red">
                <Phone size={16} className="text-red" /> 1-800-555-0199
              </a>
              <a href="mailto:dispatch@redlinefreight.co" className="flex items-center gap-3 hover:text-red">
                <Mail size={16} className="text-red" /> dispatch@redlinefreight.co
              </a>
              <span className="flex items-center gap-3 text-muted">
                <MapPin size={16} className="text-red" /> 4400 Diesel Row, Dallas, TX 75201
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col justify-center border border-ink bg-white p-8"
                role="status"
              >
                <CheckCircle2 className="mb-4 text-red" size={40} strokeWidth={1.5} />
                <h3 className="font-display text-3xl font-black uppercase tracking-tight">Quote request sent</h3>
                <p className="mt-3 max-w-sm text-muted">
                  Dispatch will reach out within 1 business hour. Reference your lane:{" "}
                  <span className="font-mono text-ink">{form.origin || "—"} → {form.destination || "—"}</span>.
                </p>
                <button
                  onClick={() => { setForm(empty); setSent(false); }}
                  className="link-underline mt-6 self-start font-mono text-sm uppercase tracking-[0.12em] text-red"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <Input label="Name" id="name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} className={field} />
                <Input label="Company" id="company" value={form.company} onChange={(v) => set("company", v)} className={field} optional />
                <Input label="Email" id="email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} className={cx(field, "sm:col-span-2")} />
                <Input label="Origin" id="origin" value={form.origin} onChange={(v) => set("origin", v)} error={errors.origin} className={field} placeholder="City, ST" />
                <Input label="Destination" id="destination" value={form.destination} onChange={(v) => set("destination", v)} error={errors.destination} className={field} placeholder="City, ST" />

                <div className="sm:col-span-2">
                  <Label htmlFor="freight">Freight type</Label>
                  <select id="freight" value={form.freight} onChange={(e) => set("freight", e.target.value)} className={cx(field, "appearance-none")}>
                    <option value="">Select a freight type…</option>
                    {freightTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.freight && <Err>{errors.freight}</Err>}
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="message">Message <span className="text-muted/70">(optional)</span></Label>
                  <textarea id="message" rows={2} value={form.message} onChange={(e) => set("message", e.target.value)}
                    placeholder="Weight, timing, anything special…" className={cx(field, "resize-none")} />
                </div>

                <button type="submit" className="btn-sweep mt-2 min-h-[52px] bg-ink px-9 font-mono text-sm uppercase tracking-[0.12em] text-white sm:col-span-2">
                  Get a quote
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Panel>

      {/* Footer */}
      <Panel tone="ink" ariaLabel="Footer">
        <BgImage src={IMG.footer} alt="" tone="ink" />
        <div className="relative z-10 flex min-h-[64vh] w-full flex-col justify-between gap-12">
          <div className="flex items-center justify-between">
            <Eyebrow>End of the line</Eyebrow>
            <IndexMark current={2} total={2} />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <div className="group flex items-center gap-2.5">
                <span className="brand-mark-box grid h-6 w-6 shrink-0 place-items-center border border-paper/40 bg-transparent">
                  <span className="brand-mark-line-container" />
                </span>
                <span className="font-display text-xl uppercase tracking-tight text-paper">
                  <span className="font-black">Red</span>
                  <span className="font-black text-red">line</span>
                  <span className="font-light text-paper/70 ml-1">Freight Co.</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-paper/60">
                Freight that never idles — full-truckload, LTL, cold chain, and
                last-mile across all 48 states.
              </p>
            </div>
            <FooterCol title="Contact">
              <a href="tel:+18005550199" className="hover:text-red">1-800-555-0199</a>
              <a href="mailto:dispatch@redlinefreight.co" className="hover:text-red">dispatch@redlinefreight.co</a>
              <span>4400 Diesel Row<br />Dallas, TX 75201</span>
            </FooterCol>
            <FooterCol title="Company">
              <a href="/services" className="hover:text-red">Services</a>
              <a href="/fleet" className="hover:text-red">Fleet</a>
              <a href="/about" className="hover:text-red">About</a>
            </FooterCol>
            <FooterCol title="Follow">
              <div className="flex gap-4">
                <a href="#" aria-label="LinkedIn" className="hover:text-red"><Linkedin size={20} /></a>
                <a href="#" aria-label="Instagram" className="hover:text-red"><Instagram size={20} /></a>
                <a href="#" aria-label="Facebook" className="hover:text-red"><Facebook size={20} /></a>
              </div>
            </FooterCol>
          </div>

          <div className="rule-t border-paper/20 pt-4 font-mono text-xs text-paper/50">
            © {new Date().getFullYear()} Redline Freight Co. · DOT 1989442 · MC 0420317. All rights reserved.
          </div>
        </div>
      </Panel>
    </HorizontalTrack>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className="mb-1 block font-mono text-[11px] uppercase tracking-label text-muted">{children}</label>;
}

function Input({ label, id, value, onChange, error, className, type = "text", placeholder, optional }: {
  label: string; id: string; value: string; onChange: (v: string) => void;
  error?: string; className?: string; type?: string; placeholder?: string; optional?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label} {optional && <span className="text-muted/70">(optional)</span>}</Label>
      <input id={id} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error} className={cx(className, error && "border-red")} />
      {error && <Err>{error}</Err>}
    </div>
  );
}

function Err({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 font-mono text-xs text-red-deep">{children}</p>;
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-label text-paper/50">{title}</h4>
      <div className="flex flex-col gap-2 text-sm text-paper/80">{children}</div>
    </div>
  );
}
