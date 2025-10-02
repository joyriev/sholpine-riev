/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/*.liquid",
    "./sections/*.liquid",
    "./layout/*.liquid",
    "./snippets/*.liquid",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Spectral", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        offWhite: "#f7f5f4",
        darkPurple: "#6A2786",
        purple: "#9151B7",
        litePurple: "#E8D7EF",
        purpleCream: "#f9f4fb",
        saffron: "#e64a4a",
      },
    },
  },
  plugins: [],
};
