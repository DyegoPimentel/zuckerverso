/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3C095E',
          100: '#E8E0EF',  // Lighter shade
          200: '#C5B2DB',
          300: '#A384C8',
          400: '#8056B4',
          500: '#3C095E',  // Base color
          600: '#350850',
          700: '#2E0743',
          800: '#270536',
          900: '#200429',  // Darker shade
        },
      },
    },
  },
  plugins: [],
}

