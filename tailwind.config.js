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
    },
  },
  plugins: [],
};
