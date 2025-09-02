/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // important: dark mode toggle using class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xl2': '1500px', // custom breakpoint
      },
    },
  },
  plugins: [],
}
