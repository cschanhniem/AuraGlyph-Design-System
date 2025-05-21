import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { useQuantum } from '../../quantum/use-quantum';
import type { QuantumProps } from '../../quantum/types';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    QuantumProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      quantum = true,
      quantumId,
      entanglement,
      adaptivityLevel,
      emotionalSensitivity,
      animate = true,
      asChild = false,
      ...props
    },
    ref
  ) => {
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

      const intensityClass = quantum_.energy > 0.7 
        ? 'shadow-lg scale-105' 
        : quantum_.energy > 0.3 
          ? 'shadow-md scale-102'
          : '';

      const glowClass = quantum_.energy > 0.8
        ? 'quantum-glow'
        : '';

      const phaseClass = `rotate-${Math.floor((quantum_.phase / (Math.PI * 2)) * 360)}`;

      return `${intensityClass} ${glowClass} ${phaseClass}`.trim();
    }, [quantum_.state, quantum_.energy, quantum_.phase]);

    // Handle quantum interactions
    const handleInteraction = React.useCallback((type: 'press' | 'release' | 'hover' | 'focus' | 'blur') => {
      quantum_.emitInteraction(type);
    }, [quantum_]);

    // Merge refs
    const buttonRef = React.useCallback(
      (element: HTMLButtonElement | null) => {
        // Forward the ref
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
        // Set quantum ref
        quantum_.ref(element);
      },
      [ref, quantum_]
    );

    return (
      <button
        ref={buttonRef}
        className={`${buttonVariants({ variant, size, className })} ${dynamicClasses}`}
        onMouseDown={() => handleInteraction('press')}
        onMouseUp={() => handleInteraction('release')}
        onMouseEnter={() => handleInteraction('hover')}
        onFocus={() => handleInteraction('focus')}
        onBlur={() => handleInteraction('blur')}
        style={quantum_.cssVariables as React.CSSProperties}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
