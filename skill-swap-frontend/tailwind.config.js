/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Assuming Inter font
      },
      colors: {
        primary: '#6366F1', // Example primary color
        secondary: '#8B5CF6', // Example secondary color
        accent: '#EC4899', // Example accent color
      },
    },
  },
  plugins: [],
}