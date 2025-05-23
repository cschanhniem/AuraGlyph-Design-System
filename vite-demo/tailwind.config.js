/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    // Include AuraGlyph component paths
    '../react-components/components/**/*.{ts,tsx}',
    '../react-components/quantum/**/*.{ts,tsx}',
    '../react-components/lib/**/*.{ts,tsx}',
  ],
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // AuraGlyph specific colors
        quantum: {
          nebula: "hsl(var(--quantum-nebula))",
          frost: "hsl(var(--quantum-frost))",
          crystal: "hsl(var(--quantum-crystal))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'quantum': '0 0 25px -5px rgba(var(--quantum-glow-color), 0.3)',
        'quantum-lg': '0 0 35px -5px rgba(var(--quantum-glow-color), 0.4)',
        'quantum-glow': '0 0 45px -2px rgba(var(--quantum-glow-color), 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "quantum-pulse": {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.95, transform: "scale(1.02)" },
        },
        "quantum-breathe": {
          "0%, 100%": { opacity: 0.98, filter: "brightness(1)" },
          "50%": { opacity: 1, filter: "brightness(1.05)" },
        },
        "quantum-glow": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "quantum-pulse": "quantum-pulse 3s infinite ease-in-out",
        "quantum-breathe": "quantum-breathe 5s infinite ease-in-out",
        "quantum-glow": "quantum-glow 2s infinite ease-in-out",
      },
      backgroundOpacity: {
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
