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

        // custom card color
        'custom-card-kb-from': '#72695F',
        'custom-card-kb-to': '#38332e',
        'custom-card-bc-from': '#F22F50',
        'custom-card-bc-to': '#a52137',
        'custom-card-hana-from': '#00907F',
        'custom-card-hana-to': '#00564b',
        'custom-card-lotte-from': '#DC0412',
        'custom-card-lotte-to': '#840209',
        'custom-card-hyundai-from': '#474747',
        'custom-card-hyundai-to': '#000000',
        'custom-card-woori-from': '#007FC5',
        'custom-card-woori-to': '#004063',
        'custom-card-samsung-from': '#0068F7',
        'custom-card-samsung-to': '#0052bf',
        'custom-card-shinhan-from': '#0044F7',
        'custom-card-shinhan-to': '#002a96',
        'custom-card-nonghyup-from': '#1EAE57',
        'custom-card-nonghyup-to': '#15773b',

        //dashboard custom color
        'custom-dashboard-pending-bg': '#ff8447',
        'custom-dashboard-orders-bg': '#06d38b',
        'custom-dashboard-members-bg': '#32c1ff',
        'custom-dashboard-products-bg': '#bcaaed',
        'custom-dashboard-pending-hover': '#fff',
        'custom-dashboard-orders-hover': '#05b97b',
        'custom-dashboard-members-hover': '#2aa7e2',
        'custom-dashboard-products-hover': '#a89ed6',
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
      transitionProperty: {
        transform: 'transform',
      },
      inset: {
        '6/100': '6%',
        '6/10': '60%',
      },
      gap: {
        '1dvh': '1dvh',
        '2dvh': '2dvh',
        '3dvh': '3dvh',
        '4dvh': '4dvh',
        '5dvh': '5dvh',
        '12dvw': '12dvw',
        '7dvh': '7dvh',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('flowbite/plugin'), flowbite.plugin()],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
