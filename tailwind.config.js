/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#2C1A0E',
        amber: '#C9843A',
        dark: '#1A1208',
        clay: '#3D2410',
        parchment: '#F5E6CC',
        green: '#2D4A1E',
        sage: '#A2B59D',
        royalLine: 'rgba(245, 230, 204, 0.25)',
        deep: '#0F0A04',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
