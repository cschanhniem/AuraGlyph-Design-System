# AuraGlyph React Demo Application

This demo application showcases the AuraGlyph design system - a next-generation quantum design system that evolves from glassmorphism into a responsive, conscious design organism.

## Overview

The AuraGlyph React Demo App provides a comprehensive demonstration of the quantum design components, featuring:

- Quantum Button variations with various materials and properties
- Quantum Card components with entanglement effects
- Quantum Input elements and form controls
- Modals with immersive quantum effects
- CSS utility classes for quantum design
- Responsive layouts showcasing the design system

## Prerequisites

- Node.js 16.x or higher
- npm or yarn

## Getting Started

1. Clone the repository (if you haven't already)

2. Install dependencies:
```
cd AuraGlyph/demo-app
npm install
```

3. Link the local AuraGlyph React components:
```
# This happens automatically since we're using local file reference
# in package.json: "@auraglyph/react": "file:../react-components"
```

4. Start the development server:
```
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
AuraGlyph/demo-app/
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Root layout with QuantumProvider
│   ├── page.tsx         # Main demo page with component examples
│   └── globals.css      # Global styles including quantum effects
├── public/              # Static assets
├── README.md            # This file
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Component Categories

The demo showcases several categories of AuraGlyph components:

### Quantum Buttons
Buttons with various quantum materials (Glass, Nebula, Frost, Crystal) and properties like depth, luminance, and clarity.

### Quantum Cards
Card components that demonstrate layered quantum effects and entanglement between components.

### Quantum Inputs
Form elements with quantum styling, including input fields and toggle switches.

### Quantum Modals
Dialog windows with immersive quantum effects and responsive behaviors.

## Customization

The demo uses TailwindCSS for styling with custom quantum design tokens. You can adjust these in:
- `tailwind.config.js` - For design tokens and extensions
- `app/globals.css` - For global styles and quantum material definitions

## Troubleshooting

If you encounter any issues with the demo:

1. Make sure all dependencies are installed correctly
2. Check that the local reference to `@auraglyph/react` is working properly
3. Clear your browser cache if you see unexpected styling issues
4. Ensure you're using a modern browser that supports CSS backdrop filters

## Learn More

For more information about the AuraGlyph design system philosophy and implementation details, refer to the main documentation in the project repository.