/** Shared structured copy/data used across pages. */
import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Package,
  Warehouse,
  Snowflake,
  MapPin,
} from "lucide-react";
import { IMG } from "./images";

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const HOME_STATS: Stat[] = [
  { value: 1200, suffix: "+", label: "TRUCKS IN SERVICE" },
  { value: 48, label: "STATES COVERED" },
  { value: 4.1, suffix: "M", label: "DELIVERIES / YEAR", decimals: 1 },
  { value: 99.2, suffix: "%", label: "ON-TIME RATE", decimals: 1 },
];

export interface Service {
  icon: LucideIcon;
  abbr: string;
  title: string;
  body: string;
  specs: string[];
  image: string;
}

export const SERVICES: Service[] = [
  {
    icon: Truck,
    abbr: "FTL",
    title: "Full-Truckload",
    body: "One shipment, one trailer, one driver from dock to dock. When you fill a trailer, you get the fastest lane and the fewest touches.",
    specs: ["Up to 45,000 lbs", "Direct point-to-point", "Dedicated driver", "53' dry van"],
    image: IMG.serviceFtl,
  },
  {
    icon: Package,
    abbr: "LTL",
    title: "Less-Than-Truckload",
    body: "Ship a pallet or ten and pay only for the space you use. We consolidate freight across lanes without slowing your delivery window.",
    specs: ["150 – 15,000 lbs", "Pallet & crate freight", "Liftgate available", "Shared trailer"],
    image: IMG.serviceLtl,
  },
  {
    icon: Warehouse,
    abbr: "W&D",
    title: "Warehousing & Distribution",
    body: "Store, pick, pack, and ship from our cross-dock hubs. Inventory visibility ties straight into your tracking dashboard.",
    specs: ["2.4M sq ft", "Cross-dock ready", "Pick & pack", "Real-time inventory"],
    image: IMG.serviceWarehouse,
  },
  {
    icon: Snowflake,
    abbr: "COLD",
    title: "Cold Chain",
    body: "Temperature-controlled hauls for food and pharma, monitored end to end. Every reefer logs temperature so nothing breaks the chain.",
    specs: ["-20°F to 70°F", "Live temp logging", "FSMA compliant", "Pharma-grade"],
    image: IMG.serviceCold,
  },
  {
    icon: MapPin,
    abbr: "LAST",
    title: "Last-Mile Delivery",
    body: "The final stretch to the door, scheduled and tracked to the minute. Residential or commercial, we close the loop on every order.",
    specs: ["Same/next day", "Appointment windows", "Proof of delivery", "Residential & B2B"],
    image: IMG.serviceLastmile,
  },
];

export interface TruckType {
  name: string;
  image: string;
  specs: { label: string; value: string }[];
  use: string;
}

export const FLEET: TruckType[] = [
  {
    name: "Day Cab",
    image: IMG.fleet1,
    use: "Regional hauls and dedicated local lanes.",
    specs: [
      { label: "CAPACITY", value: "44,000 lbs" },
      { label: "RANGE", value: "300 mi / shift" },
      { label: "AXLES", value: "3" },
      { label: "TRAILER", value: "53' dry van" },
    ],
  },
  {
    name: "Sleeper",
    image: IMG.fleet2,
    use: "Long-haul, multi-day cross-country freight.",
    specs: [
      { label: "CAPACITY", value: "45,000 lbs" },
      { label: "RANGE", value: "2,000+ mi" },
      { label: "AXLES", value: "5" },
      { label: "TRAILER", value: "53' dry van" },
    ],
  },
  {
    name: "Reefer",
    image: IMG.fleet3,
    use: "Temperature-controlled food and pharma.",
    specs: [
      { label: "CAPACITY", value: "43,000 lbs" },
      { label: "TEMP", value: "-20°F to 70°F" },
      { label: "AXLES", value: "5" },
      { label: "TRAILER", value: "53' reefer" },
    ],
  },
  {
    name: "Flatbed",
    image: IMG.fleet4,
    use: "Oversized, building materials, and machinery.",
    specs: [
      { label: "CAPACITY", value: "48,000 lbs" },
      { label: "DECK", value: "48' x 8.5'" },
      { label: "AXLES", value: "5" },
      { label: "SECURING", value: "Chain & strap" },
    ],
  },
];

export interface Hub {
  id: string;
  label: string;
  x: number; // percentage across the SVG viewbox (0-100)
  y: number;
}

/** Stylized hub positions over a 0–100 coordinate space. */
export const HUBS: Hub[] = [
  { id: "LA", label: "LOS ANGELES", x: 12, y: 62 },
  { id: "DAL", label: "DALLAS", x: 46, y: 70 },
  { id: "CHI", label: "CHICAGO", x: 62, y: 36 },
  { id: "ATL", label: "ATLANTA", x: 70, y: 64 },
  { id: "NYC", label: "NEW YORK", x: 86, y: 34 },
];

/** Lanes drawn between hubs (by id). */
export const LANES: [string, string][] = [
  ["LA", "DAL"],
  ["DAL", "CHI"],
  ["DAL", "ATL"],
  ["CHI", "NYC"],
  ["ATL", "NYC"],
  ["LA", "CHI"],
];
