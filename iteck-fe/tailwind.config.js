/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202123",
        secondary: "#474A4F",
        minor: "#838891",
        green: "#399133",
      },
    },
  },
  plugins: [],
};
