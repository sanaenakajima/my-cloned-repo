/** @type {import('tailwindcss').Config} */
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
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        bounce: 'bounce 1.5s infinite',
      },
    },
  },
  plugins: [],
}


