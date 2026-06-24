/** Mock shipment data for the interactive tracking demo. */
export type ShipmentStage =
  | "Picked up"
  | "In transit"
  | "Out for delivery"
  | "Delivered";

export const STAGES: ShipmentStage[] = [
  "Picked up",
  "In transit",
  "Out for delivery",
  "Delivered",
];

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  currentStageIndex: number; // 0..3
  currentLocation: string;
  eta: string;
  service: string;
  weight: string;
}

/** Keyed by tracking number (uppercased). Try RL these in the demo. */
export const MOCK_SHIPMENTS: Record<string, Shipment> = {
  RL480231: {
    id: "RL480231",
    origin: "Los Angeles, CA",
    destination: "Chicago, IL",
    currentStageIndex: 1,
    currentLocation: "Flagstaff, AZ",
    eta: "Jun 25, 2026 · 4:30 PM",
    service: "Full-Truckload (FTL)",
    weight: "18,400 lbs",
  },
  RL905517: {
    id: "RL905517",
    origin: "Dallas, TX",
    destination: "Atlanta, GA",
    currentStageIndex: 2,
    currentLocation: "Birmingham, AL",
    eta: "Jun 23, 2026 · 6:15 PM",
    service: "Less-Than-Truckload (LTL)",
    weight: "2,150 lbs",
  },
  RL112084: {
    id: "RL112084",
    origin: "Newark, NJ",
    destination: "Boston, MA",
    currentStageIndex: 3,
    currentLocation: "Boston, MA",
    eta: "Delivered Jun 22, 2026 · 11:02 AM",
    service: "Last-Mile Delivery",
    weight: "640 lbs",
  },
};
