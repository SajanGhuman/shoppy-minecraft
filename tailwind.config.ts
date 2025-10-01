/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ff4d4d",
        card: "#1f1f1f",
        bg: "#121212",
      },
    },
  },
  plugins: [require("daisyui")],
};

