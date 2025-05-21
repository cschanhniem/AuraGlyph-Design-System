import { QUANTUM_CONSTANTS } from './constants';
import { quantumStore } from './store';
import type { InteractionType, ComponentUpdate, QuantumState, EmotionalState } from './types';

class QuantumEvents {
  private interactionTimers: Map<string, NodeJS.Timeout>;
  private lastInteraction: Map<string, number>;

  constructor() {
    this.interactionTimers = new Map();
    this.lastInteraction = new Map();
  }

  processInteraction(
    id: string, 
    type: InteractionType, 
    intensity = 1.0
  ) {
    const state = quantumStore.getState(id);
    if (!state) return;

    const baseMultiplier = QUANTUM_CONSTANTS.INTERACTION_INTENSITY[type];
    const scaledIntensity = intensity * baseMultiplier;
    const currentTime = performance.now();

    const quantumUpdates: QuantumState = {
      energy: Math.min(
        state.quantum.energy + scaledIntensity * 0.3,
        QUANTUM_CONSTANTS.MAX_ENERGY
      ),
      coherence: type === 'focus' 
        ? Math.min(state.quantum.coherence + 0.2, QUANTUM_CONSTANTS.MAX_COHERENCE)
        : state.quantum.coherence,
      phase: (state.quantum.phase + Math.PI * scaledIntensity) % (Math.PI * 2),
      observability: state.quantum.observability,
    };

    const emotionalUpdates: EmotionalState = {
      valence: type === 'press' ? -0.2 : type === 'release' ? 0.2 : state.emotional.valence,
      arousal: Math.min(
        state.emotional.arousal + Math.abs(scaledIntensity) * 0.2,
        1
      ),
      dominance: type === 'focus' 
        ? Math.min(state.emotional.dominance + 0.1, 1)
        : state.emotional.dominance,
    };

    const updates: ComponentUpdate = {
      quantum: quantumUpdates,
      emotional: emotionalUpdates,
      lastUpdate: currentTime,
    };

    quantumStore.updateState(id, updates);
    this.scheduleDecay(id);
    this.lastInteraction.set(id, currentTime);
  }

  private scheduleDecay(id: string) {
    const existingTimer = this.interactionTimers.get(id);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      this.applyDecay(id);
    }, QUANTUM_CONSTANTS.DECAY_TIME);

    this.interactionTimers.set(id, timer);
  }

  private applyDecay(id: string) {
    const state = quantumStore.getState(id);
    if (!state) return;

    const lastInteractionTime = this.lastInteraction.get(id) || 0;
    const timeSinceInteraction = performance.now() - lastInteractionTime;
    const decayFactor = Math.min(timeSinceInteraction / QUANTUM_CONSTANTS.DECAY_TIME, 1);

    const quantumUpdates: QuantumState = {
      energy: Math.max(
        state.quantum.energy * (1 - decayFactor * 0.5),
        QUANTUM_CONSTANTS.MIN_ENERGY
      ),
      coherence: Math.max(
        state.quantum.coherence * (1 - decayFactor * 0.3),
        QUANTUM_CONSTANTS.MIN_COHERENCE
      ),
      phase: state.quantum.phase,
      observability: state.quantum.observability,
    };

    const emotionalUpdates: EmotionalState = {
      arousal: Math.max(
        state.emotional.arousal * (1 - decayFactor * 0.4),
        0
      ),
      valence: state.emotional.valence * (1 - decayFactor * 0.2),
      dominance: state.emotional.dominance,
    };

    const updates: ComponentUpdate = {
      quantum: quantumUpdates,
      emotional: emotionalUpdates,
      lastUpdate: performance.now(),
    };

    quantumStore.updateState(id, updates);

    // Schedule next decay if still above minimum values
    if (
      quantumUpdates.energy > QUANTUM_CONSTANTS.MIN_ENERGY ||
      quantumUpdates.coherence > QUANTUM_CONSTANTS.MIN_COHERENCE ||
      Math.abs(emotionalUpdates.valence) > 0.01 ||
      emotionalUpdates.arousal > 0.01
    ) {
      this.scheduleDecay(id);
    }
  }

  cleanup() {
    this.interactionTimers.forEach(timer => clearTimeout(timer));
    this.interactionTimers.clear();
    this.lastInteraction.clear();
  }
}

export const quantumEvents = new QuantumEvents();
