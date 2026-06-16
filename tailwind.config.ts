import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-pink": "#f0197d",
        "brand-purple": "#8b5cf6",
        "brand-coral": "#ff6b6b",
        "brand-bg": "#120818",
        "brand-card": "#1e0d2b",
        "brand-border": "#2d1445",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
