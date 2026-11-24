/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand blue (hero background, links, focus rings)
        primary: {
          DEFAULT: '#0877C4',
          50: '#E8F3FB',
          400: '#2A92D8',
          500: '#0877C4',
          600: '#06609F',
          light: '#2A92D8',
          dark: '#06609F',
          bg: '#E8F3FB',
        },
        // Brand yellow (highlights, call-to-action)
        accent: {
          DEFAULT: '#FFCD00',
          100: '#FFF3C2',
          500: '#FFCD00',
          600: '#E6B800',
        },
        // Brand ink (header text, footer background)
        ink: '#333544',
        gray: {
          50: '#f8fafb',
          600: '#5c5f70',
          900: '#333544',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        lg: '0 10px 25px -5px rgba(8, 119, 196, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
