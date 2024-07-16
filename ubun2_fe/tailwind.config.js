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
        excel: '#44b058',
        btnborder: 'rgba(131, 129, 129, 0.2)',
        // [custom color] - badge
        'badge-red': '#E64952',
        'badge-green': '#06B87C',
        'badge-blue': '#0EA5E9',
        'badge-orange': '#FD7A30',
        'badge-yellow': '#FDE047',
        'badge-orange-yellow': '#F59E0B',
        'custom-badge-roadaddr': '#DFECFF',
        'custom-badge-roadaddr-text': '#366EA7',
        'custom-badge-jibun': '#E6E6E6',
        'custom-badge-jibun-text': '#54585B',

        // [bg] - button
        'custom-button-purple': '#D4CDE7',
        'custom-font-purple': '#290386',
        'custom-input-gray': '#F5F5F5',
        'custom-font-gray': '#8B949F',
        'custom-input-lightgray': '#F9FAFC',

        // [custom color] - alert
        'custom-alert-check': '#928AFF',
        'custom-alert-bg-purple': '#C8C4FF',
        'custom-alert-bg-gray': '#F9FAFC',
      },
      animation: {
        'move-sideways': 'moveSideways 1s infinite alternate',
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        moveSideways: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(5px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
      },
      width: {
        '7/10': '70%',
        '1/20': '2%',
        '1/4': '28%',
        '48/100': '48%',
        '50/100': '50%',
        '4/100': '4%',

        '46/100': '46%',
        '6/100': '8%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('flowbite/plugin'), flowbite.plugin()],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
