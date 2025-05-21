import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuantum } from '../../quantum/use-quantum';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { QuantumProps } from '../../quantum/types';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ToggleProps 
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants>,
    QuantumProps {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({
  className,
  variant,
  size,
  quantum = true,
  quantumId,
  entanglement,
  adaptivityLevel,
  emotionalSensitivity,
  animate = true,
  ...props
}, ref) => {
  const quantum_ = useQuantum({
    quantum,
    quantumId,
    entanglement,
    adaptivityLevel,
    emotionalSensitivity,
    animate,
  });

  // Compute dynamic classes based on quantum state
  const dynamicClasses = React.useMemo(() => {
    if (!quantum_.state) return '';

    const energyClass = quantum_.energy > 0.7 
      ? 'shadow-lg scale-105' 
      : quantum_.energy > 0.3 
        ? 'shadow-md scale-102'
        : '';

    const glowClass = quantum_.energy > 0.8
      ? 'quantum-glow'
      : '';

    const emotionClass = quantum_.emotionalState?.valence ?? 0 > 0.5
      ? 'quantum-emotion-positive'
      : quantum_.emotionalState?.valence ?? 0 < -0.5
        ? 'quantum-emotion-negative'
        : '';

    return `${energyClass} ${glowClass} ${emotionClass}`.trim();
  }, [quantum_.state, quantum_.energy, quantum_.emotionalState]);

  // Handle quantum interactions
  const handlePressedChange = React.useCallback((pressed: boolean) => {
    quantum_.emitInteraction(pressed ? 'press' : 'release');
    props.onPressedChange?.(pressed);
  }, [quantum_, props]);

  return (
    <TogglePrimitive.Root
      ref={ref}
      className={`${toggleVariants({ variant, size, className })} ${dynamicClasses}`}
      style={quantum_.cssVariables as React.CSSProperties}
      onPressedChange={handlePressedChange}
      {...props}
    />
  );
});

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
