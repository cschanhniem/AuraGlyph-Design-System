import { useRef, useCallback, useEffect } from 'react';
import { useQuantumStore } from './use-store';
import { quantumEvents } from './events';
import { generateCSSVariables, generateQuantumClasses } from './utils';
import { DEFAULT_QUANTUM_STATE } from './constants';
import { quantumStore } from './store';
import type { InteractionType, QuantumProps, QuantumConfig, QuantumHookResult } from './types';

export function useQuantum({
  quantum = false,
  quantumId,
  entanglement = [],
  adaptivityLevel = 0.5,
  emotionalSensitivity = 0.5,
  animate = true,
}: QuantumProps = {}): QuantumHookResult {
  const id = useRef(quantumId || `quantum-${Math.random().toString(36).slice(2)}`).current;
  const elementRef = useRef<HTMLElement | null>(null);

  // Initialize quantum configuration
  const config = useRef<QuantumConfig>({
    id,
    entanglement,
    adaptiveConfig: {
      threshold: 0.2,
      dampening: 1 - adaptivityLevel,
      recovery: adaptivityLevel,
    },
    emotionalConfig: {
      sensitivity: emotionalSensitivity,
    },
  }).current;

  // Connect to quantum store
  const { state, updateState } = useQuantumStore(id, config);

  // Handle element reference
  const ref = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;

    if (element && quantum) {
      // Apply initial quantum styles
      const vars = generateCSSVariables(
        state?.quantum ?? DEFAULT_QUANTUM_STATE,
        state?.emotional
      );
      Object.entries(vars).forEach(([key, value]) => {
        element.style.setProperty(key, value);
      });

      // Add quantum classes
      const classes = generateQuantumClasses(
        undefined,
        state?.quantum ?? DEFAULT_QUANTUM_STATE,
        state?.emotional
      );
      element.className = `${element.className} ${classes}`.trim();
    }
  }, [quantum, state]);

  // Handle interactions
  const emitInteraction = useCallback((
    type: InteractionType,
    intensity = 1.0
  ) => {
    if (!quantum) return;
    quantumEvents.processInteraction(id, type, intensity);
  }, [quantum, id]);

  // Handle animation pulse
  const pulse = useCallback((intensity = 1.0) => {
    if (!quantum || !animate) return;
    emitInteraction('press', intensity);
    setTimeout(() => emitInteraction('release', intensity), 150);
  }, [quantum, animate, emitInteraction]);

  // Update element styles when state changes
  useEffect(() => {
    if (!quantum || !elementRef.current || !state) return;

    const vars = generateCSSVariables(state.quantum, state.emotional);
    Object.entries(vars).forEach(([key, value]) => {
      elementRef.current?.style.setProperty(key, value);
    });
  }, [quantum, state]);

  // Update entanglement when prop changes
  useEffect(() => {
    if (!quantum) return;

    // Compare current entanglement with new entanglement to prevent unnecessary updates
    const currentState = quantumStore.getState(id);
    const currentEntanglement = currentState?.entanglement || [];

    // Only update if entanglement has actually changed
    if (!arraysEqual(currentEntanglement, entanglement || [])) {
      updateState({
        entanglement,
        lastUpdate: performance.now(),
      });
    }
  }, [quantum, entanglement, updateState, id]);

  // Helper function to compare arrays
  function arraysEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  // Return quantum interface with all required properties
  return {
    ref,
    id,
    state: state?.quantum ?? null,
    emotionalState: state?.emotional ?? null,
    energy: state?.quantum?.energy ?? DEFAULT_QUANTUM_STATE.energy,
    phase: state?.quantum?.phase ?? DEFAULT_QUANTUM_STATE.phase,
    coherence: state?.quantum?.coherence ?? DEFAULT_QUANTUM_STATE.coherence,
    observability: state?.quantum?.observability ?? DEFAULT_QUANTUM_STATE.observability,
    emitInteraction,
    pulse,
    cssVariables: state
      ? generateCSSVariables(state.quantum, state.emotional)
      : generateCSSVariables(DEFAULT_QUANTUM_STATE),
    getQuantumClass: (prefix?: string) => state
      ? generateQuantumClasses(prefix, state.quantum, state.emotional)
      : generateQuantumClasses(prefix, DEFAULT_QUANTUM_STATE),
    isActive: quantum && (state?.quantum?.energy ?? 0) > 0.1,
  };
}
