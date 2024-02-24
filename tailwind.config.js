/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'comerc-green-400': '#b8f512',
        'comerc-green-500': '#6ce10a',
        'comerc-green-600': '#59BC0C',

        'comerc-blue-800': '#182630'
      },
      backgroundImage: {
        'comerc-btn-gradient': 'linear-gradient(90deg, #63de09, #b8f512)'
      }
    }
  },
  plugins: []
}
