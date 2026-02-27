/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        christ: {
          blue: '#1F3C88', // Primary institutional blue
          'blue-dark': '#163D7A', // Darker variant
          gold: '#D4AF37', // Metallic gold accent
          'gold-dark': '#C9A227', // Darker gold
          ivory: '#EDE6DA', // Warm ivory background
          'ivory-light': '#F5F2ED', // Lighter ivory
          beige: '#E8E1D3', // Soft beige
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'christ-gradient': 'linear-gradient(135deg, #163D7A 0%, #1F3C88 100%)',
        'ivory-gradient': 'linear-gradient(135deg, #E8E1D3 0%, #EDE6DA 100%)',
      },
    },
  },
  plugins: [],
}