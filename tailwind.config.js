/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcdbff',
          300: '#8ec6ff',
          400: '#59a7ff',
          500: '#3384ff',
          600: '#1a63f5',
          700: '#134de1',
          800: '#163fb6',
          900: '#18398f',
          950: '#142357',
        },
        dark: {
          50: '#f6f6f9',
          100: '#ececf2',
          200: '#d5d5e2',
          300: '#b0b0c9',
          400: '#8585ab',
          500: '#666691',
          600: '#525278',
          700: '#434362',
          800: '#3a3a53',
          900: '#1e1e2e',
          950: '#13131f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
