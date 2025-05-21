import * as React from "react";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Toggle-specific props
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal" | "glass";
  depth?: "shallow" | "medium" | "deep";
  luminance?: "low" | "medium" | "high";
  clarity?: "low" | "medium" | "high";
  quantumId?: string;
  entanglement?: string[];
  hoverEffect?: boolean;
  animate?: boolean;
  transitionSpeed?: "slow" | "medium" | "fast" | "instant";
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      depth = "medium",
      luminance = "medium",
      clarity = "medium",
      quantumId,
      entanglement,
      hoverEffect = true,
      animate = true,
      transitionSpeed = "medium",
      // Regular props
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Controlled vs uncontrolled state handling
    const [isChecked, setIsChecked] = React.useState(defaultChecked);
    const checkedState = checked !== undefined ? checked : isChecked;

    // Connect to quantum system if quantum props are enabled
    const { 
      ref: quantumRef, 
      cssVariables, 
      emitInteraction, 
      energy, 
      pulse,
      phase
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: { 
        energyLevel: checkedState ? 0.8 : 0.3,
        phase: checkedState ? 0.7 : 0.2
      },
    });

    // Update quantum state when checked state changes externally
    React.useEffect(() => {
      if (checked !== undefined && (quantumProp || variant !== "default")) {
        emitInteraction(checked ? "activate" : "deactivate", checked ? 0.8 : 0.3);
      }
    }, [checked, quantumProp, variant, emitInteraction]);

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
        if (quantumProp || variant !== "default") {
          quantumRef(element);
        }
      },
      [ref, quantumRef, quantumProp, variant]
    );

    // Event handlers with quantum effects
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        // For uncontrolled component
        if (checked === undefined) {
          setIsChecked((prev) => !prev);
        }
        
        // Call onCheckedChange with new value
        const newValue = checked !== undefined ? !checked : !isChecked;
        onCheckedChange?.(newValue);
        
        // Quantum effects
        if (quantumProp || variant !== "default") {
          pulse(newValue ? 1.0 : 0.4);
          emitInteraction(newValue ? "activate" : "deactivate", newValue ? 0.8 : 0.3);
        }
        
        // Original click handler
        onClick?.(e);
      },
      [checked, isChecked, onClick, onCheckedChange, quantumProp, variant, pulse, emitInteraction]
    );

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if ((quantumProp || variant !== "default") && hoverEffect) {
          emitInteraction("hover", checkedState ? 0.9 : 0.6);
        }
        onMouseEnter?.(e);
      },
      [quantumProp, variant, hoverEffect, checkedState, emitInteraction, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if ((quantumProp || variant !== "default") && hoverEffect) {
          emitInteraction("hoverEnd", checkedState ? 0.8 : 0.3);
        }
        onMouseLeave?.(e);
      },
      [quantumProp, variant, hoverEffect, checkedState, emitInteraction, onMouseLeave]
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        if (quantumProp || variant !== "default") {
          emitInteraction("focus", checkedState ? 0.9 : 0.6);
        }
        onFocus?.(e);
      },
      [quantumProp, variant, checkedState, emitInteraction, onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        if (quantumProp || variant !== "default") {
          emitInteraction("blur", checkedState ? 0.8 : 0.3);
        }
        onBlur?.(e);
      },
      [quantumProp, variant, checkedState, emitInteraction, onBlur]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant classes
    const getQuantumVariantClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (variant) {
        case "quantum": return "quantum-toggle";
        case "frost": return "quantum-toggle-frost";
        case "nebula": return "quantum-toggle-nebula";
        case "crystal": return "quantum-toggle-crystal";
        default: return "quantum-toggle";
      }
    };

    // Determine depth class
    const getDepthClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (depth) {
        case "shallow": return "quantum-depth-1";
        case "medium": return "quantum-depth-2";
        case "deep": return "quantum-depth-3";
        default: return "";
      }
    };

    // Determine luminance class
    const getLuminanceClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (luminance) {
        case "low": return "quantum-luminance-low";
        case "medium": return "quantum-luminance-medium";
        case "high": return "quantum-luminance-high";
        default: return "";
      }
    };

    // Determine clarity class
    const getClarityClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (clarity) {
        case "low": return "quantum-clarity-low";
        case "medium": return "quantum-clarity-medium";
        case "high": return "quantum-clarity-high";
        default: return "";
      }
    };

    // Get transition speed class
    const getTransitionSpeedClass = () => {
      switch (transitionSpeed) {
        case "slow": return "transition-quantum-slow";
        case "medium": return "transition-quantum-medium";
        case "fast": return "transition-quantum-fast";
        case "instant": return "";
        default: return "transition-quantum-medium";
      }
    };

    // Set up quantum animation class
    const quantumAnimationClass = animate && isQuantumVariant 
      ? checkedState 
        ? "animate-quantum-active" 
        : energy > 0.6 
          ? "animate-quantum-pulse" 
          : "animate-quantum-breathe" 
      : "";

    // CSS styles including quantum variables if needed
    const style = isQuantumVariant 
      ? { 
          ...cssVariables as React.CSSProperties,
          ...(props.style || {})
        } 
      : props.style;

    return (
      <button
        ref={combinedRef}
        type="button"
        role="switch"
        aria-checked={checkedState}
        data-state={checkedState ? "checked" : "unchecked"}
        className={cn(
          // Base styles
          "inline-flex items-center rounded-full relative",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "h-6 w-11 border-2",
          // Toggle styling
          checkedState 
            ? "border-primary bg-primary justify-end" 
            : "border-input bg-background justify-start",
          // Quantum classes
          getQuantumVariantClass(),
          getDepthClass(),
          getLuminanceClass(),
          getClarityClass(),
          getTransitionSpeedClass(),
          quantumAnimationClass,
          className
        )}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {/* Toggle handle/thumb */}
        <span 
          className={cn(
            "h-4 w-4 rounded-full bg-background",
            "transform transition-transform",
            isQuantumVariant && "quantum-toggle-handle",
            isQuantumVariant && checkedState && "quantum-toggle-handle-active"
          )}
          style={isQuantumVariant ? {
            boxShadow: `0 0 ${energy * 4}px ${energy * 2}px rgba(var(--quantum-accent-rgb), ${energy * 0.4})`,
          } : undefined}
        />

        {/* Quantum effect layer (only for quantum variants) */}
        {isQuantumVariant && (
          <span 
            className={cn(
              "absolute inset-0 rounded-full pointer-events-none",
              "quantum-toggle-effect",
              checkedState && "quantum-toggle-effect-active"
            )}
            style={{
              opacity: Math.min(energy * 0.3, 0.15),
              transform: `scale(${1 + energy * 0.05})`,
            }}
          />
        )}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
