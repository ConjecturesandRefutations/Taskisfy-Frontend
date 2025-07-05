/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',   // Tailwind blue-500
        secondary: '#2563EB'  // Tailwind blue-600
      }
    },
  },
  plugins: [],
}
