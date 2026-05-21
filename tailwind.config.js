// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "obsidian": "#0A0A0A",
        "alabaster": "#F8F6F3",
        "champagne": "#C9B48A",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
