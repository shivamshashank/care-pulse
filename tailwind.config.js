/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F766E",
        secondary: "#14B8A6",
        accent: "#F0FDFA",
        dark: "#0F172A"
      }
    }
  },
  plugins: [],
}