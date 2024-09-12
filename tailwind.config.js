/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '500px',
      },
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif']
      },
      colors: {
        "royal-blue": "#5047ed",
        "aqua-haze": "#F6F8FA"
      },
    },
  },
  plugins: [],
};
