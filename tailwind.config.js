/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Poppins",
      },
      colors: {
        lightBg: "#EBEBEB",
        textClr: "#465C69",
      },
    },
  },
  plugins: [],
};
