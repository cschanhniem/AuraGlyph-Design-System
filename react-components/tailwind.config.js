/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './quantum/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Quantum color extensions
        quantum: {
          DEFAULT: "hsl(var(--quantum))",
          foreground: "hsl(var(--quantum-foreground))",
          nebula: "hsl(var(--quantum-nebula))",
          frost: "hsl(var(--quantum-frost))",
          crystal: "hsl(var(--quantum-crystal))",
          luminance: "hsl(var(--quantum-luminance))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        quantum: "var(--quantum-radius)",
      },
      boxShadow: {
        quantum: "var(--quantum-shadow)",
        'quantum-sm': "var(--quantum-shadow-sm)",
        'quantum-lg': "var(--quantum-shadow-lg)",
        'quantum-glow': "var(--quantum-glow)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "quantum-pulse": {
          "0%, 100%": { opacity: 0.5, transform: "scale(1.0)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        "quantum-breathe": {
          "0%, 100%": { backdropFilter: "blur(var(--quantum-blur-min))" },
          "50%": { backdropFilter: "blur(var(--quantum-blur-max))" },
        },
        "quantum-phase-shift": {
          "0%": { "--quantum-phase": "0" },
          "100%": { "--quantum-phase": "1" },
        },
        "quantum-glow": {
          "0%": { boxShadow: "0 0 0 rgba(var(--quantum-glow-color), 0)" },
          "50%": { boxShadow: "0 0 30px rgba(var(--quantum-glow-color), var(--quantum-glow-intensity))" },
          "100%": { boxShadow: "0 0 0 rgba(var(--quantum-glow-color), 0)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "quantum-pulse": "quantum-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "quantum-breathe": "quantum-breathe 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "quantum-phase-shift": "quantum-phase-shift 10s linear infinite",
        "quantum-glow": "quantum-glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        'quantum-gradient': 'linear-gradient(to right, hsl(var(--quantum-gradient-from)), hsl(var(--quantum-gradient-to)))',
        'quantum-radial': 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), hsl(var(--quantum-gradient-from)), transparent 70%)',
        'quantum-nebula': 'radial-gradient(ellipse at center, hsl(var(--quantum-nebula)), transparent 80%)',
      },
      backdropFilter: {
        'quantum': 'blur(var(--quantum-blur))',
      },
      transitionTimingFunction: {
        'quantum': 'cubic-bezier(0.2, 0.9, 0.3, 1.0)',
        'quantum-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'quantum-out': 'cubic-bezier(0.0, 0.7, 0.2, 1.0)',
      },
      // Custom variables for the quantum system
      variables: {
        '--quantum-blur': '12px',
        '--quantum-blur-min': '8px',
        '--quantum-blur-max': '16px',
        '--quantum-radius': '12px',
        '--quantum-phase': '0',
        '--quantum-coherence': '1',
        '--quantum-energy': '0.5',
        '--quantum-luminance': '0.7',
        '--quantum-depth': '0.2',
        '--quantum-clarity': '0.65',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for quantum effects
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.quantum-glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(var(--quantum-blur, 12px))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--quantum-radius, 12px)',
          boxShadow: 'var(--quantum-shadow, 0 4px 30px rgba(0, 0, 0, 0.1))',
          transition: 'all 0.3s var(--quantum-transition, cubic-bezier(0.2, 0.9, 0.3, 1.0))',
        },
        '.quantum-nebula': {
          '--quantum-clarity': '0.6',
          '--quantum-luminance': '0.8',
          backgroundColor: 'rgba(80, 105, 200, 0.1)',
          boxShadow: '0 8px 32px rgba(80, 105, 200, 0.2)',
        },
        '.quantum-frost': {
          '--quantum-clarity': '0.8',
          '--quantum-luminance': '0.5',
          backgroundColor: 'rgba(220, 240, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(220, 240, 255, 0.15)',
        },
        '.quantum-crystal': {
          '--quantum-clarity': '0.9',
          '--quantum-luminance': '0.9',
          '--quantum-refraction': '1.5',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)',
        },
      })
    }),
  ],
}