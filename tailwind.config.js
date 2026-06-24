/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Swiss editorial light system — paper, ink, and ONE red accent.
        paper: "#F4F2ED", // warm off-white page background
        white: "#FFFFFF",
        ink: "#0B0B0A", // near-black text + dark panels
        "ink-2": "#1A1917",
        line: "#1F1E1C", // black hairline rules
        "line-soft": "#DEDBD3", // faint hairlines on paper
        red: "#E4002B", // signal accent — used with intent
        "red-deep": "#B80022",
        muted: "#75736C", // secondary text (passes AA on paper)
      },
      fontFamily: {
        // Archivo for big Swiss headlines, Inter for UI/body, Space Mono for data.
        display: ['"Archivo"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      fontSize: {
        // Tight, oversized editorial display scale.
        "display-xl": ["clamp(4rem, 11vw, 11rem)", { lineHeight: "0.86", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 7vw, 7rem)", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.0", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        label: "0.22em",
      },
    },
  },
  plugins: [],
};
