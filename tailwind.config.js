/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      blue: {
        600: 'rgb(29, 155, 240)',
        300: 'rgba(29, 155, 240, 0.1)',
      },
      navy: 'rgba(21,32,43,1.00)',
      black: {
        300: 'rgba(39, 44, 48, 0.75)',
        600: 'rgba(15, 20, 25, 0.75)',
      },
      gray: {
        300: 'rgb(66, 83, 100)',
        600: 'rgb(56, 68, 77)',
      },
      white: 'rgb(247, 249, 249)',
    },
  },
  plugins: [],
}
