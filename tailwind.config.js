/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'feus': {
          50: '#edf9ff',
          100: '#d7f1ff',
          200: '#b9e7ff',
          300: '#88d7ff',
          400: '#4dc2ff',
          500: '#16a8f4',
          600: '#0788d4',
          700: '#086cab',
          800: '#0d5b8d',
          900: '#104c74',
          950: '#082f4c',
        },
        'accent': {
          50: '#f4ffed',
          100: '#e5ffd7',
          200: '#cbffb0',
          300: '#a4f87d',
          400: '#79df4f',
          500: '#58c72f',
          600: '#3da51f',
          700: '#318020',
          800: '#2c6521',
          900: '#27541f',
        },
        'navy': {
          800: '#17324d',
          900: '#0b2138',
          950: '#061326',
        },
        'paper': '#fbfdff',
        'mist': '#edf4f8',
        'ink': '#061326',
        'coral': {
          400: '#ff806a',
          500: '#ef654f',
          600: '#d74f3c',
        },
        'gold': {
          300: '#ffd98a',
          400: '#ffc45e',
          500: '#f4ad35',
          600: '#d88b17',
        },
      },
      fontFamily: {
        'sans': ['Manrope', 'Segoe UI', 'sans-serif'],
        'display': ['Sora', 'Segoe UI', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tighter: '0',
        tight: '0',
        normal: '0',
        wide: '0',
        wider: '0',
        widest: '0',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #061326 0%, #0b2138 58%, #0b3542 100%)',
      }
    },
  },
  plugins: [],
}
