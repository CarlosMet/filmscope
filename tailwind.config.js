/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor:{
        'rgba-70': 'rgba(30, 30, 30, 0.5)'
      }
    },
    screens:{
      sm: '490px',
      md: '640px',
      lg: '899px',
      xl: '1280px',
      '2xl': '1450px',
    }
  },
  plugins: [],
}
