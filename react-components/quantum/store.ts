import { DEFAULT_QUANTUM_STATE, DEFAULT_EMOTIONAL_STATE } from './constants';
import type { QuantumState, EmotionalState, QuantumConfig, ComponentState, ComponentUpdate } from './types';

interface ComponentEntry {
  quantum: QuantumState;
  emotional: EmotionalState;
  config: QuantumConfig;
  lastUpdate: number;
  entanglement: string[];
}

class QuantumStore {
  private components: Map<string, ComponentEntry>;
  private observers: Map<string, Set<() => void>>;

  constructor() {
    this.components = new Map();
    this.observers = new Map();
  }

  register(id: string, config: QuantumConfig = {}) {
    if (!this.components.has(id)) {
      this.components.set(id, {
        quantum: {
          ...DEFAULT_QUANTUM_STATE,
          ...config.initialState,
        },
        emotional: {
          ...DEFAULT_EMOTIONAL_STATE,
          ...config.emotionalConfig?.initialState,
        },
        config,
        lastUpdate: performance.now(),
        entanglement: config.entanglement || [],
      });
    }
  }

  unregister(id: string) {
    this.components.delete(id);
    this.observers.delete(id);
  }

  getState(id: string): ComponentState | null {
    const state = this.components.get(id);
    return state ? { ...state } : null;
  }

  updateState(id: string, update: ComponentUpdate) {
    const current = this.components.get(id);
    if (!current) return;

    // Check if this is a significant update to avoid unnecessary processing
    let hasSignificantChanges = false;

    // Check quantum changes
    if (update.quantum) {
      const energyDiff = Math.abs((update.quantum.energy ?? current.quantum.energy) - current.quantum.energy);
      const phaseDiff = Math.abs((update.quantum.phase ?? current.quantum.phase) - current.quantum.phase);
      if (energyDiff > 0.01 || phaseDiff > 0.05) {
        hasSignificantChanges = true;
      }
    }

    // Check entanglement changes
    if (update.entanglement && !this.arraysEqual(update.entanglement, current.entanglement)) {
      hasSignificantChanges = true;
    }

    // If no significant changes and not a forced update, skip
    if (!hasSignificantChanges && !update.forceUpdate) {
      return;
    }

    // Create a new state with all required fields
    const updated: ComponentEntry = {
      quantum: update.quantum
        ? { ...current.quantum, ...update.quantum }
        : current.quantum,
      emotional: update.emotional
        ? { ...current.emotional, ...update.emotional }
        : current.emotional,
      config: update.config
        ? { ...current.config, ...update.config }
        : current.config,
      lastUpdate: update.lastUpdate ?? performance.now(),
      entanglement: update.entanglement ?? current.entanglement,
    };

    this.components.set(id, updated);
    this.notifyObservers(id);

    // Update entangled components, but only if this is not an entanglement-triggered update
    if (updated.entanglement.length > 0 && !update.isEntanglementUpdate) {
      updated.entanglement.forEach(targetId => {
        if (targetId !== id) {
          this.updateEntangledState(targetId, updated);
        }
      });
    }
  }

  // Helper function to compare arrays
  private arraysEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  private updateEntangledState(id: string, sourceState: ComponentState) {
    const target = this.components.get(id);
    if (!target) return;

    // Prevent update if the source update is too recent (debounce)
    const now = performance.now();
    const timeSinceLastUpdate = now - target.lastUpdate;
    if (timeSinceLastUpdate < 50) { // 50ms debounce
      return;
    }

    // Check if the source state is significantly different to warrant an update
    const energyDiff = Math.abs(target.quantum.energy - sourceState.quantum.energy);
    const phaseDiff = Math.abs(target.quantum.phase - sourceState.quantum.phase);

    // Only update if there's a significant change
    if (energyDiff > 0.05 || phaseDiff > 0.1) {
      const entangledUpdates: ComponentUpdate = {
        quantum: {
          ...target.quantum,
          energy: (target.quantum.energy + sourceState.quantum.energy) / 2,
          phase: sourceState.quantum.phase,
          coherence: Math.min(target.quantum.coherence, sourceState.quantum.coherence),
          observability: target.quantum.observability,
        },
        emotional: {
          ...target.emotional,
          valence: (target.emotional.valence + sourceState.emotional.valence) / 2,
          arousal: Math.max(target.emotional.arousal, sourceState.emotional.arousal),
          dominance: target.emotional.dominance,
        },
        lastUpdate: now,
      };

      // Add the isEntanglementUpdate flag to prevent recursive updates
      entangledUpdates.isEntanglementUpdate = true;

      // Use the updateState method with the flag to prevent recursion
      this.updateState(id, entangledUpdates);
    }
  }

  observe(id: string, callback: () => void) {
    if (!this.observers.has(id)) {
      this.observers.set(id, new Set());
    }
    this.observers.get(id)?.add(callback);
  }

  unobserve(id: string, callback: () => void) {
    this.observers.get(id)?.delete(callback);
  }

  private notifyObservers(id: string) {
    this.observers.get(id)?.forEach(callback => callback());
  }

  cleanup() {
    this.components.clear();
    this.observers.clear();
  }
}

export const quantumStore = new QuantumStore();
