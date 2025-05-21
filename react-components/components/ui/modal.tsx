import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useQuantum } from '../../quantum/use-quantum';
import type { QuantumProps } from '../../quantum/types';

interface ModalProps extends DialogPrimitive.DialogProps, QuantumProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Modal = ({
  children,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  className = '',
  contentClassName = '',
  quantum = true,
  quantumId,
  entanglement,
  adaptivityLevel,
  emotionalSensitivity,
  animate = true,
  ...props
}: ModalProps) => {
  const quantum_ = useQuantum({
    quantum,
    quantumId,
    entanglement,
    adaptivityLevel,
    emotionalSensitivity,
    animate,
  });

  // Compute dynamic classes based on quantum state
  const dynamicClasses = React.useMemo(() => {
    if (!quantum_.state) return '';

    const opacityClass = `opacity-${Math.floor(quantum_.energy * 100)}`;
    const scaleClass = quantum_.energy > 0.5 ? 'scale-105' : '';
    const rotateClass = `rotate-${Math.floor((quantum_.phase / (Math.PI * 2)) * 360)}`;

    return `${opacityClass} ${scaleClass} ${rotateClass}`.trim();
  }, [quantum_.state, quantum_.energy, quantum_.phase]);

  // Handle quantum interactions
  const handleInteraction = React.useCallback((type: 'open' | 'close') => {
    quantum_.emitInteraction(type);
  }, [quantum_]);

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={value => {
        handleInteraction(value ? 'open' : 'close');
        onOpenChange?.(value);
      }}
      {...props}
    >
      {trigger && (
        <DialogPrimitive.Trigger className={className}>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          style={quantum_.cssVariables as React.CSSProperties}
        />
        <DialogPrimitive.Content
          ref={quantum_.ref}
          className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ${contentClassName} ${dynamicClasses}`}
          style={quantum_.cssVariables as React.CSSProperties}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

Modal.displayName = 'Modal';

export { Modal };
export type { ModalProps };
