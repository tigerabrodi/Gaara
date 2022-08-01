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
      blue: 'rgb(29, 155, 240)',
      navy: 'rgba(21,32,43,1.00)',
      gray: {
        300: 'rgb(66, 83, 100)',
        600: 'rgb(56, 68, 77)',
      },
      white: 'rgb(247, 249, 249)',
    },
  },
  plugins: [],
}
