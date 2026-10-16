/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070C14',
          900: '#0B1320', // Primary deep navy
          800: '#142238', // Secondary navy
          700: '#1E3250',
          600: '#2A456C'
        },
        industrial: {
          orange: '#EA580C', // Primary industrial accent
          orangeHover: '#C2410C',
          orangeLight: '#FFF7ED'
        },
        steel: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155', // Steel gray
          600: '#475569',
          500: '#64748B', // Muted text
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0', // Borders
          100: '#F1F5F9', // Concrete gray
          50: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        widest: '.15em',
        architectural: '.08em'
      }
    },
  },
  plugins: [],
};
