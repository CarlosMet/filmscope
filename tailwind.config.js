/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    screens:{
      sm: '490px',
      md: '670px',
      lg: '899px',
      xl: '1280px',
      '2xl': '1450px',
    }
  },
  plugins: [],
}
