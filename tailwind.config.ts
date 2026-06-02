import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          950: "#0a2e1a",
          900: "#0f3d22",
          800: "#145a32",
          700: "#1a7040",
          600: "#1e8449",
          500: "#27ae60",
          400: "#52c87a",
          300: "#7defa0",
          200: "#b8f5cd",
          100: "#d5f5e3",
          50:  "#eafaf1",
        },
        module: {
          cardapio: "#27ae60",
          hidrata:  "#185fa5",
          nutrimeta:"#ba7517",
          carbo:    "#993c1d",
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "bar-fill": "barFill 1.2s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        barFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
