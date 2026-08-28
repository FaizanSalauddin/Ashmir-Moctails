/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#080808",
        charcoal: "#111111",
        softblack: "#151515",
        gold: {
          DEFAULT: "#D6B56A",
          warm: "#B8944F",
        },
        offwhite: "#F5F2EA",
        muted: "#9C9C9C",
        burgundy: "#3A1018",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
        wider3: "0.3em",
      },
      height: {
        svh: "100svh",
      },
      minHeight: {
        svh: "100svh",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
