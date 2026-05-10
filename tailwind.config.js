/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        surface: {
          DEFAULT: '#12131a',
          low:   '#0e0f15',
          high:  '#1a1b26',
          highest: '#222334',
        },
        glass: 'rgba(18, 19, 26, 0.7)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 24px rgba(59,130,246,0.35)',
        'card':      '0 4px 32px rgba(0,0,0,0.45)',
        'card-hover':'0 8px 48px rgba(0,0,0,0.65)',
      },
    },
  },
  plugins: [],
}
