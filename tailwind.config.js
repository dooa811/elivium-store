/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      colors: {
        gold: {
          300: "#f5d78e",
          400: "#e8bb35",
          500: "#d4a017",
          600: "#b8860b",
          700: "#956c08",
        },
        obsidian: {
          900: "#080808",
          800: "#101010",
          700: "#181818",
          600: "#222222",
          500: "#2e2e2e",
          400: "#3d3d3d",
          300: "#555555",
          200: "#888888",
        },
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease both",
        "fade-in":    "fadeIn 0.5s ease both",
        "shimmer":    "shimmer 2.5s linear infinite",
        "marquee":    "marquee 25s linear infinite",
        "float":      "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: "translateY(28px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        shimmer:  { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        marquee:  { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float:    { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      boxShadow: {
        "gold-sm": "0 0 20px rgba(212,160,23,0.2)",
        "gold-md": "0 0 40px rgba(212,160,23,0.35)",
        "gold-lg": "0 0 80px rgba(212,160,23,0.4)",
        "card":    "0 8px 32px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};