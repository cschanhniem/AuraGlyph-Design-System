# Quantum UI React Components

A modern UI component library with quantum-inspired interactions and animations.

## Features

- 🌌 Quantum-inspired animations and effects
- 🎨 Customizable themes and variants
- 🧬 State entanglement between components
- 🎭 Emotional response system
- 🔮 Predictive interactions
- ⚡ High-performance animations
- 🎯 Accessibility-first design
- 🌓 Dark mode support

## Installation

```bash
# Using npm
npm install @quantum-ui/react

# Using yarn
yarn add @quantum-ui/react

# Using pnpm
pnpm add @quantum-ui/react
```

## Quick Start

1. Import the styles in your app:
```tsx
import '@quantum-ui/react/styles/quantum.css';
import '@quantum-ui/react/styles/quantum-theme.css';
```

2. Configure Tailwind CSS:
```ts
// tailwind.config.ts
import { quantumPlugin } from '@quantum-ui/react/lib/quantum-plugin';

export default {
  // ...other config
  plugins: [quantumPlugin],
}
```

3. Wrap your app with QuantumProvider:
```tsx
import { QuantumProvider } from '@quantum-ui/react';

function App() {
  return (
    <QuantumProvider>
      {/* Your app content */}
    </QuantumProvider>
  );
}
```

## Components

### Button
```tsx
import { Button } from '@quantum-ui/react';

// Basic usage
<Button>Click me</Button>

// Quantum variants
<Button variant="quantum">Quantum</Button>
<Button variant="nebula">Nebula</Button>
<Button variant="crystal">Crystal</Button>
<Button variant="frost">Frost</Button>
<Button variant="glass">Glass</Button>

// With quantum effects
<Button
  quantum
  quantumId="unique-id"
  entanglement={["other-button-id"]}
  adaptivityLevel={0.8}
  emotionalSensitivity={0.7}
  animate
>
  Quantum Button
</Button>
```

### Input
```tsx
import { Input } from '@quantum-ui/react';

// Basic usage
<Input placeholder="Type here..." />

// Quantum variants
<Input variant="quantum" />
<Input variant="frost" />
<Input variant="crystal" />

// With quantum effects
<Input
  quantum
  quantumId="input-1"
  entanglement={["input-2"]}
  adaptivityLevel={0.6}
/>
```

### Modal
```tsx
import { Modal } from '@quantum-ui/react';

<Modal
  variant="quantum"
  trigger={<Button>Open Modal</Button>}
>
  <div className="p-6">
    <h3>Quantum Modal</h3>
    <p>This modal has quantum effects!</p>
  </div>
</Modal>
```

### Toggle
```tsx
import { Toggle } from '@quantum-ui/react';

<Toggle
  variant="quantum"
  quantum
  quantumId="toggle-1"
/>
```

## Quantum Features

### State Entanglement
Components can be entangled to share state and respond to each other's interactions:

```tsx
<Button
  quantumId="button-1"
  entanglement={["button-2"]}
>
  Button 1
</Button>

<Button
  quantumId="button-2"
  entanglement={["button-1"]}
>
  Button 2
</Button>
```

### Emotional Response
Components can respond to user interactions with emotional states:

```tsx
<Button
  quantum
  emotionalSensitivity={0.8}
  onInteraction={(state) => {
    console.log('Emotional state:', state.emotionalResonance);
  }}
>
  Emotional Button
</Button>
```

### Adaptive Behavior
Components can adapt their behavior based on user interactions:

```tsx
<Button
  quantum
  adaptivityLevel={0.9}
  variant="nebula"
>
  Adaptive Button
</Button>
```

## Custom Hooks

### useQuantum
Create your own quantum-enabled components:

```tsx
import { useQuantum } from '@quantum-ui/react';

function QuantumElement() {
  const {
    ref,
    energy,
    phase,
    emotionalState,
    cssVariables,
    emitInteraction,
    pulse,
    getQuantumClass
  } = useQuantum({
    id: 'custom-element',
    adaptivityLevel: 0.7,
    emotionalSensitivity: 0.8
  });

  return (
    <div
      ref={ref}
      className={getQuantumClass('custom')}
      style={cssVariables}
      onClick={() => emitInteraction('click', 1.0)}
    >
      Quantum Element
    </div>
  );
}
```

## Styling

### CSS Variables
Quantum UI uses CSS variables for dynamic styling:

```css
.quantum-element {
  --quantum-energy: 0.5;
  --quantum-phase: 0;
  --quantum-coherence: 1;
  --quantum-observability: 0.8;
}
```

### Utility Classes
```tsx
// Energy levels
<div className="quantum-energy-50" />

// Coherence levels
<div className="quantum-coherence-80" />

// Animations
<div className="animate-quantum-breathe" />
<div className="animate-quantum-pulse" />
<div className="animate-quantum-glow" />

// States
<div className="quantum-pressed" />
<div className="quantum-active" />
```

## TypeScript Support

All components and hooks are fully typed. Import types directly:

```tsx
import type { 
  QuantumState,
  QuantumOptions,
  QuantumResult 
} from '@quantum-ui/react';
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Your Name]
