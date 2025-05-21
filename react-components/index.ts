// Components
export * from './components/ui/button';
export * from './components/ui/input';
export * from './components/ui/modal';
export * from './components/ui/toggle';

// Quantum System
export * from './quantum/quantum-provider';
export * from './quantum/use-quantum';

// Utilities
export * from './lib/animation-frame';
export * from './lib/utils';
export * from './lib/quantum-plugin';

// Styles
import './styles/quantum.css';
import './styles/quantum-theme.css';

// Types
export interface QuantumProps {
  quantum?: boolean;
  quantumId?: string;
  entanglement?: string[];
  adaptivityLevel?: number;
  emotionalSensitivity?: number;
  animate?: boolean;
}

export interface QuantumState {
  energy: number;
  phase: number;
  coherence: number;
  observability: number;
}

export interface EmotionalState {
  valence: number;    // Positive vs negative (-1 to 1)
  arousal: number;    // Calm vs excited (0 to 1)
  dominance: number;  // Submissive vs dominant (0 to 1)
}

export type InteractionType = 
  | 'click' 
  | 'hover' 
  | 'focus' 
  | 'blur' 
  | 'press' 
  | 'release'
  | 'change'
  | 'keydown';

export interface AdaptiveConfig {
  threshold?: number;
  dampening?: number;
  recovery?: number;
}

export interface QuantumConfig {
  initialState?: Partial<QuantumState>;
  adaptiveConfig?: AdaptiveConfig;
  emotionalConfig?: {
    initialState?: Partial<EmotionalState>;
    sensitivity?: number;
  };
}

// Re-export types from sub-components
export type { ButtonProps } from './components/ui/button';
export type { InputProps } from './components/ui/input';
export type { ModalProps } from './components/ui/modal';
export type { ToggleProps } from './components/ui/toggle';
