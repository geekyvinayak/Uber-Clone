/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/native")

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}','./Screens/*.{js,jsx,ts,tsx}', './Components/**/*.{js,jsx,ts,tsx}','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [nativewind()],
}