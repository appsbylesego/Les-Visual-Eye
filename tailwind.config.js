/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#0A0A0A',
        gold: '#C89B3C',
        'cinematic-orange': '#FF6A00',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
        'sans': ['Inter', 'Montserrat', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
