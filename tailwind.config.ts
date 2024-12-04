import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        'autism-blue': '#A1CFFF',
        'autism-purple': '#B19CD9',
        'autism-green': '#77DD77',
        'autism-pink': '#FFB3BA',
        'autism-orange': '#FFB366',
        'game-bg': '#E6F3FF',
      },
      animation: {
        'float': 'float 2s ease-in-out infinite',
        'fly': 'fly 0.6s ease-in-out',
        'slide': 'slide 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fly: {
          '0%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '100%': { transform: 'rotate(-10deg)' },
        },
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;