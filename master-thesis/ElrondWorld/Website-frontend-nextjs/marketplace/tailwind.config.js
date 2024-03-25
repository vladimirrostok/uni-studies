module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // TODO: REFACTOR
        // 'highlight': ['Play'],
        sans: ['"Readex Pro"', "sans-serif"],
        feature: ["Goldman", "cursive"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/line-clamp"),
  ],
};
