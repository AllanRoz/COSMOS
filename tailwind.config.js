export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      // xs: 360px — catch tiny Android phones
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cosmos: {
          black:  "#020617",
          slate:  "#0f172a",
          gray:   "#1e293b",
          accent: "#38bdf8",
          white:  "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      // Useful for safe-area-inset-* on iOS notch / home bar
      height: {
        'screen-dvh': '100dvh',
      },
    },
  },
  plugins: [],
}
