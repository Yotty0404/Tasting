const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin({
      // 利用したい icon collection を利用する
      // https://icones.js.org/
      collections: getIconCollections(["tabler", "lucide"]),
    }),],
}

