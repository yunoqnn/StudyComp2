import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        fredoka: ['var(--font-fredoka)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Kid-friendly color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        cute: {
          pink: '#ff6b9d',
          purple: '#c44569',
          blue: '#4facfe',
          green: '#43e97b',
          yellow: '#ffd93d',
          orange: '#ff8a65',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'fun': '0 10px 40px rgba(102, 126, 234, 0.25)',
        'cute': '0 10px 40px rgba(255, 107, 157, 0.25)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
