import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  depth?: "shallow" | "medium" | "deep";
  luminance?: "low" | "medium" | "high";
  clarity?: "low" | "medium" | "high";
  quantumId?: string;
  entanglement?: string[];
  animate?: boolean;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      depth = "medium",
      luminance = "medium",
      clarity = "medium",
      quantumId,
      entanglement,
      animate = true,
      // Regular props
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    // Connect to quantum system
    const { 
      ref: quantumRef, 
      cssVariables, 
      emitInteraction, 
      energy 
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: { energyLevel: 0.6 },
    });

    // Combine refs
    const combinedRef = React.useCallback(
      (element: HTMLSpanElement | null) => {
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
    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        if ((quantumProp || variant !== "default")) {
          emitInteraction("hover", 0.8);
        }
        onMouseEnter?.(e);
      },
      [quantumProp, variant, emitInteraction, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        if ((quantumProp || variant !== "default")) {
          emitInteraction("hoverEnd", 0.6);
        }
        onMouseLeave?.(e);
      },
      [quantumProp, variant, emitInteraction, onMouseLeave]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant classes
    const getQuantumClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (variant) {
        case "quantum": return "quantum-avatar";
        case "frost": return "quantum-avatar-frost";
        case "nebula": return "quantum-avatar-nebula";
        case "crystal": return "quantum-avatar-crystal";
        default: return "quantum-avatar";
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

    // Set up quantum animation class
    const quantumAnimationClass = animate && isQuantumVariant 
      ? energy > 0.7 
        ? "animate-quantum-pulse" 
        : "animate-quantum-breathe" 
      : "";

    // CSS styles including quantum variables if needed
    const style = isQuantumVariant 
      ? { ...cssVariables as React.CSSProperties } 
      : undefined;

    return (
      <AvatarPrimitive.Root
        ref={combinedRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          getQuantumClass(),
          getDepthClass(),
          getLuminanceClass(),
          getClarityClass(),
          quantumAnimationClass,
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    // Quantum props
    quantum?: boolean;
    variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  }
>(
  (
    { 
      className, 
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      ...props 
    }, 
    ref
  ) => {
    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant class for fallback
    const getQuantumFallbackClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (variant) {
        case "quantum": return "quantum-avatar-fallback";
        case "frost": return "quantum-avatar-fallback-frost";
        case "nebula": return "quantum-avatar-fallback-nebula";
        case "crystal": return "quantum-avatar-fallback-crystal";
        default: return "quantum-avatar-fallback";
      }
    };

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          getQuantumFallbackClass(),
          className
        )}
        {...props}
      />
    );
  }
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };