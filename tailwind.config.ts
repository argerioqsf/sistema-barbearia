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
          50: "#16B598",
        },
      },
      animation: {
        openMenu: "openMenu 0.4s ease forwards",
        closeMenu: "closeMenu 0.4s ease forwards",
        openMenuChildren: "openMenuChildren 0.4s ease forwards",
        closeMenuChildren: "closeMenuChildren 0.4s ease forwards",
      },
      keyframes: {
        openMenu: {
          "0%": {
            width: "0vw",
          },
          "100%": {
            width: "var(--width-side-menu)",
          },
        },
        closeMenu: {
          "0%": {
            width: "var(--width-side-menu)",
          },
          "100%": {
            width: "0vw",
          },
        },
        openMenuChildren: {
          "0%": {
            paddingLeft: "0vw",
          },
          "100%": {
            paddingLeft: "var(--width-side-menu)",
          },
        },
        closeMenuChildren: {
          "0%": {
            paddingLeft: "var(--width-side-menu)",
          },
          "100%": {
            paddingLeft: "0vw",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
