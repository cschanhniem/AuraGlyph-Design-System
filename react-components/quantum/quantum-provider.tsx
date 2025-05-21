import React, { createContext, useContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AnimationFrameLoop } from "../lib/animation-frame";

// Types for quantum properties
export interface QuantumState {
  phase: number;            // Current quantum phase (0-1)
  coherence: number;        // Level of quantum coherence (0-1)
  energyLevel: number;      // Current energy level (0-1)
  entanglement: string[];   // IDs of entangled elements
  lastInteraction: number;  // Timestamp of last interaction
  observability: number;    // How visible/strong quantum effects are (0-1)
}

// Context data from environment
export interface ContextData {
  environmentalLight: number;  // Ambient light level (0-1)
  timeOfDay: number;           // Normalized time (0-1, where 0=midnight, 0.5=noon)
  userFocusLevel: number;      // Estimated user focus (0-1)
  devicePerformance: number;   // Device performance rating (0-1)
  proximityToViewport: number; // Distance from viewport center (0-1)
  motionPreference: boolean;   // User preference for reduced motion
}

// Provider options
export interface QuantumProviderOptions {
  initialState?: Partial<QuantumState>;
  contextSensitivity?: number; // How much context affects quantum properties (0-1)
  adaptability?: number;       // How quickly system adapts to changes (0-1)
  quantumEffectsLevel?: 'none' | 'subtle' | 'standard' | 'enhanced' | 'maximum';
  debug?: boolean;
}

// Interaction event
export interface QuantumInteractionEvent {
  type: string;              // Interaction type (click, hover, etc.)
  sourceId: string;          // ID of source element
  targetId?: string;         // ID of target element (if applicable)
  energy: number;            // Energy transfer amount (0-1)
  phase: number;             // Phase value at time of interaction
  position?: { x: number; y: number }; // Normalized position (0-1)
  timestamp: number;         // Event timestamp
}

// Quantum context shape
interface QuantumContextType {
  state: QuantumState;
  contextData: ContextData;
  options: QuantumProviderOptions;
  setEnergy: (id: string, energy: number) => void;
  setPhase: (id: string, phase: number) => void;
  registerElement: (id: string) => void;
  unregisterElement: (id: string) => void;
  addEntanglement: (sourceId: string, targetId: string) => void;
  removeEntanglement: (sourceId: string, targetId: string) => void;
  dispatchInteraction: (event: Omit<QuantumInteractionEvent, 'timestamp'>) => void;
}

// Create context with default values
const QuantumContext = createContext<QuantumContextType>({
  state: {
    phase: 0,
    coherence: 1,
    energyLevel: 0.5,
    entanglement: [],
    lastInteraction: 0,
    observability: 0.8
  },
  contextData: {
    environmentalLight: 1.0,
    timeOfDay: 0.5,
    userFocusLevel: 0.8,
    devicePerformance: 1.0,
    proximityToViewport: 0,
    motionPreference: false
  },
  options: {
    contextSensitivity: 0.5,
    adaptability: 0.7,
    quantumEffectsLevel: 'standard',
    debug: false
  },
  setEnergy: () => {},
  setPhase: () => {},
  registerElement: () => {},
  unregisterElement: () => {},
  addEntanglement: () => {},
  removeEntanglement: () => {},
  dispatchInteraction: () => {}
});

// Registry to track quantum elements
interface QuantumRegistry {
  [id: string]: {
    state: Partial<QuantumState>;
    entanglement: string[];
  };
}

