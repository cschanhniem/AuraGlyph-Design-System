import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useQuantum } from "../../quantum/use-quantum";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

// Overlay backdrop for the modal
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    quantumEffect?: boolean;
  }
>(({ className, quantumEffect = true, ...props }, ref) => {
  // Quantum effects for the overlay
  const { cssVariables, energy } = useQuantum({
    initialState: { energyLevel: 0.6 },
  });

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        quantumEffect && "quantum-overlay",
        energy > 0.8 && "backdrop-blur-md",
        className
      )}
      style={quantumEffect ? (cssVariables as React.CSSProperties) : undefined}
      {...props}
    />
  );
});
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Modal root component that provides context
const Modal = DialogPrimitive.Root;

// Modal trigger button
const ModalTrigger = DialogPrimitive.Trigger;

// Modal close button
const ModalClose = DialogPrimitive.Close;

// Modal portal for rendering outside the DOM hierarchy
const ModalPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
ModalPortal.displayName = DialogPrimitive.Portal.displayName;

// Modal content component
const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    // Quantum props
    quantum?: boolean;
    variant?: "default" | "glass" | "nebula" | "frost" | "crystal" | "immersive";
    depth?: "shallow" | "medium" | "deep";
    luminance?: "low" | "medium" | "high";
    clarity?: "low" | "medium" | "high";
    hoverEffect?: boolean;
    animate?: boolean;
    quantumId?: string;
    entanglement?: string[];
    size?: "sm" | "md" | "lg" | "xl" | "full" | "auto";
    position?: "center" | "top" | "bottom" | "left" | "right";
    // Content props
    withCloseButton?: boolean;
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
      hoverEffect = true,
      animate = true,
      quantumId,
      entanglement,
      size = "md",
      position = "center",
      // Content props
      withCloseButton = true,
      // Rest
      onPointerDownOutside,
      onInteractOutside,
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
      id: quantumId,
      entanglement,
      initialState: { energyLevel: 0.8 },
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

    // Handle entering and leaving effects
    const handleOpenStateChange = React.useCallback(
      (open: boolean) => {
        if ((quantumProp || variant !== "default")) {
          if (open) {
            emitInteraction("open", 1.0);
            pulse(1.0);
          } else {
            emitInteraction("close", 0.3);
          }
        }
      },
      [quantumProp, variant, emitInteraction, pulse]
    );

    // React to outside clicks
    const handleInteractOutside = React.useCallback(
      (e: React.PointerEvent) => {
        if ((quantumProp || variant !== "default")) {
          emitInteraction("backdrop", 0.5);
        }
        onInteractOutside?.(e);
      },
      [quantumProp, variant, emitInteraction, onInteractOutside]
    );

    // Determine quantum classes based on variant
    const getQuantumClass = () => {
      switch (variant) {
        case "glass":
          return "quantum-glass";
        case "nebula":
          return "quantum-nebula";
        case "frost":
          return "quantum-frost";
        case "crystal":
          return "quantum-crystal";
        case "immersive":
          return "quantum-immersive";
        default:
          return quantumProp ? "quantum-glass" : "";
      }
    };

    // Determine size class
    const getSizeClass = () => {
      switch (size) {
        case "sm": return "max-w-sm";
        case "md": return "max-w-md";
        case "lg": return "max-w-lg";
        case "xl": return "max-w-xl";
        case "full": return "max-w-[95vw] max-h-[95vh]";
        case "auto": return "";
        default: return "max-w-md";
      }
    };

    // Determine position class
    const getPositionClass = () => {
      switch (position) {
        case "top": return "items-start mt-16";
        case "bottom": return "items-end mb-16";
        case "left": return "justify-start ml-16";
        case "right": return "justify-end mr-16";
        default: return "items-center justify-center";
      }
    };

    // Determine depth class
    const getDepthClass = () => {
      switch (depth) {
        case "shallow":
          return "quantum-depth-1";
        case "medium":
          return "quantum-depth-2";
        case "deep":
          return "quantum-depth-3";
        default:
          return "";
      }
    };

    // Determine luminance class
    const getLuminanceClass = () => {
      if (!luminance) return "";
      switch (luminance) {
        case "low":
          return "quantum-luminance-low";
        case "medium":
          return "quantum-luminance-medium";
        case "high":
          return "quantum-luminance-high";
        default:
          return "";
      }
    };

    // Determine clarity class
    const getClarityClass = () => {
      if (!clarity) return "";
      switch (clarity) {
        case "low":
          return "quantum-clarity-low";
        case "medium":
          return "quantum-clarity-medium";
        case "high":
          return "quantum-clarity-high";
        default:
          return "";
      }
    };

    // Set up quantum animation class
    const quantumAnimationClass =
      animate && (quantumProp || variant !== "default")
        ? energy > 0.7
          ? "animate-quantum-pulse"
          : "animate-quantum-breathe"
        : "";

    // CSS styles including quantum variables if needed
    const style =
      quantumProp || variant !== "default"
        ? ({
            ...cssVariables,
            ...(props.style || {}),
          } as React.CSSProperties)
        : props.style;

    return (
      <DialogPrimitive.Portal>
        <ModalOverlay 
          quantumEffect={quantumProp || variant !== "default"} 
          className={getPositionClass()}
        />
        <DialogPrimitive.Content
          ref={combinedRef}
          onOpenAutoFocus={(e) => {
            handleOpenStateChange(true);
            props.onOpenAutoFocus?.(e);
          }}
          onCloseAutoFocus={(e) => {
            handleOpenStateChange(false);
            props.onCloseAutoFocus?.(e);
          }}
          onEscapeKeyDown={(e) => {
            emitInteraction("escape", 0.5);
            props.onEscapeKeyDown?.(e);
          }}
          onPointerDownOutside={(e) => {
            onPointerDownOutside?.(e);
          }}
          onInteractOutside={handleInteractOutside}
          className={cn(
            "fixed z-50 bg-background shadow-lg border",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]",
            "duration-200 w-full p-6 rounded-lg",
            getSizeClass(),
            getQuantumClass(),
            getDepthClass(),
            getLuminanceClass(),
            getClarityClass(),
            variant === "immersive" && "border-0 bg-opacity-20 backdrop-blur-xl",
            quantumAnimationClass,
            className
          )}
          style={style}
          {...props}
        >
          {children}
          {withCloseButton && (
            <DialogPrimitive.Close
              className={cn(
                "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background",
                "transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              )}
              onClick={() => emitInteraction("closeButton", 0.5)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);
ModalContent.displayName = DialogPrimitive.Content.displayName;

// Modal header component
const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

// Modal footer component
const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

// Modal title component
const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

// Modal description component
const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalPortal,
};