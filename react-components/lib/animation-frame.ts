/**
 * Animation Frame Loop - a utility for managing animation frames
 * 
 * This provides a clean API for managing requestAnimationFrame-based
 * animation loops, with proper timing, start/stop controls, and delta time.
 * 
 * @license
 * Copyright 2023-2035 AuraGlyph Organization
 * SPDX-License-Identifier: MIT
 */

export type AnimationFrameCallback = (deltaTime: number) => void;

export class AnimationFrameLoop {
  private running: boolean = false;
  private lastFrameTime: number = 0;
  private rafId: number | null = null;
  private callbacks: AnimationFrameCallback[] = [];
  private fixedDeltaTime: number | null = null;

  /**
   * Creates a new animation frame loop
   * 
   * @param callback - Optional initial callback function
   * @param options - Configuration options
   */
  constructor(
    callback?: AnimationFrameCallback,
    private options: {
      /**
       * Start the loop immediately (default: false)
       */
      autoStart?: boolean;
      
      /**
       * Use a fixed delta time instead of actual frame time (useful for testing)
       */
      fixedDeltaTime?: number;
      
      /**
       * Maximum delta time to prevent spiral of death after tab switch (default: 100ms)
       */
      maxDeltaTime?: number;
    } = {}
  ) {
    if (callback) {
      this.callbacks.push(callback);
    }
    
    this.fixedDeltaTime = options.fixedDeltaTime || null;
    
    if (options.autoStart) {
      this.start();
    }
  }
  
  /**
   * Start the animation loop
   */
  public start(): this {
    if (this.running) return this;
    
    this.running = true;
    this.lastFrameTime = performance.now();
    this.scheduleNextFrame();
    
    return this;
  }
  
  /**
   * Stop the animation loop
   */
  public stop(): this {
    if (!this.running) return this;
    
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    return this;
  }
  
  /**
   * Add a callback to the animation loop
   */
  public add(callback: AnimationFrameCallback): this {
    this.callbacks.push(callback);
    return this;
  }
  
  /**
   * Remove a callback from the animation loop
   */
  public remove(callback: AnimationFrameCallback): this {
    const index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
    return this;
  }
  
  /**
   * Execute a single frame update (useful for manual control)
   */
  public tick(timestamp: number = performance.now()): void {
    // Calculate delta time
    let deltaTime: number;
    
    if (this.fixedDeltaTime !== null) {
      deltaTime = this.fixedDeltaTime;
    } else {
      deltaTime = timestamp - this.lastFrameTime;
      
      // Prevent spiral of death with large delta times (e.g., after tab switch)
      const maxDelta = this.options.maxDeltaTime || 100;
      deltaTime = Math.min(deltaTime, maxDelta);
    }
    
    this.lastFrameTime = timestamp;
    
    // Run all callbacks with the current delta time
    for (const callback of this.callbacks) {
      try {
        callback(deltaTime);
      } catch (err) {
        console.error('Error in animation frame callback:', err);
      }
    }
    
    // Schedule next frame if still running
    if (this.running) {
      this.scheduleNextFrame();
    }
  }
  
  /**
   * Schedule the next animation frame
   */
  private scheduleNextFrame(): void {
    this.rafId = requestAnimationFrame((timestamp) => this.tick(timestamp));
  }
  
  /**
   * Check if the animation loop is currently running
   */
  public isRunning(): boolean {
    return this.running;
  }
  
  /**
   * Get the number of registered callbacks
   */
  public getCallbackCount(): number {
    return this.callbacks.length;
  }
}