export const QuantumProvider: React.FC<{
  children: React.ReactNode;
  options?: QuantumProviderOptions;
}> = ({ children, options = {} }) => {
  // Initialize quantum state
  const [quantumState, setQuantumState] = useState<QuantumState>({
    phase: options.initialState?.phase ?? Math.random(),
    coherence: options.initialState?.coherence ?? 1.0, 
    energyLevel: options.initialState?.energyLevel ?? 0.5,
    entanglement: options.initialState?.entanglement ?? [],
    lastInteraction: Date.now(),
    observability: options.initialState?.observability ?? 0.8
  });

  // Initialize context data
  const [contextData, setContextData] = useState<ContextData>({
    environmentalLight: 1.0,
    timeOfDay: getCurrentTimeNormalized(),
    userFocusLevel: 0.8,
    devicePerformance: estimateDevicePerformance(),
    proximityToViewport: 0,
    motionPreference: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });

  // Options with defaults
  const mergedOptions = useMemo(() => ({
    contextSensitivity: 0.5,
    adaptability: 0.7,
    quantumEffectsLevel: 'standard',
    debug: false,
    ...options
  }), [options]);

  // Registry of quantum elements
  const registryRef = useRef<QuantumRegistry>({});

  // Animation frame loop reference
  const animationLoopRef = useRef<AnimationFrameLoop | null>(null);

  // Initialize animation loop for continuous quantum updates
  useEffect(() => {
    animationLoopRef.current = new AnimationFrameLoop((deltaTime) => {
      updateQuantumState(deltaTime);
    });

    // Start the loop
    animationLoopRef.current.start();

    // Clean up on unmount
    return () => {
      animationLoopRef.current?.stop();
    };
  }, []);

  // Setup context sensors and update interval
  useEffect(() => {
    // Update time context periodically
    const timeInterval = setInterval(() => {
      setContextData(prev => ({
        ...prev,
        timeOfDay: getCurrentTimeNormalized()
      }));
    }, 60000); // Every minute

    // Listen for reduced motion preference changes
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setContextData(prev => ({
        ...prev,
        motionPreference: e.matches
      }));
    };
    motionMediaQuery.addEventListener('change', handleMotionPreferenceChange);

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up
    return () => {
      clearInterval(timeInterval);
      motionMediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle document visibility changes
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // Document became visible again, update time
      setContextData(prev => ({
        ...prev,
        timeOfDay: getCurrentTimeNormalized()
      }));
    }
  };

  // Update quantum state based on time passing
  const updateQuantumState = (deltaTime: number) => {
    setQuantumState(prev => {
      // Update phase based on time
      const phaseIncrement = deltaTime * 0.0001;
      const newPhase = (prev.phase + phaseIncrement) % 1;
      
      // Energy decay over time
      let newEnergy = prev.energyLevel;
      if (prev.energyLevel > 0.5) {
        const decay = deltaTime * 0.0005 * mergedOptions.adaptability;
        newEnergy = Math.max(0.5, prev.energyLevel - decay);
      }
      
      return {
        ...prev,
        phase: newPhase,
        energyLevel: newEnergy
      };
    });
  };

  // Set energy level for a specific element
  const setEnergy = useCallback((id: string, energy: number) => {
    if (!registryRef.current[id]) return;
    
    registryRef.current[id].state.energyLevel = Math.max(0, Math.min(1, energy));
    
    // If this is a global energy change, update the main state too
    if (id === 'global') {
      setQuantumState(prev => ({
        ...prev,
        energyLevel: energy,
        lastInteraction: Date.now()
      }));
    }
  }, []);

  // Set phase for a specific element
  const setPhase = useCallback((id: string, phase: number) => {
    if (!registryRef.current[id]) return;
    
    registryRef.current[id].state.phase = phase % 1;
    
    // If this is a global phase change, update the main state too
    if (id === 'global') {
      setQuantumState(prev => ({
        ...prev,
        phase: phase % 1
      }));
    }
  }, []);

  // Register a quantum element
  const registerElement = useCallback((id: string) => {
    if (!id) return;
    
    registryRef.current[id] = {
      state: {
        phase: Math.random(),
        energyLevel: 0.5
      },
      entanglement: []
    };
    
    if (mergedOptions.debug) {
      console.log(`[QuantumProvider] Registered element: ${id}`);
    }
  }, [mergedOptions.debug]);

  // Unregister a quantum element
  const unregisterElement = useCallback((id: string) => {
    if (!id || !registryRef.current[id]) return;
    
    // Remove entanglements
    const entanglements = [...registryRef.current[id].entanglement];
    entanglements.forEach(targetId => {
      removeEntanglement(id, targetId);
    });
    
    // Remove from registry
    delete registryRef.current[id];
    
    if (mergedOptions.debug) {
      console.log(`[QuantumProvider] Unregistered element: ${id}`);
    }
  }, [mergedOptions.debug]);

  // Add entanglement between elements
  const addEntanglement = useCallback((sourceId: string, targetId: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    
    // Ensure both elements exist
    if (!registryRef.current[sourceId]) {
      registerElement(sourceId);
    }
    
    if (!registryRef.current[targetId]) {
      registerElement(targetId);
    }
    
    // Add entanglement to both elements (bidirectional)
    if (!registryRef.current[sourceId].entanglement.includes(targetId)) {
      registryRef.current[sourceId].entanglement.push(targetId);
    }
    
    if (!registryRef.current[targetId].entanglement.includes(sourceId)) {
      registryRef.current[targetId].entanglement.push(sourceId);
    }
    
    if (mergedOptions.debug) {
      console.log(`[QuantumProvider] Entangled elements: ${sourceId} <-> ${targetId}`);
    }
  }, [mergedOptions.debug, registerElement]);

  // Remove entanglement between elements
  const removeEntanglement = useCallback((sourceId: string, targetId: string) => {
    if (!sourceId || !targetId) return;
    
    // Remove from source if it exists
    if (registryRef.current[sourceId]) {
      registryRef.current[sourceId].entanglement = 
        registryRef.current[sourceId].entanglement.filter(id => id !== targetId);
    }
    
    // Remove from target if it exists
    if (registryRef.current[targetId]) {
      registryRef.current[targetId].entanglement = 
        registryRef.current[targetId].entanglement.filter(id => id !== sourceId);
    }
    
    if (mergedOptions.debug) {
      console.log(`[QuantumProvider] Removed entanglement: ${sourceId} <-> ${targetId}`);
    }
  }, [mergedOptions.debug]);

  // Dispatch an interaction event
  const dispatchInteraction = useCallback((event: Omit<QuantumInteractionEvent, 'timestamp'>) => {
    const fullEvent = {
      ...event,
      timestamp: Date.now()
    };
    
    // Update source element state
    if (event.sourceId && registryRef.current[event.sourceId]) {
      registryRef.current[event.sourceId].state.energyLevel = event.energy;
      registryRef.current[event.sourceId].state.lastInteraction = fullEvent.timestamp;
    }
    
    // Process entanglements - propagate to entangled elements
    if (event.sourceId && registryRef.current[event.sourceId]) {
      registryRef.current[event.sourceId].entanglement.forEach(targetId => {
        if (registryRef.current[targetId]) {
          // Calculate energy transfer based on options
          const energyTransfer = event.energy * 0.7 * mergedOptions.adaptability;
          
          // Apply energy to entangled element
          const currentEnergy = registryRef.current[targetId].state.energyLevel || 0;
          registryRef.current[targetId].state.energyLevel = Math.max(
            currentEnergy,
            energyTransfer
          );
          
          // Begin phase synchronization
          const sourcePhase = registryRef.current[event.sourceId].state.phase || 0;
          const targetPhase = registryRef.current[targetId].state.phase || 0;
          const phaseDiff = Math.abs(sourcePhase - targetPhase);
          
          if (phaseDiff > 0.1) {
            // Move phase slightly toward entangled element's phase
            const phaseStep = 0.05 * mergedOptions.adaptability;
            if (targetPhase > sourcePhase) {
              registryRef.current[targetId].state.phase = (targetPhase - phaseStep) % 1;
            } else {
              registryRef.current[targetId].state.phase = (targetPhase + phaseStep) % 1;
            }
          }
        }
      });
    }
    
    // Debug output
    if (mergedOptions.debug) {
      console.log('[QuantumProvider] Interaction event:', fullEvent);
    }
  }, [mergedOptions.adaptability, mergedOptions.debug]);

  // Build the context value
  const contextValue = useMemo(() => ({
    state: quantumState,
    contextData,
    options: mergedOptions,
    setEnergy,
    setPhase,
    registerElement,
    unregisterElement,
    addEntanglement,
    removeEntanglement,
    dispatchInteraction
  }), [
    quantumState, 
    contextData, 
    mergedOptions,
    setEnergy,
    setPhase,
    registerElement,
    unregisterElement,
    addEntanglement,
    removeEntanglement,
    dispatchInteraction
  ]);

  return (
    <QuantumContext.Provider value={contextValue}>
      {children}
    </QuantumContext.Provider>
  );
};

// Utility to get current time normalized to 0-1 range
function getCurrentTimeNormalized(): number {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (hours * 60 + minutes) / (24 * 60);
}

// Utility to estimate device performance
function estimateDevicePerformance(): number {
  // Basic performance estimation
  const memory = (navigator as any).deviceMemory || 4; // Default to mid-range if not available
  const cores = navigator.hardwareConcurrency || 4;
  
  // Normalize to 0-1 range
  const memoryScore = Math.min(memory / 8, 1); // 8GB as reference max
  const coreScore = Math.min(cores / 8, 1);    // 8 cores as reference max
  
  return (memoryScore + coreScore) / 2;
}

// Hook for accessing quantum context
export const useQuantumContext = () => useContext(QuantumContext);

// Export the context for direct usage
export { QuantumContext };