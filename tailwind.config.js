/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f8ef00',
        'light': '#fafafa',
        'dark': '#000000',
        'gray': '#BBBBBB',
        'secondary': '#00F0FF',
        'danger': '#FF003C',
      }
    },
  },
  plugins: [],
}
