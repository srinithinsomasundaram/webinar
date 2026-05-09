import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#06040d",
        panel: "rgba(18, 11, 33, 0.8)",
        stroke: "rgba(255, 255, 255, 0.08)",
        brand: {
          200: "#d8c2ff",
          400: "#a855f7",
          500: "#7c3aed",
          700: "#4c1d95"
        }
      },
      boxShadow: {
        glow: "0 24px 80px rgba(124, 58, 237, 0.28)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(168, 85, 247, 0.28), transparent 36%), radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.18), transparent 26%)"
      },
      fontFamily: {
        display: ["Space Grotesk", "Avenir Next", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Inter", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
