import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    '../react-components/components/**/*.{ts,tsx}',
    '../react-components/quantum/**/*.{ts,tsx}',
    '../react-components/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        quantum: {
          DEFAULT: 'hsl(var(--quantum-primary))',
          foreground: 'hsl(var(--quantum-foreground))',
          background: 'hsl(var(--quantum-background))',
          border: 'hsl(var(--quantum-border))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'quantum-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9', filter: 'brightness(1.1)' },
        },
        'quantum-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'quantum-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'quantum-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'entanglement-pulse': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.8' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(10px)' },
        },
        'progress-shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'complete-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(var(--primary), 0)' },
          '50%': { boxShadow: '0 0 20px rgba(var(--primary), 0.5)' },
        },
      },
      animation: {
        'quantum-pulse': 'quantum-pulse 2s infinite',
        'quantum-spin': 'quantum-spin 4s linear infinite',
        'quantum-fade': 'quantum-fade 0.3s ease-in-out',
        'quantum-breathe': 'quantum-breathe 4s infinite',
        'quantum-shimmer': 'shimmer 2s infinite',
        'quantum-entanglement': 'entanglement-pulse 2s infinite',
        'quantum-fade-in': 'fade-in 0.3s ease-in-out forwards',
        'quantum-fade-out': 'fade-out 0.3s ease-in-out forwards',
        'quantum-progress': 'progress-shimmer 2s infinite',
        'quantum-complete': 'complete-pulse 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
