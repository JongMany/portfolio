/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        pulse: "pulse 2.5s infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
