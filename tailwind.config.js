/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#11E3AB',
        primary: '#021DA5',
        dragzone: '#eef2ff',
        carton: {
          50: '#ede9fe',
          100: '#f5f5f4',
          200: '#a8a29e',
        },
        "base": {
          "white": "#ffffff",
          "primary": "#3699FF",
          "secondary": "#E5EAEE",
          "success": "#11E3AB",
          "info": "#8950FC",
          "warning": "#FFA800",
          "danger": "#F64E60",
          "light": "#E4E6EF",
          "dark": "#181C32"
        },
        "light": {
          "white": "#ffffff",
          "primary": "#E1F0FF",
          "secondary": "#EBEDF3",
          "success": "#C9F7F5",
          "info": "#EEE5FF",
          "warning": "#FFF4DE",
          "danger": "#FFE2E5",
          "light": "#F2F4FC",
          "dark": "#D6D6E0"
        }
      }
    },

  },
  plugins: [],
}

