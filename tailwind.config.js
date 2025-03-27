/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'twolabs-dark': '#1E1E1E',
          'twolabs-green': '#48BB78',
        },
      },
    },
    plugins: [],
  }