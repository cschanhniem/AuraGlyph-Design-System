// Default quantum state values
export const DEFAULT_QUANTUM_STATE = {
  energy: 0.5,
  phase: 0,
  coherence: 1,
  observability: 0.8,
} as const;

// Default emotional state values
export const DEFAULT_EMOTIONAL_STATE = {
  valence: 0,
  arousal: 0.5,
  dominance: 0.5,
} as const;

// System constants
export const QUANTUM_CONSTANTS = {
  MIN_ENERGY: 0,
  MAX_ENERGY: 1,
  MIN_PHASE: 0,
  MAX_PHASE: Math.PI * 2,
  MIN_COHERENCE: 0,
  MAX_COHERENCE: 1,
  MIN_OBSERVABILITY: 0,
  MAX_OBSERVABILITY: 1,
  
  // Time constants (in milliseconds)
  DECAY_TIME: 2000,
  PULSE_DURATION: 300,
  ENTANGLEMENT_DELAY: 50,
  
  // Animation constants
  BASE_TRANSITION_DURATION: 300,
  ANIMATION_FRAME_RATE: 60,
  
  // Interaction multipliers
  INTERACTION_INTENSITY: {
    click: 1.0,
    hover: 0.3,
    hoverStart: 0.4,
    hoverEnd: -0.3,
    focus: 0.5,
    blur: -0.3,
    press: 0.8,
    release: -0.2,
    change: 0.4,
    keydown: 0.6,
    open: 0.7,
    close: -0.4,
  } as const satisfies Record<InteractionType, number>,
  
  // Adaptive behavior constants
  DEFAULT_ADAPTIVE_CONFIG: {
    threshold: 0.3,
    dampening: 0.8,
    recovery: 0.2,
  } as const,
  
  // Emotional response constants
  EMOTIONAL_RESPONSE: {
    baseInfluence: 0.3,
    decayRate: 0.1,
    crossInfluence: 0.2,
    minSensitivity: 0.1,
    maxSensitivity: 1.0,
  } as const,
  
  // CSS variable names
  CSS_VARS: {
    energy: '--quantum-energy',
    phase: '--quantum-phase',
    coherence: '--quantum-coherence',
    observability: '--quantum-observability',
    emotionValence: '--quantum-emotion-valence',
    emotionArousal: '--quantum-emotion-arousal',
    emotionDominance: '--quantum-emotion-dominance',
  } as const,
  
  // Class name prefixes
  CLASS_PREFIXES: {
    base: 'quantum',
    active: 'quantum-active',
    pressed: 'quantum-pressed',
    animated: 'quantum-animated',
    material: 'quantum-material',
    emotion: 'quantum-emotion',
    depth: 'quantum-depth',
    glow: 'quantum-glow',
  } as const,
} as const;

// Re-export needed types
import type { InteractionType } from './types';
export type QuantumConstants = typeof QUANTUM_CONSTANTS;
export type QuantumClassPrefixes = typeof QUANTUM_CONSTANTS.CLASS_PREFIXES;
export type QuantumCSSVariables = typeof QUANTUM_CONSTANTS.CSS_VARS;
