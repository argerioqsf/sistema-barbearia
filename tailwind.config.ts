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
        openMenuLg: "openMenuLg 0.4s ease forwards",
        closeMenuLg: "closeMenuLg 0.4s ease forwards",
        openMenuMd: "openMenuMd 0.4s ease forwards",
        closeMenuMd: "closeMenuMd 0.4s ease forwards",
        openMenuChildrenLg: "openMenuChildrenLg 0.4s ease forwards",
        closeMenuChildrenLg: "closeMenuChildrenLg 0.4s ease forwards",
        openMenuChildrenMd: "openMenuChildrenMd 0.4s ease forwards",
        closeMenuChildrenMd: "closeMenuChildrenMd 0.4s ease forwards",
      },
      keyframes: {
        openMenuLg: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "25vw",
          },
        },
        closeMenuLg: {
          "0%": {
            width: "25vw",
          },
          "100%": {
            width: "0",
          },
        },
        openMenuMd: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "80vw",
          },
        },
        closeMenuMd: {
          "0%": {
            width: "80vw",
          },
          "100%": {
            width: "0",
          },
        },
        openMenuChildrenLg: {
          "0%": {
            paddingLeft: "0px",
          },
          "100%": {
            paddingLeft: "25vw",
          },
        },
        closeMenuChildrenLg: {
          "0%": {
            paddingLeft: "25vw",
          },
          "100%": {
            paddingLeft: "0px",
          },
        },
        openMenuChildrenMd: {
          "0%": {
            paddingLeft: "0px",
          },
          "100%": {
            paddingLeft: "80vw",
          },
        },
        closeMenuChildrenMd: {
          "0%": {
            paddingLeft: "80vw",
          },
          "100%": {
            paddingLeft: "0px",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
