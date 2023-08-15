// /** @type {import('tailwindcss').Config} */
const tailwindScrollbar = require('tailwind-scrollbar');
const daisyui = require('daisyui');
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui : {
    themes: ['business',]
  },
  plugins: [daisyui, tailwindScrollbar({ nocompatible: true })],
}