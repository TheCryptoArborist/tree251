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
        canopy: {
          50: "#072316",
          100: "#0b3b22",
          200: "#0e5d34",
          300: "#12a85b",
          400: "#6eea62",
          500: "#beff4e",
          600: "#d8ff83",
          700: "#eaffb8",
          800: "#f4ffd9",
          900: "#fbfff0"
        },
        bark: {
          50: "#161006",
          100: "#2a1d0b",
          200: "#463112",
          300: "#6b4a1b",
          400: "#a4742c",
          500: "#d9a441",
          600: "#f6c653",
          700: "#ffe098",
          800: "#fff0c9",
          900: "#fff8e7"
        },
        gold: {
          50: "#1c1405",
          100: "#332407",
          200: "#5c3f0b",
          300: "#f6c653",
          400: "#ffd978",
          500: "#ffe7a4",
          600: "#fff1cc"
        },
        civic: {
          ink: "#f7fbff",
          muted: "#b9c2b1",
          line: "#263b2b",
          panel: "#07150d",
          field: "#041108",
          warning: "#f6c653",
          danger: "#ff7b6d",
          blue: "#7fd4b5"
        }
      },
      boxShadow: {
        civic: "0 18px 45px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
