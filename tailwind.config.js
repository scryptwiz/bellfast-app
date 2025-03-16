/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        s1: '#3A3A3A',
        s2: '#535763',
        s3: '#6F767E',
        p1: '#2B2D63',
        p2: '#513DB0',
      },
    },
  },
  plugins: [],
};
