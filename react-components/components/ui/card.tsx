import * as React from "react"
import { useQuantum } from "../../quantum/use-quantum"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    // Quantum props
    quantum?: boolean
    variant?: "default" | "glass" | "nebula" | "frost" | "crystal"
    depth?: "shallow" | "medium" | "deep"
    luminance?: "low" | "medium" | "high"
    clarity?: "low" | "medium" | "high"
    hoverEffect?: boolean
    animate?: boolean
    quantumId?: string
    entanglement?: string[]
  }
>(({
  className,
  // Quantum props
  quantum: quantumProp = false,
  variant = "default",
  depth,
  luminance, 
  clarity,
  hoverEffect = true,
  animate = true,
  quantumId,
  entanglement,
  // Regular props
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
  ...props
}, ref) => {
  // Connect to quantum system if enabled
  const { 
    ref: quantumRef, 
    cssVariables, 
    emitInteraction, 
    energy 
  } = useQuantum({
    id: quantumId,
    entanglement,
  });

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
      if (quantumProp || variant !== 'default') {
        quantumRef(element);
      }
    },
    [ref, quantumRef, quantumProp, variant]
  );

  // Event handlers with quantum effects
  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((quantumProp || variant !== 'default') && hoverEffect) {
        emitInteraction("hover", 0.7);
      }
      onMouseEnter?.(e);
    },
    [quantumProp, variant, hoverEffect, emitInteraction, onMouseEnter]
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((quantumProp || variant !== 'default') && hoverEffect) {
        emitInteraction("hoverEnd", 0.5);
      }
      onMouseLeave?.(e);
    },
    [quantumProp, variant, hoverEffect, emitInteraction, onMouseLeave]
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (quantumProp || variant !== 'default') {
        emitInteraction("click", 0.8);
      }
      onClick?.(e);
    },
    [quantumProp, variant, emitInteraction, onClick]
  );

  // Determine quantum classes based on variant
  const getQuantumClass = () => {
    switch (variant) {
      case "glass": return "quantum-glass";
      case "nebula": return "quantum-nebula";
      case "frost": return "quantum-frost";
      case "crystal": return "quantum-crystal";
      default: return quantumProp ? "quantum-glass" : "";
    }
  };

  // Determine depth class
  const getDepthClass = () => {
    if (!depth) return "";
    switch (depth) {
      case "shallow": return "quantum-depth-1";
      case "medium": return "quantum-depth-2";
      case "deep": return "quantum-depth-3";
      default: return "";
    }
  };

  // Determine luminance class
  const getLuminanceClass = () => {
    if (!luminance) return "";
    switch (luminance) {
      case "low": return "quantum-luminance-low";
      case "medium": return "quantum-luminance-medium";
      case "high": return "quantum-luminance-high";
      default: return "";
    }
  };

  // Determine clarity class
  const getClarityClass = () => {
    if (!clarity) return "";
    switch (clarity) {
      case "low": return "quantum-clarity-low";
      case "medium": return "quantum-clarity-medium";
      case "high": return "quantum-clarity-high";
      default: return "";
    }
  };

  // Set up quantum animation class
  const quantumAnimationClass = animate && (quantumProp || variant !== 'default')
    ? energy > 0.7 
      ? "animate-quantum-pulse" 
      : "animate-quantum-breathe" 
    : "";

  // CSS styles including quantum variables if needed
  const style = (quantumProp || variant !== 'default')
    ? { ...cssVariables as React.CSSProperties } 
    : undefined;

  return (
    <div
      ref={combinedRef}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        getQuantumClass(),
        getDepthClass(),
        getLuminanceClass(),
        getClarityClass(),
        quantumAnimationClass,
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }