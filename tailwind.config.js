const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
        secondary: colors.orange,
      },
      height: {
        vh25: "25vh",
        vh33: "33vh",
        vh50: "50vh",
        vh75: "75vh",
      },
      // outline: {
      //   blue: "2px solid #0000ff",
      // },
      fontFamily: {
        sans: ["Roboto"],
      },
    },
  },
  plugins: [],
};