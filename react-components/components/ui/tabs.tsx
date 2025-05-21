import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  quantumId?: string;
  entanglement?: string[];
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      className,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      quantumId,
      entanglement,
      // Other props
      defaultValue,
      value,
      onValueChange,
      ...props
    },
    ref
  ) => {
    // Connect to quantum system
    const {
      emitInteraction,
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: { energyLevel: 0.5 },
    });

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    return (
      <TabsPrimitive.Root
        ref={ref}
        className={cn(
          isQuantumVariant && "quantum-tabs",
          className
        )}
        defaultValue={defaultValue}
        value={value}
        onValueChange={(value) => {
          if (isQuantumVariant) {
            emitInteraction("tabs-change", 0.7);
          }
          onValueChange?.(value);
        }}
        {...props}
      />
    );
  }
);
Tabs.displayName = TabsPrimitive.Root.displayName;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
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

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
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
      ...props
    },
    ref
  ) => {
    // Connect to quantum system
    const {
      ref: quantumRef,
      cssVariables,
      energy
    } = useQuantum({
      id: quantumId || `quantum-tabs-list-${React.useId()}`,
      entanglement,
      initialState: { energyLevel: 0.6 },
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
        if (quantumProp || variant !== "default") {
          quantumRef(element);
        }
      },
      [ref, quantumRef, quantumProp, variant]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant classes
    const getQuantumVariantClass = () => {
      if (!isQuantumVariant) return "";
      
      switch (variant) {
        case "quantum": return "quantum-tabs-list";
        case "frost": return "quantum-tabs-list-frost";
        case "nebula": return "quantum-tabs-list-nebula";
        case "crystal": return "quantum-tabs-list-crystal";
        default: return "quantum-tabs-list";
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
      <TabsPrimitive.List
        ref={combinedRef}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          getQuantumVariantClass(),
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
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  quantumId?: string;
  entanglement?: string[];
  animate?: boolean;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(
  (
    {
      className,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      quantumId,
      entanglement,
      animate = true,
      // Regular props
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onClick,
      ...props
    },
    ref
  ) => {
    // Connect to quantum system
    const { 
      ref: quantumRef, 
      cssVariables, 
      emitInteraction, 
      energy,
      pulse
    } = useQuantum({
      id: quantumId || `quantum-tab-trigger-${React.useId()}`,
      entanglement,
      initialState: { energyLevel: 0.5 },
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
        if (quantumProp || variant !== "default") {
          quantumRef(element);
        }
      },
      [ref, quantumRef, quantumProp, variant]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Event handlers with quantum effects
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        if (isQuantumVariant) {
          emitInteraction("focus", 0.7);
        }
        onFocus?.(e);
      },
      [isQuantumVariant, emitInteraction, onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        if (isQuantumVariant) {
          emitInteraction("blur", 0.5);
        }
        onBlur?.(e);
      },
      [isQuantumVariant, emitInteraction, onBlur]
    );

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isQuantumVariant) {
          emitInteraction("hover", 0.6);
        }
        onMouseEnter?.(e);
      },
      [isQuantumVariant, emitInteraction, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isQuantumVariant) {
          emitInteraction("hoverEnd", 0.5);
        }
        onMouseLeave?.(e);
      },
      [isQuantumVariant, emitInteraction, onMouseLeave]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isQuantumVariant) {
          emitInteraction("click", 0.9);
          pulse(0.9);
        }
        onClick?.(e);
      },
      [isQuantumVariant, emitInteraction, pulse, onClick]
    );

    // Determine quantum variant class
    const getQuantumTriggerClass = () => {
      if (!isQuantumVariant) return "";
      return `quantum-tabs-trigger${variant !== "quantum" ? `-${variant}` : ""}`;
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
      <TabsPrimitive.Trigger
        ref={combinedRef}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          getQuantumTriggerClass(),
          isQuantumVariant && "data-[state=active]:quantum-tabs-trigger-active",
          quantumAnimationClass,
          className
        )}
        style={style}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  // Quantum props
  quantum?: boolean;
  variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
  quantumId?: string;
  entanglement?: string[];
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(
  (
    {
      className,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      quantumId,
      entanglement,
      ...props
    },
    ref
  ) => {
    // Connect to quantum system
    const { 
      ref: quantumRef, 
      cssVariables 
    } = useQuantum({
      id: quantumId || `quantum-tab-content-${React.useId()}`,
      entanglement,
      initialState: { energyLevel: 0.5 },
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
        if (quantumProp || variant !== "default") {
          quantumRef(element);
        }
      },
      [ref, quantumRef, quantumProp, variant]
    );

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant class
    const getQuantumContentClass = () => {
      if (!isQuantumVariant) return "";
      return `quantum-tabs-content${variant !== "quantum" ? `-${variant}` : ""}`;
    };

    // CSS styles including quantum variables if needed
    const style = isQuantumVariant 
      ? { ...cssVariables as React.CSSProperties } 
      : undefined;

    return (
      <TabsPrimitive.Content
        ref={combinedRef}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "data-[state=inactive]:animate-quantum-fade-out data-[state=active]:animate-quantum-fade-in",
          getQuantumContentClass(),
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };