import { QUANTUM_CONSTANTS } from './constants';
import type { QuantumState, EmotionalState, InteractionType } from './types';

// Clamp a value between min and max
export const clamp = (value: number, min: number, max: number) => 
  Math.min(Math.max(value, min), max);

// Linear interpolation
export const lerp = (start: number, end: number, t: number) => 
  start * (1 - t) + end * t;

// Calculate quantum state transitions
export const calculateNextState = (
  currentState: QuantumState,
  targetState: Partial<QuantumState>,
  deltaTime: number
): QuantumState => {
  const transitionRate = deltaTime / QUANTUM_CONSTANTS.BASE_TRANSITION_DURATION;
  
  return {
    energy: lerp(
      currentState.energy,
      targetState.energy ?? currentState.energy,
      transitionRate
    ),
    phase: lerp(
      currentState.phase,
      targetState.phase ?? currentState.phase,
      transitionRate
    ),
    coherence: lerp(
      currentState.coherence,
      targetState.coherence ?? currentState.coherence,
      transitionRate
    ),
    observability: lerp(
      currentState.observability,
      targetState.observability ?? currentState.observability,
      transitionRate
    ),
  };
};

// Calculate emotional state changes
export const calculateEmotionalResponse = (
  currentState: EmotionalState,
  interaction: InteractionType,
  intensity: number,
  sensitivity: number
): EmotionalState => {
  const { baseInfluence, maxSensitivity } = QUANTUM_CONSTANTS.EMOTIONAL_RESPONSE;
  const scaledIntensity = intensity * Math.min(sensitivity, maxSensitivity);
  const interactionMultiplier = QUANTUM_CONSTANTS.INTERACTION_INTENSITY[interaction];

  return {
    valence: clamp(
      currentState.valence + (scaledIntensity * interactionMultiplier * baseInfluence),
      -1,
      1
    ),
    arousal: clamp(
      currentState.arousal + (Math.abs(scaledIntensity) * baseInfluence),
      0,
      1
    ),
    dominance: clamp(
      currentState.dominance + (scaledIntensity * interactionMultiplier * baseInfluence),
      0,
      1
    ),
  };
};

// Generate CSS variables from quantum state
export const generateCSSVariables = (
  state: QuantumState,
  emotionalState?: EmotionalState | null
): Record<string, string> => {
  const vars: Record<string, string> = {
    [QUANTUM_CONSTANTS.CSS_VARS.energy]: state.energy.toString(),
    [QUANTUM_CONSTANTS.CSS_VARS.phase]: state.phase.toString(),
    [QUANTUM_CONSTANTS.CSS_VARS.coherence]: state.coherence.toString(),
    [QUANTUM_CONSTANTS.CSS_VARS.observability]: state.observability.toString(),
  };

  if (emotionalState) {
    vars[QUANTUM_CONSTANTS.CSS_VARS.emotionValence] = emotionalState.valence.toString();
    vars[QUANTUM_CONSTANTS.CSS_VARS.emotionArousal] = emotionalState.arousal.toString();
    vars[QUANTUM_CONSTANTS.CSS_VARS.emotionDominance] = emotionalState.dominance.toString();
  }

  return vars;
};

// Generate quantum class names
export const generateQuantumClasses = (
  prefix: string = '',
  state: QuantumState,
  emotionalState?: EmotionalState | null,
  isActive?: boolean
): string => {
  const classes = [QUANTUM_CONSTANTS.CLASS_PREFIXES.base];
  
  if (prefix) {
    classes.push(`${QUANTUM_CONSTANTS.CLASS_PREFIXES.base}-${prefix}`);
  }
  
  if (isActive) {
    classes.push(QUANTUM_CONSTANTS.CLASS_PREFIXES.active);
  }
  
  if (state.energy > 0.8) {
    classes.push(QUANTUM_CONSTANTS.CLASS_PREFIXES.glow);
  }
  
  if (emotionalState) {
    if (emotionalState.valence > 0.5) {
      classes.push(`${QUANTUM_CONSTANTS.CLASS_PREFIXES.emotion}-positive`);
    } else if (emotionalState.valence < -0.5) {
      classes.push(`${QUANTUM_CONSTANTS.CLASS_PREFIXES.emotion}-negative`);
    }
    
    if (emotionalState.arousal > 0.7) {
      classes.push(`${QUANTUM_CONSTANTS.CLASS_PREFIXES.emotion}-excited`);
    }
    
    if (emotionalState.dominance > 0.7) {
      classes.push(`${QUANTUM_CONSTANTS.CLASS_PREFIXES.emotion}-dominant`);
    }
  }
  
  return classes.join(' ');
};
