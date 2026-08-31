import type { Config } from "tailwindcss";

/**
 * SPARQ design system.
 * Colours are driven by CSS custom properties (channel triplets) declared in
 * globals.css so that light/dark themes swap cleanly and Tailwind's opacity
 * modifiers (bg-accent/10 etc.) keep working.
 */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        bg: withOpacity("--bg"),
        surface: withOpacity("--surface"),
        "surface-2": withOpacity("--surface-2"),
        border: withOpacity("--border"),
        ink: withOpacity("--ink"),
        muted: withOpacity("--muted"),
        accent: {
          DEFAULT: withOpacity("--accent"),
          soft: withOpacity("--accent-soft"),
          ink: withOpacity("--accent-ink"),
        },
        gold: withOpacity("--gold"),
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(16 24 20 / 0.04), 0 8px 24px -12px rgb(16 24 20 / 0.12)",
        lift: "0 2px 4px rgb(16 24 20 / 0.05), 0 24px 48px -20px rgb(16 24 20 / 0.22)",
        glow: "0 12px 40px -12px rgb(var(--accent) / 0.45)",
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
