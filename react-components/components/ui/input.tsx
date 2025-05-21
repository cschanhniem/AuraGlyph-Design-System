import * as React from 'react';
import { useQuantum } from '../../quantum/use-quantum';
import type { QuantumProps } from '../../quantum/types';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    QuantumProps {
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      wrapperClassName,
      quantum = true,
      quantumId,
      entanglement,
      adaptivityLevel,
      emotionalSensitivity,
      animate = true,
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

      const focusClass = quantum_.energy > 0.7 
        ? 'ring-2 ring-ring/50'
        : quantum_.energy > 0.3 
          ? 'ring-1 ring-ring/30'
          : '';

      const glowClass = quantum_.energy > 0.8
        ? 'quantum-glow'
        : '';

      const scaleClass = quantum_.energy > 0.5
        ? 'scale-[1.02]'
        : '';

      return `${focusClass} ${glowClass} ${scaleClass}`.trim();
    }, [quantum_.state, quantum_.energy]);

    // Handle quantum interactions
    const handleInteraction = React.useCallback((type: 'focus' | 'blur' | 'change') => {
      quantum_.emitInteraction(type);
    }, [quantum_]);

    // Merge refs
    const inputRef = React.useCallback(
      (element: HTMLInputElement | null) => {
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

    const baseClasses = 
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

    return (
      <div className={`relative ${wrapperClassName || ''}`}>
        <input
          type={type}
          className={`${baseClasses} ${className} ${dynamicClasses}`.trim()}
          ref={inputRef}
          onFocus={() => handleInteraction('focus')}
          onBlur={() => handleInteraction('blur')}
          onChange={e => {
            handleInteraction('change');
            props.onChange?.(e);
          }}
          style={quantum_.cssVariables as React.CSSProperties}
          {...props}
        />
        {quantum_.energy > 0.5 && (
          <div 
            className="absolute inset-0 -z-10 rounded-md opacity-20 blur-md"
            style={{
              background: `hsl(${(quantum_.phase / (Math.PI * 2)) * 360}, 100%, 50%)`,
              transform: `scale(${1 + quantum_.energy * 0.1})`,
            }}
          />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
