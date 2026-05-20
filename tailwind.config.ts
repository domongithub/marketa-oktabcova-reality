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
        forest: "#002f1b",
        gold: "#c9ae78",
        linen: "#f7f3ec",
        ink: "#171717",
        muted: "#6f6a61"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 47, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
