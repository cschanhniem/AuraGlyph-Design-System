// Animation frame request ID type
type AnimationFrameRequestId = number;

// Animation frame callback type
type AnimationFrameCallback = (timestamp: number) => void;

// Store active animation frames
const activeAnimations = new Map<string, AnimationFrameRequestId>();

/**
 * Request an animation frame with a unique ID
 */
export const requestQuantumFrame = (
  id: string,
  callback: AnimationFrameCallback
): void => {
  // Cancel any existing animation for this ID
  cancelQuantumFrame(id);
  
  // Request new animation frame
  const requestId = requestAnimationFrame(callback);
  activeAnimations.set(id, requestId);
};

/**
 * Cancel an animation frame by ID
 */
export const cancelQuantumFrame = (id: string): void => {
  const existingId = activeAnimations.get(id);
  if (existingId) {
    cancelAnimationFrame(existingId);
    activeAnimations.delete(id);
  }
};

/**
 * Calculate time delta between frames
 */
export const calculateDeltaTime = (
  lastTimestamp: number | null,
  currentTimestamp: number
): number => {
  if (lastTimestamp === null) return 0;
  return Math.min(currentTimestamp - lastTimestamp, 100); // Cap at 100ms
};

/**
 * Easing functions for animations
 */
export const easing = {
  // Ease out cubic
  easeOut: (t: number): number => 1 - Math.pow(1 - t, 3),
  
  // Ease in out cubic
  easeInOut: (t: number): number => 
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  
  // Quantum wave function (sinusoidal with decay)
  quantum: (t: number, frequency = 1, decay = 0.5): number => {
    const wave = Math.sin(t * Math.PI * 2 * frequency);
    const envelope = Math.exp(-t * decay);
    return wave * envelope;
  }
};

/**
 * Get current animation progress
 */
export const getAnimationProgress = (
  startTime: number,
  duration: number
): number => {
  const elapsed = performance.now() - startTime;
  return Math.min(elapsed / duration, 1);
};

/**
 * Clean up all active animations
 */
export const cleanupAnimations = (): void => {
  activeAnimations.forEach((requestId, id) => {
    cancelQuantumFrame(id);
  });
  activeAnimations.clear();
};
