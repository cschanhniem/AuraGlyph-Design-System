import * as React from "react";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  depth?: "shallow" | "medium" | "deep";
  luminance?: "low" | "medium" | "high";
  clarity?: "low" | "medium" | "high";
  adaptivity?: "low" | "medium" | "high";
  quantumId?: string;
  entanglement?: string[];
  hoverEffect?: boolean;
  focusEffect?: boolean;
  animate?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      depth = "medium",
      luminance = "medium",
      clarity = "medium",
      adaptivity = "medium",
      quantumId,
      entanglement,
      hoverEffect = true,
      focusEffect = true,
      animate = true,
      // Regular props
      onFocus,
      onBlur,
      onChange,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    // Connect to quantum system if quantum prop is true
    const { 
      ref: quantumRef, 
      cssVariables, 
      emitInteraction, 
      energy, 
      phase,
      containerRef 
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: { energyLevel: 0.3, phase: 0.2 },
      onInteraction: (state) => {
        // Optional callback for interaction state changes
      },
    });

    // Local state
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    // Container for the enhanced input
    const inputContainerRef = containerRef;

    // Combine refs
    const combinedRef = React.useCallback(
      (element: HTMLInputElement | null) => {
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
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if ((quantumProp || variant !== "default") && focusEffect) {
          emitInteraction("focus", 0.8);
        }
        onFocus?.(e);
      },
      [quantumProp, variant, focusEffect, emitInteraction, onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if ((quantumProp || variant !== "default") && focusEffect) {
          emitInteraction("blur", 0.3);
        }
        onBlur?.(e);
      },
      [quantumProp, variant, focusEffect, emitInteraction, onBlur]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (quantumProp || variant !== "default") {
          // Emit different interaction based on input length/content
          const strength = Math.min(0.3 + e.target.value.length * 0.02, 0.9);
          emitInteraction("input", strength);
        }
        onChange?.(e);
      },
      [quantumProp, variant, emitInteraction, onChange]
    );

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        setIsHovered(true);
        if ((quantumProp || variant !== "default") && hoverEffect) {
          emitInteraction("hover", 0.6);
        }
        onMouseEnter?.(e);
      },
      [quantumProp, variant, hoverEffect, emitInteraction, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        setIsHovered(false);
        if ((quantumProp || variant !== "default") && hoverEffect) {
          emitInteraction("hoverEnd", 0.3);
        }
        onMouseLeave?.(e);
      },
      [quantumProp, variant, hoverEffect, emitInteraction, onMouseLeave]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant classes
    const getQuantumVariantClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (variant) {
        case "quantum": return "quantum-input";
        case "frost": return "quantum-input-frost";
        case "nebula": return "quantum-input-nebula";
        case "crystal": return "quantum-input-crystal";
        default: return "quantum-input";
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

    // Determine adaptivity class
    const getAdaptivityClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (adaptivity) {
        case "low": return "quantum-adaptive-low";
        case "medium": return "quantum-adaptive-medium";
        case "high": return "quantum-adaptive-high";
        default: return "";
      }
    };

    // Set up quantum animation class
    const quantumAnimationClass = animate && isQuantumVariant 
      ? isFocused 
        ? "animate-quantum-active" 
        : energy > 0.6 
          ? "animate-quantum-pulse" 
          : "animate-quantum-breathe" 
      : "";

    // Style with quantum variables if using quantum effects
    const style = isQuantumVariant 
      ? { ...cssVariables as React.CSSProperties } 
      : undefined;

    // Get dynamic border based on state
    const getBorderClass = () => {
      if (!isQuantumVariant) return "border-input";
      
      if (isFocused) return "border-primary/50 ring-1 ring-inset ring-primary/20";
      if (isHovered) return "border-primary/30";
      return "border-input/80";
    };

    return (
      <div 
        ref={inputContainerRef}
        className={cn(
          "relative",
          isQuantumVariant && "quantum-input-container",
          isQuantumVariant && isFocused && "quantum-input-container-focused"
        )}
      >
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            getBorderClass(),
            getQuantumVariantClass(),
            getDepthClass(),
            getLuminanceClass(),
            getClarityClass(),
            getAdaptivityClass(),
            quantumAnimationClass,
            className
          )}
          ref={combinedRef}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={style}
          {...props}
        />
        {isQuantumVariant && (
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none rounded-md",
              "quantum-input-effect",
              isFocused && "quantum-input-effect-focused"
            )}
            style={{
              opacity: Math.min(energy * 0.5, 0.2),
              transform: `translateZ(0) scale(${1 + energy * 0.01})`,
              transition: 'opacity 300ms, transform 300ms'
            }}
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };