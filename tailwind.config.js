/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#42a5f5',
          DEFAULT: '#2196f3',
          dark: '#1e88e5',
        },
        secondary: {
          light: '#ff4081',
          DEFAULT: '#f50057',
          dark: '#c51162',
        },
      },
      backgroundColor: {
        'dark-primary': '#1a1a1a',
        'dark-secondary': '#2d2d2d',
        'dark-hover': '#3d3d3d',
      },
      textColor: {
        'dark-primary': '#ffffff',
        'dark-secondary': '#a0a0a0',
      },
      borderColor: {
        'dark-border': '#404040',
      },
    },
  },
  plugins: [],
}
