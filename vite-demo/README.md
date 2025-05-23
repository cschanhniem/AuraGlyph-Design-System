# AuraGlyph Vite Demo

A client-side showcase of the AuraGlyph design system - a next-generation quantum design system that evolves from glassmorphism into a responsive, conscious design organism.

## Overview

This demo application built with Vite and React provides a comprehensive demonstration of the AuraGlyph quantum design components. It's designed as a pure client-side application with no server-side rendering to avoid any React Server Component conflicts.

## Features

- **Quantum Button Variants**: Various materials (Glass, Nebula, Frost, Crystal) with adjustable properties
- **Interactive Cards**: With entanglement effects and responsive behaviors
- **Quantum Form Elements**: Inputs, toggles, selects, and more with quantum material effects
- **Immersive Modals**: Dialog windows with quantum visual properties
- **Progress Indicators**: Quantum-enhanced progress bars with various styles
- **Tabs & Navigation**: Quantum-styled tab interfaces
- **Alerts & Notifications**: Status alerts with quantum effects
- **Avatars**: User avatars with quantum material variants
- **Quantum Entanglement**: Components that respond to each other's state changes
- **CSS Utility Classes**: For quick application of quantum design features
- **Dark Mode**: Built-in dark mode toggle

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository (if you haven't already)

2. Install dependencies for the react-components first:
```
cd AuraGlyph/react-components
npm install
# or
yarn install
# or
pnpm install
```

3. Install dependencies for the Vite demo:
```
cd ../vite-demo
npm install
# or
yarn install
# or
pnpm install
```

4. Start the development server:
```
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
AuraGlyph/vite-demo/
├── public/              # Static assets
│   └── quantum.svg      # Favicon
├── src/                 # Source files
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── vite.config.ts       # Vite configuration
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Technical Details

This demo is built entirely on the client side to avoid SSR complexities:

- **Vite**: For fast development and optimized production builds
- **React**: For component-based UI development
- **TailwindCSS**: For styling with utility classes
- **Direct Imports**: Components are imported directly from the react-components source
- **No SSR**: Purely client-side rendered to avoid "use client" directive issues

## Component Categories

### Quantum Buttons
Buttons with various quantum materials and properties like depth, luminance, and clarity.

### Quantum Cards
Card components that demonstrate layered quantum effects and entanglement between components.

### Quantum Inputs
Form elements with quantum styling, including input fields, toggle switches, and select dropdowns.

### Quantum Modals
Dialog windows with immersive quantum effects and responsive behaviors.

### Progress Indicators
Progress bars with quantum effects, including standard, circular, and dots variants.

### Tabs & Navigation
Tab interfaces with quantum styling and animations for state transitions.

### Alerts & Notifications
Status alerts with quantum effects for different severity levels.

### Avatars
User avatars with quantum material variants and fallback options.

### Quantum Entanglement
Components that respond to each other's state changes, creating synchronized experiences.

## Customization

The demo uses TailwindCSS for styling with custom quantum design tokens. You can adjust these in:
- `tailwind.config.js` - For design tokens and extensions
- `src/index.css` - For global styles and quantum material definitions

## Troubleshooting

If you encounter any issues:

1. **Import Errors**: Ensure paths are correct when importing from react-components
2. **Styling Issues**: Clear browser cache and ensure CSS is loading properly
3. **Backdrop Filter Support**: Ensure your browser supports CSS backdrop filters
4. **TailwindCSS**: If styles aren't applying, check the content paths in tailwind config
5. **Module Resolution**: If you see module not found errors, try running `pnpm install` again in both directories

## Why Vite Instead of Next.js?

This demo uses Vite instead of Next.js to avoid React Server Component issues. The AuraGlyph components use hooks (like `useRef`, `useState`, etc.) which are client-side features, but Next.js treats components as server components by default unless explicitly marked with "use client".

Using Vite ensures that all components are client-side by default, eliminating these issues.

## Direct Imports vs Package Imports

Instead of importing from a package like:
```js
import { Button } from '@auraglyph/react';
```

We're using direct imports:
```js
import { Button } from '../../react-components/components/ui/button';
```

This approach avoids package resolution issues and allows for easier development without needing to build the component library first.

## Learn More

For more information about the AuraGlyph design system philosophy and implementation details, refer to the main documentation in the project repository.

## License

MIT