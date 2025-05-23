import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
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

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps & React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(
  (
    {
      className,
      children,
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      depth = "medium",
      luminance = "medium",
      clarity = "medium",
      quantumId,
      entanglement,
      animate = true,
      // Other props
      ...props
    },
    ref
  ) => {
    // Extract Radix Select props
    const {
      value,
      defaultValue,
      onValueChange,
      open,
      defaultOpen,
      onOpenChange,
      disabled,
      required,
      ...restProps
    } = props;

    // Connect to quantum system
    const {
      ref: quantumRef,
      cssVariables,
      emitInteraction,
      energy,
      pulse,
    } = useQuantum({
      id: quantumId,
      entanglement,
      initialState: { energy: 0.5 },
    });

    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Handle open/close events
    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        if (isQuantumVariant) {
          emitInteraction(open ? "open" : "close", open ? 0.8 : 0.5);
          if (open) pulse(0.9);
        }
        onOpenChange?.(open);
      },
      [isQuantumVariant, emitInteraction, pulse, onOpenChange]
    );

    return (
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(value) => {
          if (isQuantumVariant) {
            emitInteraction("select", 0.7);
          }
          onValueChange?.(value);
        }}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        disabled={disabled}
        required={required}
      >
        {children}
      </SelectPrimitive.Root>
    );
  }
);

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
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
>(
  (
    {
      className,
      children,
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
      onFocus,
      onBlur,
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
      energy,
      pulse,
    } = useQuantum({
      id: quantumId || `quantum-select-${React.useId()}`,
      entanglement,
      initialState: { energy: 0.5 },
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

    // Determine quantum variant classes
    const getQuantumVariantClass = () => {
      if (!isQuantumVariant) return "";

      switch (variant) {
        case "quantum": return "quantum-select";
        case "frost": return "quantum-select-frost";
        case "nebula": return "quantum-select-nebula";
        case "crystal": return "quantum-select-crystal";
        default: return "quantum-select";
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

    // Style with quantum variables if using quantum effects
    const style = isQuantumVariant
      ? { ...cssVariables as React.CSSProperties }
      : undefined;

    return (
      <SelectPrimitive.Trigger
        ref={combinedRef}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          getQuantumVariantClass(),
          getDepthClass(),
          getLuminanceClass(),
          getClarityClass(),
          quantumAnimationClass,
          className
        )}
        style={style}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    // Quantum props
    quantum?: boolean;
    variant?: "default" | "quantum" | "frost" | "nebula" | "crystal";
    depth?: "shallow" | "medium" | "deep";
    clarity?: "low" | "medium" | "high";
  }
>(
  (
    {
      className,
      children,
      position = "popper",
      // Quantum props
      quantum: quantumProp = false,
      variant = "default",
      depth = "medium",
      clarity = "medium",
      ...props
    },
    ref
  ) => {
    // Determine if we're using quantum styles
    const isQuantumVariant = variant !== "default" || quantumProp;

    // Determine quantum variant classes
    const getQuantumContentClass = () => {
      if (!isQuantumVariant) return "";

      switch (variant) {
        case "quantum": return "quantum-select-content";
        case "frost": return "quantum-select-content-frost";
        case "nebula": return "quantum-select-content-nebula";
        case "crystal": return "quantum-select-content-crystal";
        default: return "quantum-select-content";
      }
    };

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            getQuantumContentClass(),
            isQuantumVariant && "backdrop-blur-sm border-white/10",
            className
          )}
          position={position}
          {...props}
        >
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    // Quantum props
    quantum?: boolean;
  }
>(({ className, children, quantum: quantumProp = false, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      quantumProp && "quantum-select-item focus:quantum-select-item-focus",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
};