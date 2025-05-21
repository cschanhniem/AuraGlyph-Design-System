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

    // Update entangled components
    if (updated.entanglement.length > 0) {
      updated.entanglement.forEach(targetId => {
        if (targetId !== id) {
          this.updateEntangledState(targetId, updated);
        }
      });
    }
  }

  private updateEntangledState(id: string, sourceState: ComponentState) {
    const target = this.components.get(id);
    if (!target) return;

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
      lastUpdate: performance.now(),
    };

    this.updateState(id, entangledUpdates);
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
