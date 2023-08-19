/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyColor: '#120F0D',
        mainColor: '#D63D21',
        lightColor: '#EE8B7A',
        darkColor: '#D9C7BD',
        hoverColor: 'rgba(100, 255, 218, 0.1)',
      },
      fontFamily: {
        titleFont: ['Playfair Display', 'serif'],
        bodyFont: ['Inter', 'sans- serif'],
        orb: ['Orbitron', 'sans- serif'],

      },
    },
  },
  plugins: [],
}