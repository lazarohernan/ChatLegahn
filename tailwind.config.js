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
        'dark-accent': '#404040',
      },
      textColor: {
        'dark-primary': '#ffffff',
        'dark-secondary': '#a0a0a0',
        'dark-muted': '#6b7280',
      },
      borderColor: {
        'dark-border': '#404040',
        'dark-border-light': '#4a4a4a',
      },
      ringColor: {
        'dark-focus': '#2196f3',
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
