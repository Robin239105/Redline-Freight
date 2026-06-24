# Redline Freight Co.

A premium, Swiss-editorial inspired digital platform for **Redline Freight Co.**, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. 

The platform features a custom-engineered horizontal-scroll experience, an interactive tracking system, high-performance page transitions, and strict typographic grids.

---

## 🇨🇭 Swiss Editorial Design System

Redline Freight is styled using a modern, minimalist Swiss editorial design language that prioritizes functional elegance, stark contrasts, and absolute clarity.

- **Color Palette:**
  - **Warm Paper:** Soft off-white backgrounds (`#FAF9F6`) to eliminate display glare.
  - **Asphalt & Ink:** Near-black (`#111111` / `#1A1A1A`) for high-contrast readability.
  - **Signal Red (`#E4002B`):** A single vibrant accent color used selectively to guide the eye.
- **Typography:**
  - **Headers:** Oversized, heavy-weight **Archivo** for bold editorial hierarchy.
  - **Body:** **Inter** for clean, legible reading at any resolution.
  - **Metadata & Labels:** **Space Mono** for telemetry, track numbers, and system readouts.
- **Grids & Layout:**
  - Hairline borders (`1px`) defining layout boundaries.
  - Consistent layout ratios, strict margins, and generous whitespace.
  - Grayscale-to-color transitions on images to mimic high-end editorial magazines.

---

## ⚙️ Core Technical Features

### 1. Signature Horizontal Scroll Engine
- Native vertical scrolling (trackpad, mousewheel, scrollbars, arrow keys, and touch swipes) is mapped dynamically to horizontal travel.
- Implemented in `src/hooks/useHorizontalScroll.ts`. The engine calculates track width, adjusts the `body` height dynamically to give the browser a real scroll range, and translates a fixed page track using a high-precision `requestAnimationFrame` linear interpolation (lerp).
- Respects system accessibility: checks `prefers-reduced-motion` and instantly snaps if motion is disabled.

### 2. Interactive "Highway" Progress Indicator
- Tracks scroll telemetry in real-time.
- Features a stylized semi-truck icon pinned to the scroll progress, an amber-lit highway progress line, exit-sign navigations, and real-time mile readout.

### 3. Full-Screen Mega Menu
- Opened via a custom-morphed hamburger icon.
- Features custom focus traps, escape key listeners, body scroll locks, and dynamic hover preview panes that change image previews according to the hovered menu option.

### 4. Interactive Live Shipment Tracking
- Fully interactive tracking engine (`src/pages/Tracking.tsx`) powered by mock shipment datasets (`src/data/tracking.ts`).
- Try querying the following demo tracking IDs:
  - `RL480231` — Active: Transit
  - `RL905517` — Active: Out for Delivery
  - `RL112084` — Delivered
- Visualizes shipment history, step-by-step progress, current status badges, and cargo telemetry.

### 5. Custom Page Transitions & Route Wipes
- Branded red road-wipe animation triggered on route change via `Framer Motion` and React Router `AnimatePresence`.

### 6. Dynamic SEO Engine
- Powered by a custom React hook `useDocumentMetadata.ts`.
- Dynamically updates the document title, meta descriptions, and maintains strict single-`<h1>` accessibility standards on every single page.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18 & TypeScript
- **Build Tool:** Vite 5
- **Routing:** React Router v6
- **Animations:** Framer Motion 11
- **Styling:** Tailwind CSS & PostCSS
- **Iconography:** Lucide React
- **Branding:** 2D Flat Geometric Ink/Red Vector Branding

---

## 📂 Project Architecture

```
├── .github/              # GitHub configurations
├── public/
│   ├── images/           # Curated freight photography
│   └── favicon.svg       # Flat geometric brand mark
├── src/
│   ├── components/       # Reusable layout primitives & blocks
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Highway.tsx
│   │   ├── HorizontalTrack.tsx
│   │   ├── MegaMenu.tsx
│   │   └── PageTransition.tsx
│   ├── data/             # Mock datasets and image registries
│   │   ├── images.ts     # Centralized photo registry
│   │   └── tracking.ts   # Interactive demo cargo
│   ├── hooks/            # Custom application lifecycle hooks
│   │   ├── useDocumentMetadata.ts
│   │   ├── useHorizontalScroll.ts
│   │   └── useMegaMenu.ts
│   ├── pages/            # Page layouts and features
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Fleet.tsx
│   │   ├── Home.tsx
│   │   ├── Network.tsx
│   │   ├── Services.tsx
│   │   └── Tracking.tsx
│   ├── App.tsx           # Route definitions
│   ├── index.css         # Typography, global animations, utility tokens
│   └── main.tsx          # App bootstrapper
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Robin239105/Redline-Freight.git
cd Redline-Freight
npm install
```

### Run Locally
Start the Vite development server:
```bash
npm run dev
```

### Build for Production
Type-check and compile the production bundle to `/dist`:
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## ✍️ Contributors

Developed, maintained, and curated exclusively by **Robin239105** ([@Robin239105](https://github.com/Robin239105)).
