import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useQuantum } from "../../quantum/use-quantum";

// Button variant definitions
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Quantum variants
        quantum: "quantum-glass bg-opacity-10 backdrop-blur-md border border-white/10 shadow-quantum transition-all duration-300",
        "quantum-nebula": "quantum-nebula text-white shadow-quantum-glow",
        "quantum-frost": "quantum-frost text-foreground shadow-quantum",
        "quantum-crystal": "quantum-crystal text-foreground shadow-quantum-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      // Quantum specific props
      depth: {
        shallow: "quantum-depth-1",
        medium: "quantum-depth-2",
        deep: "quantum-depth-3",
      },
      luminance: {
        low: "quantum-luminance-low",
        medium: "quantum-luminance-medium",
        high: "quantum-luminance-high",
      },
      clarity: {
        low: "quantum-clarity-low",
        medium: "quantum-clarity-medium",
        high: "quantum-clarity-high",
      },
      quantum: {
        // Whether to apply quantum effects
        true: "transform-gpu quantum-phase-shift",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      quantum: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // Quantum specific props
  quantumId?: string;
  entanglement?: string[];
  ripple?: boolean;
  hoverEffect?: boolean;
  animate?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      // Quantum props
      quantumId,
      entanglement,
      depth,
      luminance,
      clarity,
      quantum: quantumProp,
      ripple = true,
      hoverEffect = true,
      animate = true,
      // Regular props
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      ...props
    },
    ref
  ) => {
    // Connect to quantum system if quantum prop is true
    const { 
      ref: quantumRef, 
      cssVariables, 
      emitInteraction, 
      pulse, 
      energy 
    } = useQuantum({
      id: quantumId,
      entanglement,
      onInteraction: () => {
        // Optional callback for interaction state changes
      },
    });

    // Combine refs
    const combinedRef = React.useCallback(
      (element: HTMLButtonElement | null) => {
        // Update the forwarded ref
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }

        // Update quantum ref if quantum effects are enabled
        if (quantumProp) {
          quantumRef(element);
        }
      },
      [ref, quantumRef, quantumProp]
    );

    // Event handlers with quantum effects
    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (quantumProp && hoverEffect) {
          emitInteraction("hover", 0.8);
        }
        onMouseEnter?.(e);
      },
      [quantumProp, hoverEffect, emitInteraction, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (quantumProp && hoverEffect) {
          emitInteraction("hoverEnd", 0.5);
        }
        onMouseLeave?.(e);
      },
      [quantumProp, hoverEffect, emitInteraction, onMouseLeave]
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        if (quantumProp) {
          emitInteraction("focus", 0.7);
        }
        onFocus?.(e);
      },
      [quantumProp, emitInteraction, onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        if (quantumProp) {
          emitInteraction("blur", 0.5);
        }
        onBlur?.(e);
      },
      [quantumProp, emitInteraction, onBlur]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (quantumProp && ripple) {
          pulse(1.0);
          emitInteraction("click", 1.0);
        }
        onClick?.(e);
      },
      [quantumProp, ripple, pulse, emitInteraction, onClick]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant?.toString().startsWith("quantum");
    const useQuantumEffects = quantumProp || isQuantumVariant;

    // Set up quantum animation class
    const quantumAnimationClass = animate && useQuantumEffects 
      ? energy > 0.7 
        ? "animate-quantum-pulse" 
        : "animate-quantum-breathe" 
      : "";

    // Use the polymorphic component pattern
    const Comp = asChild ? Slot : "button";

    // CSS styles including quantum variables if needed
    const style = useQuantumEffects 
      ? { ...cssVariables as React.CSSProperties } 
      : undefined;

    return (
      <Comp
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            depth, 
            luminance, 
            clarity, 
            quantum: quantumProp 
          }),
          quantumAnimationClass,
          className
        )}
        ref={combinedRef}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
