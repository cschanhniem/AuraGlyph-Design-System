import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  depth?: "shallow" | "medium" | "deep";
  luminance?: "low" | "medium" | "high";
  clarity?: "low" | "medium" | "high";
  quantumId?: string;
  entanglement?: string[];
  animate?: boolean;
  // Progress specific props
  buffer?: number;
  type?: "linear" | "circular" | "dots";
  size?: "sm" | "md" | "lg";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      buffer,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      depth = "medium",
      luminance = "medium",
      clarity = "medium",
      quantumId,
      entanglement,
      animate = true,
      // Progress-specific props
      type = "linear",
      size = "md",
      ...props
    },
    ref
  ) => {
    // Connect to quantum system
    const { 
      ref: quantumRef, 
      cssVariables, 
      energy,
      phase,
      setEnergy
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: { 
        energyLevel: typeof value === 'number' ? Math.min(value / 100, 1) : 0.2,
        phase: 0.2
      },
    });

    // Update quantum energy when value changes
    React.useEffect(() => {
      if (typeof value === 'number' && (quantumProp || variant !== "default")) {
        setEnergy(Math.min(value / 100, 1));
      }
    }, [value, quantumProp, variant, setEnergy]);

    // Combine refs
    const combinedRef = React.useCallback(
      (element: HTMLDivElement | null) => {
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

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant classes
    const getQuantumClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (variant) {
        case "quantum": return "quantum-progress";
        case "frost": return "quantum-progress-frost";
        case "nebula": return "quantum-progress-nebula";
        case "crystal": return "quantum-progress-crystal";
        default: return "quantum-progress";
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

    // Determine size class
    const getSizeClass = () => {
      switch (size) {
        case "sm": return "h-2";
        case "md": return "h-4";
        case "lg": return "h-6";
        default: return "h-4";
      }
    };

    // Set up quantum animation class
    const quantumAnimationClass = animate && isQuantumVariant 
      ? (value === 100)
        ? "animate-quantum-complete" 
        : (value !== undefined && value > 0) 
          ? "animate-quantum-progress" 
          : "animate-quantum-pulse-slow" 
      : "";

    // CSS styles including quantum variables if needed
    const style = isQuantumVariant 
      ? { ...cssVariables as React.CSSProperties } 
      : undefined;

    // Render different progress types
    if (type === "circular") {
      return (
        <div 
          ref={combinedRef}
          className={cn(
            "relative flex items-center justify-center",
            isQuantumVariant && "quantum-progress-circular",
            getQuantumClass(),
            getDepthClass(),
            getLuminanceClass(),
            getClarityClass(),
            quantumAnimationClass,
            className
          )}
          style={style}
          {...props}
        >
          <svg 
            className={cn(
              "transform -rotate-90",
              size === "sm" && "w-12 h-12",
              size === "md" && "w-16 h-16",
              size === "lg" && "w-24 h-24"
            )} 
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              className="text-muted-foreground stroke-current opacity-20"
              cx="50"
              cy="50"
              r="40"
              strokeWidth="8"
              fill="none"
            />
            {/* Buffer circle (if specified) */}
            {buffer !== undefined && (
              <circle
                className="text-primary stroke-current opacity-40"
                cx="50"
                cy="50"
                r="40"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - buffer / 100)}`}
              />
            )}
            {/* Main progress circle */}
            <circle
              className={cn(
                "text-primary stroke-current",
                isQuantumVariant && "quantum-progress-circle"
              )}
              cx="50"
              cy="50"
              r="40"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - (value || 0) / 100)}`}
            />
          </svg>
          {isQuantumVariant && (
            <div 
              className="absolute inset-0 quantum-progress-glow" 
              style={{ 
                opacity: Math.min(energy * 0.4, 0.2),
                transform: `scale(${1 + energy * 0.1})`,
              }}
            />
          )}
          <div className="absolute text-center text-sm font-medium">
            {value !== undefined ? `${Math.round(value)}%` : ''}
          </div>
        </div>
      );
    }

    if (type === "dots") {
      const numberOfDots = 5;
      const dots = Array.from({ length: numberOfDots }).map((_, i) => {
        const isActive = value !== undefined ? (i + 1) <= Math.floor(value / (100 / numberOfDots)) : false;
        return (
          <div 
            key={i}
            className={cn(
              "rounded-full transition-all",
              isActive ? "bg-primary" : "bg-muted",
              size === "sm" && "h-2 w-2",
              size === "md" && "h-3 w-3",
              size === "lg" && "h-4 w-4",
              isQuantumVariant && isActive && "quantum-progress-dot"
            )}
            style={isActive && isQuantumVariant ? {
              boxShadow: `0 0 ${energy * 8}px ${energy * 4}px rgba(var(--quantum-glow-color), ${energy * 0.3})`,
            } : undefined}
          />
        );
      });

      return (
        <div 
          ref={combinedRef}
          className={cn(
            "flex items-center justify-between",
            getQuantumClass(),
            getDepthClass(),
            getLuminanceClass(),
            getClarityClass(),
            className
          )}
          style={style}
          {...props}
        >
          {dots}
        </div>
      );
    }

    // Default: linear progress
    return (
      <ProgressPrimitive.Root
        ref={combinedRef}
        className={cn(
          "relative overflow-hidden rounded-full bg-secondary",
          getSizeClass(),
          getQuantumClass(),
          getDepthClass(),
          getLuminanceClass(),
          getClarityClass(),
          quantumAnimationClass,
          className
        )}
        style={style}
        {...props}
      >
        {/* Buffer indicator (if specified) */}
        {buffer !== undefined && (
          <div
            className="h-full w-full flex-1 bg-primary/40 transition-all"
            style={{ transform: `translateX(-${100 - (buffer || 0)}%)` }}
          />
        )}
        
        {/* Main progress indicator */}
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 bg-primary transition-all",
            isQuantumVariant && "quantum-progress-indicator"
          )}
          style={{ 
            transform: `translateX(-${100 - (value || 0)}%)`,
            ...(isQuantumVariant ? {
              boxShadow: `0 0 ${energy * 10}px ${energy * 3}px rgba(var(--quantum-glow-color), ${energy * 0.2})`,
            } : {})
          }}
        >
          {isQuantumVariant && animate && (
            <div className="absolute inset-0 quantum-progress-shimmer" />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };