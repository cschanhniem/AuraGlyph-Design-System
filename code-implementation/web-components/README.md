# AuraGlyph Web Components

This directory contains the web components implementation of the AuraGlyph design system - a next-generation quantum design system that evolves from glassmorphism into a responsive, conscious design organism.

## Components

- `quantum-element.js` - Base element for all AuraGlyph components
- `quantum-button.js` - Button component with quantum effects
- `index.html` - Demo page showcasing the components

## Running Locally

### Prerequisites

- Node.js (v12 or later recommended)

### Using the Development Server

To avoid CORS policy issues when loading JavaScript modules, we've included a simple Node.js server.

1. Navigate to this directory in your terminal:
   ```
   cd path/to/AuraGlyph/code-implementation/web-components
   ```

2. Start the server:
   ```
   node server.js
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Why a Server is Necessary

When opening HTML files directly from the filesystem (`file://` protocol), browsers block JavaScript module imports due to CORS security restrictions. The Node.js server serves files using the HTTP protocol, which allows modules to be properly loaded.

### Common CORS Errors

If you see errors like these:

```
Access to script at 'file:///path/to/quantum-element.js' from origin 'null' has been blocked by CORS policy
```

It means you're trying to open the HTML file directly without using the server.

## Development Notes

- This implementation showcases the Quantum Matter visual language with responsive, interactive components
- Components use Web Components standards for broad compatibility
- Entanglement feature allows components to communicate state changes

For more information on the AuraGlyph design system vision, refer to the main project documentation.