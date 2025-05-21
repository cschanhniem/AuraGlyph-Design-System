import { useEffect, useCallback, useState } from 'react';
import { quantumStore } from './store';
import type { QuantumConfig, ComponentState, ComponentUpdate } from './types';

export function useQuantumStore(id: string, config?: QuantumConfig) {
  const [state, setState] = useState<ComponentState | null>(null);

  useEffect(() => {
    quantumStore.register(id, config);
    setState(quantumStore.getState(id));

    const handleUpdate = () => {
      setState(quantumStore.getState(id));
    };

    quantumStore.observe(id, handleUpdate);

    return () => {
      quantumStore.unobserve(id, handleUpdate);
      quantumStore.unregister(id);
    };
  }, [id, config]);

  const updateState = useCallback((
    updates: ComponentUpdate | ((prev: ComponentState) => ComponentUpdate)
  ) => {
    const current = quantumStore.getState(id);
    if (!current) return;

    const resolvedUpdates = typeof updates === 'function'
      ? updates(current)
      : updates;

    quantumStore.updateState(id, resolvedUpdates);
  }, [id]);

  const resetState = useCallback(() => {
    const current = quantumStore.getState(id);
    if (!current) return;

    quantumStore.register(id, current.config);
  }, [id]);

  return {
    state,
    updateState,
    resetState,
  } as const;
}

// Hook for accessing just the quantum state
export function useQuantumStoreState(id: string) {
  const { state } = useQuantumStore(id);
  return state?.quantum ?? null;
}

// Hook for accessing just the emotional state
export function useEmotionalStoreState(id: string) {
  const { state } = useQuantumStore(id);
  return state?.emotional ?? null;
}

// Hook for accessing just the entanglement state
export function useEntanglementState(id: string) {
  const { state, updateState } = useQuantumStore(id);

  const setEntanglement = useCallback((targetIds: string[]) => {
    updateState(current => ({
      entanglement: targetIds,
      lastUpdate: performance.now(),
    }));
  }, [updateState]);

  const addEntanglement = useCallback((targetId: string) => {
    updateState(current => ({
      entanglement: [...(current.entanglement || []), targetId],
      lastUpdate: performance.now(),
    }));
  }, [updateState]);

  const removeEntanglement = useCallback((targetId: string) => {
    updateState(current => ({
      entanglement: current.entanglement.filter(id => id !== targetId),
      lastUpdate: performance.now(),
    }));
  }, [updateState]);

  return {
    entangled: state?.entanglement ?? [],
    setEntanglement,
    addEntanglement,
    removeEntanglement,
  } as const;
}
