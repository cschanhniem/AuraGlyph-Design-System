import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './react-components/**/*.{ts,tsx}',
    './vite-demo/src/**/*.{ts,tsx}',
    './demo-app/**/*.{ts,tsx}',
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
        quantum: {
          DEFAULT: 'hsl(var(--quantum-primary))',
          foreground: 'hsl(var(--quantum-foreground))',
          background: 'hsl(var(--quantum-background))',
          border: 'hsl(var(--quantum-border))',
          state: {
            energy: 'hsl(var(--quantum-state-energy))',
            phase: 'hsl(var(--quantum-state-phase))',
            coherence: 'hsl(var(--quantum-state-coherence))',
            observability: 'hsl(var(--quantum-state-observability))',
          },
          emotion: {
            positive: 'hsl(var(--quantum-emotion-positive))',
            negative: 'hsl(var(--quantum-emotion-negative))',
            neutral: 'hsl(var(--quantum-emotion-neutral))',
            excited: 'hsl(var(--quantum-emotion-excited))',
            calm: 'hsl(var(--quantum-emotion-calm))',
          },
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'quantum-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'quantum-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'quantum-pulse': 'quantum-pulse 2s infinite',
        'quantum-spin': 'quantum-spin 4s linear infinite',
        'quantum-fade': 'quantum-fade 0.3s ease-in-out',
      },
      transitionTimingFunction: {
        quantum: 'var(--quantum-animation-timing)',
      },
      transitionDuration: {
        quantum: 'var(--quantum-animation-duration)',
      },
      backdropBlur: {
        quantum: 'var(--quantum-material-blur)',
      },
      backdropSaturate: {
        quantum: 'var(--quantum-material-saturation)',
      },
      backdropHueRotate: {
        quantum: 'var(--quantum-material-hue-rotate)',
      },
    },
  },
  plugins: [],
};

export default config;
