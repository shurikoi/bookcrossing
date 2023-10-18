/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    extend: {
      screens: {
        '2md': '960px',
        '2sm': '768px'
      },
      fontFamily: {
        head: 'var(--font-head)',
        inter: 'var(--font-inter)',
        lato: 'var(--font-lato)',
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        scaling: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(2)' },
        },
      },
      animation: {
        rotation: 'rotation 750ms ease-in-out infinite',
        scaling: 'scaling 2s ease-in-out infinite',
        'scaling-1s': "scaling 2s ease-in-out infinite 1s"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
    },
  },
  plugins: [],
}
