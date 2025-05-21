import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useQuantumContext, QuantumState } from './quantum-provider';

interface QuantumOptions {
  id?: string;
  entanglement?: string[];
  initialState?: Partial<QuantumState>;
  onInteraction?: (state: QuantumState) => void;
  onPhaseChange?: (phase: number) => void;
  onEnergyChange?: (energy: number) => void;
}

interface QuantumResult {
  // State
  id: string;
  phase: number;
  energy: number;
  coherence: number;
  entanglement: string[];
  observability: number;
  
  // Refs
  ref: React.RefCallback<HTMLElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  
  // Actions
  setEnergy: (energy: number) => void;
  setPhase: (phase: number) => void;
  entangleWith: (targetId: string) => void;
  removeEntanglement: (targetId: string) => void;
  pulse: (intensity?: number) => void;
  emitInteraction: (type: string, energy?: number) => void;
  
  // CSS Variables as an object for direct style application
  cssVariables: Record<string, string>;
}

/**
 * Hook to connect a component to the quantum system
 * 
 * @example
 * ```tsx
 * const MyQuantumComponent = () => {
 *   const { ref, phase, energy, cssVariables } = useQuantum({
 *     id: 'my-unique-id',
 *     entanglement: ['other-component-id'],
 *   });
 *   
 *   return (
 *     <div ref={ref} style={cssVariables} className="quantum-glass">
 *       My quantum-enabled component with phase {phase}
 *     </div>
 *   );
 * }
 * ```
 */
export function useQuantum(options: QuantumOptions = {}): QuantumResult {
  // Get quantum context
  const quantumContext = useQuantumContext();
  
  // Generate stable ID if not provided
  const generatedIdRef = useRef<string>(`quantum-${Math.random().toString(36).substring(2, 9)}`);
  const id = options.id || generatedIdRef.current;
  
  // Refs for DOM elements
  const elementRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Local quantum state
  const [localState, setLocalState] = useState({
    phase: options.initialState?.phase ?? Math.random(),
    energy: options.initialState?.energyLevel ?? 0.5,
    coherence: options.initialState?.coherence ?? 1.0,
    entanglement: options.entanglement || [],
    observability: options.initialState?.observability ?? 0.8,
  });
  
  // Handle registration and cleanup
  useEffect(() => {
    // Register this element
    quantumContext.registerElement(id);
    
    // Add initial entanglements
    if (options.entanglement) {
      options.entanglement.forEach(targetId => {
        quantumContext.addEntanglement(id, targetId);
      });
    }
    
    // Cleanup on unmount
    return () => {
      quantumContext.unregisterElement(id);
    };
  }, [id, quantumContext, options.entanglement]);
  
  // Update local phase and energy when context changes
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // We would get these from the registry in the context
      // This is a simplified version
      const globalPhase = quantumContext.state.phase;
      const contextCoherence = quantumContext.state.coherence;
      
      setLocalState(prev => ({
        ...prev,
        phase: globalPhase,
        coherence: contextCoherence
      }));
      
      if (options.onPhaseChange) {
        options.onPhaseChange(globalPhase);
      }
    }, 100);
    
    return () => clearInterval(updateInterval);
  }, [quantumContext.state.phase, quantumContext.state.coherence, options.onPhaseChange]);
  
  // Set energy level
  const setEnergy = useCallback((energy: number) => {
    const boundedEnergy = Math.max(0, Math.min(1, energy));
    setLocalState(prev => ({ ...prev, energy: boundedEnergy }));
    quantumContext.setEnergy(id, boundedEnergy);
    
    if (options.onEnergyChange) {
      options.onEnergyChange(boundedEnergy);
    }
  }, [id, quantumContext, options.onEnergyChange]);
  
  // Set phase
  const setPhase = useCallback((phase: number) => {
    const normalizedPhase = phase % 1;
    setLocalState(prev => ({ ...prev, phase: normalizedPhase }));
    quantumContext.setPhase(id, normalizedPhase);
    
    if (options.onPhaseChange) {
      options.onPhaseChange(normalizedPhase);
    }
  }, [id, quantumContext, options.onPhaseChange]);
  
  // Create entanglement with another component
  const entangleWith = useCallback((targetId: string) => {
    if (targetId === id) return; // Can't entangle with self
    
    quantumContext.addEntanglement(id, targetId);
    setLocalState(prev => ({
      ...prev,
      entanglement: [...prev.entanglement, targetId]
    }));
  }, [id, quantumContext]);
  
  // Remove entanglement
  const removeEntanglement = useCallback((targetId: string) => {
    quantumContext.removeEntanglement(id, targetId);
    setLocalState(prev => ({
      ...prev,
      entanglement: prev.entanglement.filter(tid => tid !== targetId)
    }));
  }, [id, quantumContext]);
  
  // Create energy pulse
  const pulse = useCallback((intensity = 1.0) => {
    setEnergy(intensity);
    
    // Decay energy back to normal after a delay
    setTimeout(() => {
      setEnergy(0.5);
    }, 1000);
  }, [setEnergy]);
  
  // Emit interaction event
  const emitInteraction = useCallback((type: string, energy = 1.0) => {
    const position = elementRef.current ? {
      x: 0.5, // Center by default 
      y: 0.5
    } : undefined;
    
    quantumContext.dispatchInteraction({
      type,
      sourceId: id,
      energy,
      phase: localState.phase,
      position
    });
    
    // Update local state
    setLocalState(prev => ({
      ...prev,
      energy
    }));
    
    if (options.onInteraction) {
      options.onInteraction({
        phase: localState.phase,
        energyLevel: energy,
        coherence: localState.coherence,
        entanglement: localState.entanglement,
        lastInteraction: Date.now(),
        observability: localState.observability
      });
    }
  }, [id, localState, quantumContext, options.onInteraction]);
  
  // Ref callback to capture the element
  const ref = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
    
    if (element) {
      // Apply initial quantum CSS variables
      Object.entries(cssVariables).forEach(([key, value]) => {
        element.style.setProperty(key, value);
      });
    }
  }, []);
  
  // Generate CSS variables object for easy application
  const cssVariables = {
    '--quantum-phase': localState.phase.toString(),
    '--quantum-energy': localState.energy.toString(),
    '--quantum-coherence': localState.coherence.toString(),
    '--quantum-observability': localState.observability.toString(),
  };
  
  return {
    // State
    id,
    phase: localState.phase,
    energy: localState.energy,
    coherence: localState.coherence,
    entanglement: localState.entanglement,
    observability: localState.observability,
    
    // Refs
    ref,
    containerRef,
    canvasRef,
    
    // Actions
    setEnergy,
    setPhase,
    entangleWith,
    removeEntanglement, 
    pulse,
    emitInteraction,
    
    // CSS Variables
    cssVariables,
  };
}

/**
 * Hook to access the global quantum state
 */
export function useGlobalQuantum() {
  const context = useQuantumContext();
  return {
    state: context.state,
    contextData: context.contextData,
    setGlobalEnergy: useCallback((energy: number) => {
      context.setEnergy('global', energy);
    }, [context]),
    setGlobalPhase: useCallback((phase: number) => {
      context.setPhase('global', phase);
    }, [context])
  };
}