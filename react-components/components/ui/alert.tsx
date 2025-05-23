import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-green-500/50 text-green-700 dark:text-green-400 dark:border-green-400/30 [&>svg]:text-green-500",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 dark:border-yellow-400/30 [&>svg]:text-yellow-500",
        info:
          "border-blue-500/50 text-blue-700 dark:text-blue-400 dark:border-blue-400/30 [&>svg]:text-blue-500",
        // Quantum variants
        quantum: "quantum-glass bg-opacity-10 backdrop-blur-md border border-white/10 shadow-quantum transition-all duration-300",
        "quantum-frost": "quantum-frost text-foreground shadow-quantum",
        "quantum-nebula": "quantum-nebula text-white shadow-quantum-glow",
        "quantum-crystal": "quantum-crystal text-foreground shadow-quantum-lg",
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
      quantum: false,
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  // Quantum specific props
  quantumId?: string;
  entanglement?: string[];
  animate?: boolean;
  severity?: "info" | "warning" | "error" | "success";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      severity,
      children,
      // Quantum props
      quantumId,
      entanglement,
      depth,
      luminance,
      clarity,
      quantum: quantumProp,
      animate = true,
      // Regular props
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    // Determine variant based on severity if provided
    const finalVariant = severity
      ? severity === "error"
        ? "destructive"
        : severity
      : variant;

    // Connect to quantum system if quantum prop is true
    const {
      ref: quantumRef,
      cssVariables,
      emitInteraction,
      energy
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: {
        energy: severity === "error" || severity === "warning" ? 0.9 : 0.7
      },
      onInteraction: (state) => {
        // Optional callback for interaction state changes
      },
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
        if (quantumProp) {
          quantumRef(element);
        }
      },
      [ref, quantumRef, quantumProp]
    );

    // Event handlers with quantum effects
    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (quantumProp) {
          emitInteraction("hover", 0.8);
        }
        onMouseEnter?.(e);
      },
      [quantumProp, emitInteraction, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (quantumProp) {
          emitInteraction("hoverEnd", severity === "error" || severity === "warning" ? 0.9 : 0.7);
        }
        onMouseLeave?.(e);
      },
      [quantumProp, severity, emitInteraction, onMouseLeave]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant?.toString().startsWith("quantum") || quantumProp;

    // Set up quantum animation class
    const quantumAnimationClass = animate && isQuantumVariant
      ? (severity === "error" || severity === "warning")
        ? "animate-quantum-pulse-fast"
        : energy > 0.7
          ? "animate-quantum-pulse"
          : "animate-quantum-breathe"
      : "";

    // CSS styles including quantum variables if needed
    const style = isQuantumVariant
      ? { ...cssVariables as React.CSSProperties }
      : undefined;

    return (
      <div
        ref={combinedRef}
        role="alert"
        className={cn(
          alertVariants({
            variant: finalVariant,
            depth,
            luminance,
            clarity,
            quantum: quantumProp
          }),
          quantumAnimationClass,
          className
        )}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };