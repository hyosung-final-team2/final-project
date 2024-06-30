const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    './node_modules/flowbite/**/*.js',
    flowbite.content(),
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        main: '#290386',
        second: '#d2cbe6',
      },
      animation: {
        'move-sideways': 'moveSideways 1s infinite alternate',
      },
      keyframes: {
        moveSideways: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(5px)' },
        },
      },
      width: {
        '7/10': '70%',
        '1/20': '2%',
        '1/4': '28%',
        '48/100': '48%',
        '4/100': '4%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('flowbite/plugin'), flowbite.plugin()],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
