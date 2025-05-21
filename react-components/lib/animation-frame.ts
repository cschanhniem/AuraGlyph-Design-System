/**
 * AnimationFrameLoop class for managing continuous animations
 */
export class AnimationFrameLoop {
  private frameId: number | null = null;
  private lastTimestamp: number = 0;
  private callback: (deltaTime: number) => void;
  private isRunning: boolean = false;

  constructor(callback: (deltaTime: number) => void) {
    this.callback = callback;
  }

  private loop = (timestamp: number) => {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (this.isRunning) {
      this.callback(deltaTime);
      this.frameId = requestAnimationFrame(this.loop);
    }
  };

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.frameId = requestAnimationFrame(this.loop);
    }
  }

  stop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
    this.isRunning = false;
    this.frameId = null;
    this.lastTimestamp = 0;
  }
}
