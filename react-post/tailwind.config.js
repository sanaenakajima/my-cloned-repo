/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          500: '#001f3f',
          600: '#274C77',
          700: '#1D3557',
          800: '#14213D',
          900: '#0D1321',
        },
        teal: {
          500: '#008080',
        },
        gold: {
          500: '#FFD700',
        },
        lightGray: {
          500: '#f5f5f5',
        },
      },
      screens: {
        'tablet': '600px',
        'laptop': '1025px',
      },
    },
  },
  plugins: [],
}

