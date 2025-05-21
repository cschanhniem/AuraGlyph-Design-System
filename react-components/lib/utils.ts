import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single className string
 * Properly handles Tailwind classes by merging them correctly
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a unique ID with an optional prefix
 */
export function createUniqueId(prefix: string = "auraglyph"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Delays execution by the specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if a value is a valid number
 */
export function isValidNumber(value: any): boolean {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

/**
 * Checks if DOM is available (safe for SSR)
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Converts a color string to RGB values
 */
export function colorToRgb(color: string): [number, number, number] | null {
  if (!isBrowser()) return null;

  const tempEl = document.createElement("div");
  tempEl.style.color = color;
  document.body.appendChild(tempEl);
  const computedColor = getComputedStyle(tempEl).color;
  document.body.removeChild(tempEl);

  const match = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
}

/**
 * Quantum-specific utilities
 */
export const quantum = {
  /**
   * Create CSS variables for quantum effects
   */
  createCssVariables: (props: {
    phase?: number;
    energy?: number;
    coherence?: number;
    observability?: number;
    depth?: number;
    clarity?: number;
    luminance?: number;
  }): Record<string, string> => {
    const vars: Record<string, string> = {};
    
    if (isValidNumber(props.phase)) vars["--quantum-phase"] = String(props.phase);
    if (isValidNumber(props.energy)) vars["--quantum-energy"] = String(props.energy);
    if (isValidNumber(props.coherence)) vars["--quantum-coherence"] = String(props.coherence);
    if (isValidNumber(props.observability)) vars["--quantum-observability"] = String(props.observability);
    if (isValidNumber(props.depth)) vars["--quantum-depth"] = String(props.depth);
    if (isValidNumber(props.clarity)) vars["--quantum-clarity"] = String(props.clarity);
    if (isValidNumber(props.luminance)) vars["--quantum-luminance"] = String(props.luminance);
    
    return vars;
  },
  
  /**
   * Apply CSS variables to an element
   */
  applyQuantumStyles: (element: HTMLElement, variables: Record<string, string>): void => {
    if (!element) return;
    
    Object.entries(variables).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });
  }
};