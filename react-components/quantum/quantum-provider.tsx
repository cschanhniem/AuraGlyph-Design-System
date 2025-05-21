import { createContext, useContext, useCallback, useEffect } from 'react';
import { quantumStore } from './store';
import { quantumEvents } from './events';
import { DEFAULT_QUANTUM_STATE, DEFAULT_EMOTIONAL_STATE } from './constants';
import type { 
  QuantumContext, 
  QuantumProviderProps, 
  ComponentState, 
  ComponentUpdate,
  QuantumConfig,
  InteractionType,
} from './types';

// Create context with empty implementation for type safety
const defaultContext: QuantumContext = {
  register: () => {},
  unregister: () => {},
  getState: () => null,
  updateState: () => {},
  emitInteraction: () => {},
  observeState: () => {},
  getEmotionalState: () => null,
};

const QuantumContext = createContext<QuantumContext>(defaultContext);

export function QuantumProvider({ 
  children,
  config = {},
}: QuantumProviderProps) {
  const {
    globalAdaptivity = 0.5,
    globalEmotionalSensitivity = 0.5,
    defaultState = DEFAULT_QUANTUM_STATE,
  } = config;

  const register = useCallback((id: string, componentConfig: QuantumConfig = {}) => {
    quantumStore.register(id, {
      ...componentConfig,
      initialState: {
        ...defaultState,
        ...componentConfig.initialState,
      },
      adaptiveConfig: {
        threshold: 0.2,
        dampening: 1 - globalAdaptivity,
        recovery: globalAdaptivity,
        ...componentConfig.adaptiveConfig,
      },
      emotionalConfig: {
        sensitivity: globalEmotionalSensitivity,
        ...componentConfig.emotionalConfig,
        initialState: {
          ...DEFAULT_EMOTIONAL_STATE,
          ...componentConfig.emotionalConfig?.initialState,
        },
      },
    });
  }, [defaultState, globalAdaptivity, globalEmotionalSensitivity]);

  const unregister = useCallback((id: string) => {
    quantumStore.unregister(id);
  }, []);

  const getState = useCallback((id: string): ComponentState | null => {
    return quantumStore.getState(id);
  }, []);

  const updateState = useCallback((id: string, updates: ComponentUpdate) => {
    quantumStore.updateState(id, updates);
  }, []);

  const emitInteraction = useCallback((
    id: string,
    type: InteractionType,
    intensity = 1.0
  ) => {
    quantumEvents.processInteraction(id, type, intensity);
  }, []);

  const observeState = useCallback((id: string) => {
    const state = quantumStore.getState(id);
    if (!state) return;

    // Update observability on observation
    quantumStore.updateState(id, {
      quantum: {
        ...state.quantum,
        observability: Math.min(state.quantum.observability + 0.2, 1),
      },
      lastUpdate: performance.now(),
    });
  }, []);

  const getEmotionalState = useCallback((id: string) => {
    const state = quantumStore.getState(id);
    return state?.emotional ?? null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      quantumEvents.cleanup();
    };
  }, []);

  const contextValue: QuantumContext = {
    register,
    unregister,
    getState,
    updateState,
    emitInteraction,
    observeState,
    getEmotionalState,
  };

  return (
    <QuantumContext.Provider value={contextValue}>
      {children}
    </QuantumContext.Provider>
  );
}

// Hook for accessing quantum context
export function useQuantumContext() {
  const context = useContext(QuantumContext);
  if (!context) {
    throw new Error('useQuantumContext must be used within a QuantumProvider');
  }
  return context;
}
