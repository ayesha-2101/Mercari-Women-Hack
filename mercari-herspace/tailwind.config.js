/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Your content paths to scan for class names
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6AABD2',
        secondary: '#D1E7E3',
        accent: '#164453',
      },
      animation: {
        marquee: 'marquee 15s linear infinite', // Add your custom animation here
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
    screens: {
      'xs': '360px', 
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
  },
  plugins: [],
};
