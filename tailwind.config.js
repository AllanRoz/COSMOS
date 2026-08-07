export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          black: "#020617",
          slate: "#0f172a",
          gray: "#1e293b",
          accent: "#38bdf8",
          white: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}