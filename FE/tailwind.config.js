/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue:{
          300:"#e1e7fe",
          500:"#3e38a7",
          600:"#5046e4"
        }
      }
    },
  },
  plugins: [],
}

