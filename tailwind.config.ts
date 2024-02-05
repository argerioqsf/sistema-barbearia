import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: "#013160",
          100: "#0a1635",
        },
        secondary: {
          100: "#01DA7C",
        },
      },
      animation: {
        openMenu: "openMenu 0.4s ease forwards",
        closeMenu: "closeMenu 0.4s ease forwards",
        openMenuIcon: "openMenuIcon 0.4s ease forwards",
        closeMenuIcon: "closeMenuIcon 0.4s ease forwards",
      },
      keyframes: {
        openMenu: {
          "0%": {
            transform: "translateX(calc(var(--width-side-menu)*-1))",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        closeMenu: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-280px)",
          },
        },
        openMenuIcon: {
          "0%": {
            paddingLeft: "0",
          },
          "100%": { paddingLeft: "var(--width-side-menu)" },
        },
        closeMenuIcon: {
          "0%": {
            paddingLeft: "var(--width-side-menu)",
          },
          "100%": {
            paddingLeft: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
