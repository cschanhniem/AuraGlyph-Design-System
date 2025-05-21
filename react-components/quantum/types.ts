import type { ReactNode } from 'react';

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
  | 'hoverStart'
  | 'hoverEnd' 
  | 'focus' 
  | 'blur' 
  | 'press' 
  | 'release'
  | 'change'
  | 'keydown'
  | 'open'
  | 'close';

export interface AdaptiveConfig {
  threshold?: number;
  dampening?: number;
  recovery?: number;
}

export interface QuantumConfig {
  id?: string;
  initialState?: Partial<QuantumState>;
  adaptiveConfig?: AdaptiveConfig;
  emotionalConfig?: {
    initialState?: Partial<EmotionalState>;
    sensitivity?: number;
  };
  entanglement?: string[];
}

export interface ComponentState {
  quantum: QuantumState;
  emotional: EmotionalState;
  config: QuantumConfig;
  lastUpdate: number;
  entanglement: string[];
}

export interface ComponentUpdate {
  quantum?: Partial<QuantumState>;
  emotional?: Partial<EmotionalState>;
  config?: Partial<QuantumConfig>;
  entanglement?: string[];
  lastUpdate?: number;
}

export interface QuantumContext {
  register: (id: string, config?: QuantumConfig) => void;
  unregister: (id: string) => void;
  getState: (id: string) => ComponentState | null;
  updateState: (id: string, updates: ComponentUpdate) => void;
  emitInteraction: (id: string, type: InteractionType, intensity?: number) => void;
  observeState: (id: string) => void;
  getEmotionalState: (id: string) => EmotionalState | null;
}

export interface QuantumProviderProps {
  children: ReactNode;
  config?: {
    globalAdaptivity?: number;
    globalEmotionalSensitivity?: number;
    defaultState?: Partial<QuantumState>;
  };
}

export interface QuantumProps {
  quantum?: boolean;
  quantumId?: string;
  entanglement?: string[];
  adaptivityLevel?: number;
  emotionalSensitivity?: number;
  animate?: boolean;
}

export interface QuantumHookResult {
  ref: (element: HTMLElement | null) => void;
  id: string;
  state: QuantumState | null;
  emotionalState: EmotionalState | null;
  energy: number;
  phase: number;
  coherence: number;
  observability: number;
  emitInteraction: (type: InteractionType, intensity?: number) => void;
  pulse: (intensity?: number) => void;
  cssVariables: Record<string, string>;
  getQuantumClass: (prefix?: string) => string;
  isActive: boolean;
}
