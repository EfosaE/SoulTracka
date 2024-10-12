/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['emerald', 'night', 'cyberpunk'],
  },
};
