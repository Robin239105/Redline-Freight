import { IMG } from "./images";

/** The seven primary destinations — each is an "exit" on the highway. */
export interface NavItem {
  index: string; // "01"
  label: string; // "HOME"
  path: string; // "/"
  image: string; // preview image in the mega-menu
  blurb: string; // Space Mono one-liner
}

export const NAV_ITEMS: NavItem[] = [
  {
    index: "01",
    label: "HOME",
    path: "/",
    image: IMG.menuHome,
    blurb: "01 HOME — Freight that never idles.",
  },
  {
    index: "02",
    label: "SERVICES",
    path: "/services",
    image: IMG.menuServices,
    blurb: "02 SERVICES — Everything we move, end to end.",
  },
  {
    index: "03",
    label: "FLEET",
    path: "/fleet",
    image: IMG.menuFleet,
    blurb: "03 FLEET — 1,200 trucks, built to run.",
  },
  {
    index: "04",
    label: "NETWORK",
    path: "/network",
    image: IMG.menuNetwork,
    blurb: "04 NETWORK — One network, every lane.",
  },
  {
    index: "05",
    label: "TRACKING",
    path: "/tracking",
    image: IMG.menuTracking,
    blurb: "05 TRACKING — Know where your freight is, always.",
  },
  {
    index: "06",
    label: "ABOUT",
    path: "/about",
    image: IMG.menuAbout,
    blurb: "06 ABOUT — Blue-collar premium since 1989.",
  },
  {
    index: "07",
    label: "CONTACT",
    path: "/contact",
    image: IMG.menuContact,
    blurb: "07 CONTACT — Dispatch answers in one hour.",
  },
];
