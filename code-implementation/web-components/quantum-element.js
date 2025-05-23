/**
 * @license
 * Copyright 2023-2035 AuraGlyph Organization
 * SPDX-License-Identifier: MIT
 */

/**
 * QuantumElement - Base class for all AuraGlyph Web Components
 * 
 * Implements the core quantum behaviors and properties that allow
 * AuraGlyph components to exhibit sentient, responsive characteristics.
 */
export class QuantumElement extends HTMLElement {
  // Define observed attributes 
  static get observedAttributes() {
    return [
      'variant', 
      'state', 
      'material', 
      'luminance', 
      'depth', 
      'responsiveness', 
      'entanglement-id',
      'quantum-phase'
    ];
  }
  
  constructor() {
    super();
    
    // Initialize shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // Setup quantum state
    this._quantumState = {
      phase: Math.random(), // Initial random phase (0-1)
      entanglement: [],     // IDs of entangled elements
      coherence: 1.0,       // Quantum coherence (0-1)
      observability: 0.8,   // How observable the quantum effects are
      lastInteraction: 0,   // Timestamp of last interaction
      usageCount: 0,        // How many times the element has been used
      energyLevel: 0.5      // Current energy level (0-1)
    };
    
    // Setup context tracking
    this._contextData = {
      environmentalLight: 1.0,  // Ambient light level (0-1)
      timeOfDay: this._getCurrentTimeNormalized(),
      userFocusLevel: 0.8,      // Estimated user focus (0-1)
      devicePerformance: 1.0,   // Device performance (0-1)
      proximityToViewport: 0    // Distance from viewport center (0-1)
    };
    
    // Interaction tracking
    this._interactionHistory = [];
    this._observers = new Map();
    
    // Rendering state
    this._renderState = {
      animationFrameId: null,
      needsRender: true,
      renderer: null, // This will hold either 2D, WebGL, or WebGPU context/device
      renderMode: '2d', // '2d', 'webgl', 'webgpu'
      canvas: null,
      webgpu: { // WebGPU specific state
        device: null,
        context: null,
        pipeline: null,
        presentationFormat: null
      }
    };
    
    // Material system
    this._material = {
      type: this.getAttribute('material') || 'quantum-glass',
      properties: {
        clarity: 0.65,
        refraction: 1.35,
        luminousCapacity: 0.7,
        quantumNoise: 0.15,
        depth: parseFloat(this.getAttribute('depth') || 0.2)
      }
    };
    
    // Bind methods
    this._handleInteraction = this._handleInteraction.bind(this);
    this._updateAnimation = this._updateAnimation.bind(this);
    this._processEntanglement = this._processEntanglement.bind(this);
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize the component
   * @private
   */
  _initialize() {
    // Create base structure
    this._createBaseStructure();
    
    // Apply initial styles
    this._applyBaseStyles();
    
    // Initialize context sensors
    this._initializeContextSensors();
    
    // Set initial state from attributes
    this._initializeFromAttributes();
  }
  
  /**
   * Create the base DOM structure
   * @private
   */
  _createBaseStructure() {
    // Create main container
    this._container = document.createElement('div');
    this._container.classList.add('quantum-container');
    
    // Create canvas if needed for quantum effects
    if (this._requiresQuantumRenderer()) {
      this._renderState.canvas = document.createElement('canvas');
      this._renderState.canvas.classList.add('quantum-canvas');
      this._container.appendChild(this._renderState.canvas);
    }
    
    // Create content container
    this._content = document.createElement('div');
    this._content.classList.add('quantum-content');
    this._container.appendChild(this._content);
    
    // Add primary slot
    const slot = document.createElement('slot');
    this._content.appendChild(slot);
    
    // Add container to shadow root
    this.shadowRoot.appendChild(this._container);
  }
  
  /**
   * Apply base CSS styles
   * @private
   */
  _applyBaseStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --quantum-phase: ${this._quantumState.phase};
        --quantum-coherence: ${this._quantumState.coherence};
        --quantum-energy: ${this._quantumState.energyLevel};
        --quantum-depth: ${this._material.properties.depth};
        --quantum-luminance: ${this._material.properties.luminousCapacity};
        --quantum-clarity: ${this._material.properties.clarity};
        
        display: block;
        position: relative;
        transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.0),
                    opacity 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.0);
      }
      
      .quantum-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: var(--quantum-border-radius, 8px);
        background-color: rgba(255, 255, 255, calc(0.05 + var(--quantum-clarity, 0.65) * 0.15));
        box-shadow: 0 4px 30px rgba(0, 0, 0, calc(0.1 * var(--quantum-depth, 0.2)));
        backdrop-filter: blur(calc(var(--quantum-clarity, 0.65) * 15px));
        transition: all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.0);
      }
      
      .quantum-container:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          circle at calc(var(--mouse-x, 50%) * 100%) calc(var(--mouse-y, 50%) * 100%),
          rgba(255, 255, 255, calc(0.1 * var(--quantum-luminance, 0.7) * var(--quantum-energy, 0.5))),
          transparent 50%
        );
        opacity: 0.7;
        mix-blend-mode: overlay;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1;
      }
      
      .quantum-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }
      
      .quantum-content {
        position: relative;
        z-index: 2;
        padding: var(--quantum-content-padding, 16px);
      }
      
      /* Quantum states */
      :host([state="active"]) {
        --quantum-energy: 1;
      }
      
      :host([state="inactive"]) {
        --quantum-energy: 0.2;
      }
      
      /* Variants */
      :host([variant="frost"]) .quantum-container {
        --quantum-clarity: 0.8;
        --quantum-luminance: 0.5;
        background-color: rgba(240, 245, 255, calc(0.1 + var(--quantum-clarity) * 0.15));
      }
      
      :host([variant="nebula"]) .quantum-container {
        --quantum-clarity: 0.6;
        --quantum-luminance: 0.8;
        background-color: rgba(230, 240, 255, calc(0.05 + var(--quantum-clarity) * 0.1));
      }
      
      :host([variant="crystal"]) .quantum-container {
        --quantum-clarity: 0.9;
        --quantum-luminance: 0.9;
        --quantum-refraction: 1.5;
        background-color: rgba(255, 255, 255, calc(0.15 + var(--quantum-clarity) * 0.2));
      }
    `;
    this.shadowRoot.appendChild(style);
  }
  
  /**
   * Check if this element requires a quantum renderer
   * @private
   * @returns {boolean}
   */
  _requiresQuantumRenderer() {
    // Check for material, luminance or other attributes that need advanced rendering
    return this.hasAttribute('material') || 
           this.hasAttribute('luminance') ||
           this.getAttribute('variant') === 'nebula' ||
           this.getAttribute('variant') === 'plasma';
  }
  
  /**
   * Initialize context sensors
   * @private
   */
  _initializeContextSensors() {
    // Setup sensors for context awareness
    // This could include ambient light detection, time awareness, etc.
    this._updateTimeContext();
    
    // Set interval for updating time-based context
    this._timeContextInterval = setInterval(() => {
      this._updateTimeContext();
    }, 60000); // Update every minute
  }
  
  /**
   * Initialize from HTML attributes
   * @private
   */
  _initializeFromAttributes() {
    // Set quantum phase if provided
    if (this.hasAttribute('quantum-phase')) {
      this._quantumState.phase = parseFloat(this.getAttribute('quantum-phase'));
      this.style.setProperty('--quantum-phase', this._quantumState.phase);
    }
    
    // Setup entanglement
    if (this.hasAttribute('entanglement-id')) {
      const ids = this.getAttribute('entanglement-id').split(' ');
      this._quantumState.entanglement = ids;
    }
    
    // Material properties
    if (this.hasAttribute('material')) {
      this._material.type = this.getAttribute('material');
    }
    
    if (this.hasAttribute('luminance')) {
      this._material.properties.luminousCapacity = parseFloat(this.getAttribute('luminance'));
      this.style.setProperty('--quantum-luminance', this._material.properties.luminousCapacity);
    }
    
    if (this.hasAttribute('depth')) {
      this._material.properties.depth = parseFloat(this.getAttribute('depth'));
      this.style.setProperty('--quantum-depth', this._material.properties.depth);
    }
  }
  
  /**
   * Update time-based context
   * @private
   */
  _updateTimeContext() {
    this._contextData.timeOfDay = this._getCurrentTimeNormalized();
    this._updateQuantumStateBasedOnContext();
  }
  
  /**
   * Get current time normalized to 0-1 range (0 = midnight, 0.5 = noon)
   * @private
   * @returns {number}
   */
  _getCurrentTimeNormalized() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return (hours * 60 + minutes) / (24 * 60);
  }
  
  /**
   * Connected callback - invoked when element is added to the document
   */
  connectedCallback() {
    // Set up mouse tracking for lighting effects
    this.addEventListener('mousemove', this._handleMouseMove.bind(this));
    
    // Set up interaction listeners
    this.addEventListener('click', this._handleInteraction);
    this.addEventListener('focus', this._handleInteraction);
    this.addEventListener('blur', this._handleInteraction);
    
    // Set up intersection observer to track visibility
    this._setupVisibilityTracking();
    
    // Initialize renderer if needed
    if (this._renderState.canvas) {
      // Attempt to initialize WebGPU first, then WebGL (not implemented yet), then 2D
      this._initializeRenderer();
    }
    
    // Start quantum animation loop
    this._startAnimationLoop();
    
    // Set up entanglement listeners
    if (this._quantumState.entanglement.length > 0) {
      this._setupEntanglement();
    }
    
    // Dispatch connection event
    this.dispatchEvent(new CustomEvent('quantum-connected', {
      bubbles: true,
      composed: true,
      detail: { element: this }
    }));
  }
  
  /**
   * Disconnected callback - invoked when element is removed from the document
   */
  disconnectedCallback() {
    // Clean up event listeners
    this.removeEventListener('mousemove', this._handleMouseMove);
    this.removeEventListener('click', this._handleInteraction);
    this.removeEventListener('focus', this._handleInteraction);
    this.removeEventListener('blur', this._handleInteraction);
    
    // Stop animation loop
    this._stopAnimationLoop();
    
    // Clean up intersection observer
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
    
    // Clean up entanglement listeners
    this._cleanupEntanglement();
    
    // Clear time interval
    if (this._timeContextInterval) {
      clearInterval(this._timeContextInterval);
    }
  }
  
  /**
   * Attribute changed callback
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'variant':
        // Handle variant change
        this._updateVariant(newValue);
        break;
        
      case 'state':
        // Handle state change
        this._updateState(newValue);
        break;
        
      case 'material':
        // Handle material change
        this._material.type = newValue;
        this._updateMaterial();
        break;
        
      case 'luminance':
        // Handle luminance change
        this._material.properties.luminousCapacity = parseFloat(newValue);
        this.style.setProperty('--quantum-luminance', this._material.properties.luminousCapacity);
        break;
        
      case 'depth':
        // Handle depth change
        this._material.properties.depth = parseFloat(newValue);
        this.style.setProperty('--quantum-depth', this._material.properties.depth);
        break;
        
      case 'entanglement-id':
        // Handle entanglement change
        this._cleanupEntanglement();
        this._quantumState.entanglement = newValue ? newValue.split(' ') : [];
        if (this._quantumState.entanglement.length > 0) {
          this._setupEntanglement();
        }
        break;
        
      case 'quantum-phase':
        // Handle phase change
        this._quantumState.phase = parseFloat(newValue);
        this.style.setProperty('--quantum-phase', this._quantumState.phase);
        break;
    }
    
    // Mark as needing render
    this._renderState.needsRender = true;
  }
  
  /**
   * Handle mouse movement
   * @private
   * @param {MouseEvent} event - Mouse event
   */
  _handleMouseMove(event) {
    const rect = this.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    // Update mouse position CSS variables
    this.style.setProperty('--mouse-x', x.toFixed(4));
    this.style.setProperty('--mouse-y', y.toFixed(4));
    
    // Update interaction history
    this._trackInteraction('mousemove', { x, y });
    
    // Request render if using advanced rendering
    if (this._renderState.renderer) {
      this._renderState.needsRender = true;
    }
  }
  
  /**
   * Handle interaction events
   * @private
   * @param {Event} event - Interaction event
   */
  _handleInteraction(event) {
    // Update quantum state
    this._quantumState.lastInteraction = Date.now();
    this._quantumState.usageCount++;
    this._quantumState.energyLevel = 1.0;
    
    // Update CSS variable
    this.style.setProperty('--quantum-energy', this._quantumState.energyLevel);
    
    // Track interaction
    this._trackInteraction(event.type, {
      target: event.target,
      timeStamp: event.timeStamp
    });
    
    // Create ripple effect if it's a click or similar
    if (event.type === 'click' || event.type === 'touchstart') {
      this._createRippleEffect(event);
    }
    
    // Process entanglement - notify entangled elements
    this._processEntanglement(event.type);
    
    // Dispatch quantum interaction event
    this._dispatchQuantumEvent('quantum-interaction', {
      interactionType: event.type,
      energy: this._quantumState.energyLevel,
      phase: this._quantumState.phase
    });
  }
  
  /**
   * Create ripple effect
   * @private
   * @param {Event} event - Interaction event
   */
  _createRippleEffect(event) {
    if (!this._renderState.renderer) return;
    
    // Get coordinates relative to element
    const rect = this.getBoundingClientRect();
    let x, y;
    
    if (event.touches) {
      // Touch event
      x = (event.touches[0].clientX - rect.left) / rect.width;
      y = (event.touches[0].clientY - rect.top) / rect.height;
    } else {
      // Mouse event
      x = (event.clientX - rect.left) / rect.width;
      y = (event.clientY - rect.top) / rect.height;
    }
    
    // Create ripple
    if (this._renderState.renderer.createRipple) {
      this._renderState.renderer.createRipple(x, y, {
        duration: 1000,
        color: [1, 1, 1, 0.3 * this._quantumState.energyLevel],
        spreadFactor: 2.5
      });
    } else {
      // Fallback ripple if no renderer
      this._createDOMRipple(x, y);
    }
  }
  
  /**
   * Create a DOM-based ripple effect (fallback)
   * @private
   * @param {number} x - X coordinate (0-1)
   * @param {number} y - Y coordinate (0-1)
   */
  _createDOMRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('quantum-ripple');
    ripple.style.left = `${x * 100}%`;
    ripple.style.top = `${y * 100}%`;
    
    // Add ripple styles if not already in stylesheet
    if (!this.shadowRoot.querySelector('.quantum-ripple')) {
      const style = document.createElement('style');
      style.textContent = `
        .quantum-ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          pointer-events: none;
          animation: quantum-ripple 1s cubic-bezier(0.2, 0.9, 0.3, 1.0) forwards;
        }
        
        @keyframes quantum-ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
            width: 0;
            height: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
            width: 300%;
            height: 300%;
            margin-left: -150%;
            margin-top: -150%;
          }
        }
      `;
      this.shadowRoot.appendChild(style);
    }
    
    // Add to container and remove after animation
    this._container.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }
  
  /**
   * Set up visibility tracking with IntersectionObserver
   * @private
   */
  _setupVisibilityTracking() {
    if ('IntersectionObserver' in window) {
      this._intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this._contextData.proximityToViewport = entry.isIntersecting ? 0 : 1 - entry.intersectionRatio;
          
          // Update quantum state based on visibility
          if (entry.isIntersecting) {
            this._quantumState.observability = 1.0;
            this._renderState.needsRender = true;
          } else {
            this._quantumState.observability = 0.2;
            this._pauseAnimationIfNeeded();
          }
        });
      }, { threshold: [0, 0.1, 0.5, 1] });
      
      this._intersectionObserver.observe(this);
    }
  }
  
  /**
   * Initialize WebGL/WebGPU renderer
   * @private
   */
  async _initializeRenderer() {
    /**
     * @private
     * Initializes the rendering pipeline.
     * Attempts to use WebGPU first. If WebGPU is not available or initialization fails,
     * it falls back to a 2D canvas context using _initializeCanvas2DRenderer.
     * This setup allows for progressive enhancement of rendering capabilities.
     */
    // Ensure canvas exists before attempting to get a context
    if (!this._renderState.canvas) {
        console.error(`${this.constructor.name}: Canvas element not found for renderer initialization.`);
        this._renderState.renderMode = 'none'; // Indicate no renderer could be set up
        return;
    }

    if (navigator.gpu) {
      console.log(`${this.constructor.name}: WebGPU supported. Attempting to initialize WebGPU renderer...`);
      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
          throw new Error('No GPU adapter found. navigator.gpu.requestAdapter() returned null.');
        }
        this._renderState.webgpu.device = await adapter.requestDevice();
        const device = this._renderState.webgpu.device;

        // Get the WebGPU rendering context from the canvas.
        this._renderState.webgpu.context = this._renderState.canvas.getContext('webgpu');
        const context = this._renderState.webgpu.context;

        // Get the preferred canvas format for the presentation layer.
        this._renderState.webgpu.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        
        // Configure the WebGPU context for the canvas.
        context.configure({
          device,
          format: this._renderState.webgpu.presentationFormat,
          alphaMode: 'premultiplied', // Use 'premultiplied' for proper blending with DOM elements.
        });

        // Define a basic WebGPU render pipeline.
        // This pipeline currently draws a simple triangle with a color based on the initial quantumPhase.
        // It serves as a foundational setup for more complex shaders and rendering.
        // NOTE: The quantumPhase is baked into the shader string at compile time here.
        // For dynamic updates, this value should be passed via a uniform buffer.
        this._renderState.webgpu.pipeline = device.createRenderPipeline({
          layout: 'auto', // Automatically infer bind group layouts from shader.
          vertex: {
            module: device.createShaderModule({
              code: `
                // Basic Vertex Shader for WebGPU
                // Outputs a predefined triangle.
                @vertex
                fn main(@builtin(vertex_index) vi : u32) -> @builtin(position) vec4<f32> {
                  var pos = array<vec2<f32>, 3>(
                    vec2<f32>(0.0, 0.5),  // Top center
                    vec2<f32>(-0.5, -0.5), // Bottom left
                    vec2<f32>(0.5, -0.5)   // Bottom right
                  );
                  return vec4<f32>(pos[vi], 0.0, 1.0);
                }
              `,
            }),
            entryPoint: 'main', // Entry point function in the vertex shader.
          },
          fragment: {
            module: device.createShaderModule({
              code: `
                // Basic Fragment Shader for WebGPU
                // Outputs a color based on the initial quantumPhase.
                // NOTE: This phase value is fixed at pipeline creation time.
                // For dynamic updates, use uniform buffers.
                @fragment
                fn main() -> @location(0) vec4<f32> {
                  let initial_phase = ${this._quantumState.phase.toFixed(4)};
                  return vec4<f32>(initial_phase, 1.0 - initial_phase, 0.5 + initial_phase * 0.5, 1.0);
                }
              `,
            }),
            entryPoint: 'main', // Entry point function in the fragment shader.
            targets: [{ format: this._renderState.webgpu.presentationFormat }], // Match canvas context format.
          },
          primitive: {
            topology: 'triangle-list', // Draw triangles.
          },
        });
        
        // For WebGPU mode, this._renderState.renderer now points to the WebGPU device.
        // The actual rendering commands are issued in _renderWebGPUFrame.
        this._renderState.renderer = this._renderState.webgpu.device;
        this._renderState.renderMode = 'webgpu';
        console.log(`${this.constructor.name}: WebGPU renderer initialized successfully. Render mode: webgpu`);

      } catch (error) {
        console.error(`${this.constructor.name}: WebGPU initialization failed:`, error);
        // If WebGPU fails, fall back to the 2D canvas renderer.
        this._initializeCanvas2DRenderer();
      }
    } else {
      console.log(`${this.constructor.name}: WebGPU not supported by the browser. Falling back to 2D canvas renderer.`);
      this._initializeCanvas2DRenderer();
    }
    
    this._renderState.needsRender = true; // Trigger an initial render.
  }

  _initializeCanvas2DRenderer() {
    /**
     * @private
     * Initializes the fallback 2D canvas renderer.
     * This is used if WebGPU is not available or fails to initialize.
     * The structure of this.renderer is an object with a 'render' method.
     */
    // Ensure canvas exists
    if (!this._renderState.canvas) {
        console.error(`${this.constructor.name}: Canvas element not found for 2D renderer initialization.`);
        this._renderState.renderMode = 'none'; // Indicate no renderer could be set up
        return;
    }
    const ctx = this._renderState.canvas.getContext('2d');
    this._renderState.renderer = {
      ctx: ctx,
      ripples: [],
      maxRipples: 10,
      
      createRipple: (x, y, options = {}) => {
        const ripple = {
          x, y,
          radius: options.radius || 0,
          maxRadius: options.maxRadius || 50,
          speed: options.speed || 1,
          color: options.color || 'rgba(255, 255, 255, 0.3)',
          life: 0,
          maxLife: options.maxLife || 60
        };
        // Manage ripples array
        if (!this._renderState.renderer.ripples) this._renderState.renderer.ripples = []; // Ensure array exists
        if (this._renderState.renderer.ripples.length >= this._renderState.renderer.maxRipples) {
          this._renderState.renderer.ripples.shift();
        }
        this._renderState.renderer.ripples.push(ripple);
      },
      
      render: (timestamp) => {
        // This 'render' method is called by _updateAnimation for 2D mode.
        if (!this._renderState.canvas || !this._renderState.renderer || !this._renderState.renderer.ctx) return;

        // Ripples might still need to animate even if needsRender is false for the main scene
        const hasActiveRipples = this._renderState.renderer.ripples && this._renderState.renderer.ripples.length > 0;
        if (!this._renderState.needsRender && !hasActiveRipples) return;

        const { ctx } = this._renderState.renderer;
        // Ensure canvas dimensions match the element's client dimensions.
        if (this._renderState.canvas.width !== this.clientWidth || this._renderState.canvas.height !== this.clientHeight) {
            this._renderState.canvas.width = this.clientWidth;
            this._renderState.canvas.height = this.clientHeight;
        }
        if(this._renderState.canvas.width === 0 || this._renderState.canvas.height === 0) return;
        
        ctx.clearRect(0, 0, this._renderState.canvas.width, this._renderState.canvas.height);
        // Call existing 2D drawing methods.
        this._drawQuantumMaterial(ctx, timestamp); // Assumes _drawQuantumMaterial exists and is compatible
        this._drawRipples(ctx, timestamp); // Assumes _drawRipples exists
        this._drawQuantumNoise(ctx, timestamp); // Assumes _drawQuantumNoise exists
      }
    };
    this._renderState.renderMode = '2d';
    console.log(`${this.constructor.name}: Initialized 2D Canvas Renderer as fallback. Render mode: 2d`);
  }

  _renderWebGPUFrame() {
    /**
     * @private
     * Renders a single frame using the WebGPU pipeline.
     * This basic implementation clears the canvas and draws a triangle.
     * Called by _updateAnimation when renderMode is 'webgpu'.
     */
    if (!this._renderState.webgpu.device || !this._renderState.webgpu.context || !this._renderState.webgpu.pipeline) {
      console.warn(`${this.constructor.name}: WebGPU resources not ready for rendering.`);
      return;
    }

    const canvas = this._renderState.canvas;
    if (!canvas) {
        console.warn(`${this.constructor.name}: WebGPU frame render: Canvas not found.`);
        return;
    }
    
    if (canvas.width !== this.clientWidth || canvas.height !== this.clientHeight) {
      canvas.width = this.clientWidth;
      canvas.height = this.clientHeight;
      // Note: For robust WebGPU resizing, context.configure() might need to be called again,
      // or render targets/pipelines might need recreation if they depend on size.
      // For this basic example, we assume the configured context handles it or the pipeline is size-agnostic.
      // A more robust solution would check if the context needs reconfiguration.
      if (this._renderState.webgpu.context && this._renderState.webgpu.device && this._renderState.webgpu.presentationFormat) {
        try {
            this._renderState.webgpu.context.configure({
                device: this._renderState.webgpu.device,
                format: this._renderState.webgpu.presentationFormat,
                alphaMode: 'premultiplied',
                // Optional: Add usage if needed, though usually inferred
                // usage: GPUTextureUsage.RENDER_ATTACHMENT
            });
        } catch (e) {
            console.error(`${this.constructor.name}: Error re-configuring WebGPU context on resize:`, e);
            // Potentially fall back or stop rendering if configuration fails
            return;
        }
      }
    }
    if(canvas.width === 0 || canvas.height === 0) return;

    const device = this._renderState.webgpu.device;
    const context = this._renderState.webgpu.context;
    const pipeline = this._renderState.webgpu.pipeline;

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.05, g: 0.05, b: 0.1, a: 1.0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
  }
  
  /**
   * Draw quantum material effect
   * @private
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} timestamp - Animation timestamp
   */
  _drawQuantumMaterial(ctx, timestamp) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Base material gradient
    const gradient = ctx.createRadialGradient(
      width * (parseFloat(this.style.getPropertyValue('--mouse-x')) || 0.5),
      height * (parseFloat(this.style.getPropertyValue('--mouse-y')) || 0.5),
      0,
      width * (parseFloat(this.style.getPropertyValue('--mouse-x')) || 0.5),
      height * (parseFloat(this.style.getPropertyValue('--mouse-y')) || 0.5),
      width * 0.8
    );
    
    // Get color based on material type
    let baseColor, glowColor;
    switch (this._material.type) {
      case 'nebula':
        baseColor = 'rgba(80, 105, 200, 0.1)';
        glowColor = 'rgba(140, 180, 255, 0.2)';
        break;
      case 'frost':
        baseColor = 'rgba(220, 240, 255, 0.1)';
        glowColor = 'rgba(255, 255, 255, 0.15)';
        break;
      case 'crystal':
        baseColor = 'rgba(220, 255, 240, 0.1)';
        glowColor = 'rgba(200, 255, 240, 0.2)';
        break;
      default: // quantum-glass
        baseColor = 'rgba(240, 240, 255, 0.08)';
        glowColor = 'rgba(255, 255, 255, 0.1)';
    }
    
    gradient.addColorStop(0, glowColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Draw base
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw glow
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw ripples
    if (this._ripples && this._ripples.length > 0) {
      this._drawRipples(ctx, timestamp);
    }
    
    // Draw quantum noise
    this._drawQuantumNoise(ctx, timestamp);
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  }
  
  /**
   * Draw ripple effects
   * @private
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} timestamp - Animation timestamp
   */
  _drawRipples(ctx, timestamp) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Process each ripple
    this._ripples = this._ripples.filter(ripple => {
      const elapsed = timestamp - ripple.startTime;
      const progress = Math.min(elapsed / ripple.duration, 1);
      
      if (progress < 1) {
        // Draw ripple
        const x = ripple.x * width;
        const y = ripple.y * height;
        const maxRadius = Math.max(width, height) * ripple.spreadFactor;
        const radius = progress * maxRadius;
        
        const [r, g, b, a] = ripple.color;
        const alpha = a * (1 - progress);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${alpha})`;
        ctx.fill();
        
        return true; // Keep ripple
      }
      
      return false; // Remove ripple
    });
  }
  
  /**
   * Draw quantum noise effect
   * @private
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} timestamp - Animation timestamp
   */
  _drawQuantumNoise(ctx, timestamp) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const noiseIntensity = this._material.properties.quantumNoise * this._quantumState.coherence;
    
    if (noiseIntensity < 0.01) return;
    
    // Simple noise implementation
    ctx.globalAlpha = noiseIntensity * 0.1;
    ctx.globalCompositeOperation = 'overlay';
    
    // Create noise
    const pixels = 100; // Adjust for performance
    const size = width / pixels;
    
    for (let x = 0; x < pixels; x++) {
      for (let y = 0; y < pixels; y++) {
        const value = Math.random();
        if (value > 0.94) {
          ctx.fillStyle = `rgba(255, 255, 255, ${value * 0.2})`;
          ctx.fillRect(x * size, y * size, size, size);
        }
      }
    }
    
    // Reset alpha
    ctx.globalAlpha = 1;
  }
  
  /**
   * Start animation loop
   * @private
   */
  _startAnimationLoop() {
    if (!this._renderState.animationFrameId) {
      this._updateAnimation();
    }
  }
  
  /**
   * Stop animation loop
   * @private
   */
  _stopAnimationLoop() {
    if (this._renderState.animationFrameId) {
      cancelAnimationFrame(this._renderState.animationFrameId);
      this._renderState.animationFrameId = null;
    }
  }
  
  /**
   * Pause animation if element is not visible
   * @private
   */
  _pauseAnimationIfNeeded() {
    if (this._contextData.proximityToViewport > 0.9) {
      this._stopAnimationLoop();
    }
  }
  
  /**
   * Animation frame update
   * @private
   * @param {number} timestamp - Animation timestamp
   */
  _updateAnimation(timestamp) {
    // Calculate delta time for animation
    if (!this._lastTimestamp) {
      this._lastTimestamp = timestamp;
    }
    const deltaTime = timestamp - this._lastTimestamp;
    this._lastTimestamp = timestamp;
    
    // Update quantum state based on time
    this._updateQuantumStateOverTime(deltaTime);
    
    // Perform rendering based on the active renderMode.
    if (this._renderState.needsRender && this._renderState.renderer) {
      if (this._renderState.renderMode === 'webgpu') {
        // If WebGPU is active, call the WebGPU frame rendering function.
        this._renderWebGPUFrame(); // This function handles its own logic including canvas size.
      } else if (this._renderState.renderMode === '2d' && typeof this._renderState.renderer.render === 'function') {
        // If 2D canvas is active and has a 'render' method, call it.
        this._renderState.renderer.render(timestamp);
      }
      // Reset the needsRender flag after a frame is processed.
      this._renderState.needsRender = false;
    } else if (this._renderState.renderMode === '2d' &&
               this._renderState.renderer.ripples &&
               this._renderState.renderer.ripples.length > 0 &&
               typeof this._renderState.renderer.render === 'function') {
      // For 2D mode, continue rendering if there are active ripples,
      // even if needsRender is false, to ensure ripple animations complete.
      this._renderState.renderer.render(timestamp);
    }
    
    // Schedule next frame
    this._renderState.animationFrameId = requestAnimationFrame(this._updateAnimation);
  }
  
  /**
   * Update quantum state over time
   * @private
   * @param {number} deltaTime - Time since last update in ms
   */
  _updateQuantumStateOverTime(deltaTime) {
    // Update phase
    this._quantumState.phase = (this._quantumState.phase + deltaTime * 0.0001) % 1;
    this.style.setProperty('--quantum-phase', this._quantumState.phase);
    
    // Decay energy level over time
    if (this._quantumState.energyLevel > 0.5) {
      const decay = deltaTime * 0.0005;
      this._quantumState.energyLevel = Math.max(0.5, this._quantumState.energyLevel - decay);
      this.style.setProperty('--quantum-energy', this._quantumState.energyLevel);
    }
    
    // Mark as needing render
    this._renderState.needsRender = true;
  }
  
  /**
   * Update quantum state based on context
   * @private
   */
  _updateQuantumStateBasedOnContext() {
    // Adjust coherence based on time of day
    // Morning/evening has higher coherence (more quantum effects)
    const timeOfDay = this._contextData.timeOfDay;
    const timeCoherence = timeOfDay < 0.25 || timeOfDay > 0.75 ? 
                           1.0 : // Evening/night
                           0.8;  // Day
    
    // Environmental light affects observability
    const environmentalLightFactor = this._contextData.environmentalLight;
    const observabilityFactor = 0.7 + (environmentalLightFactor * 0.3);
    
    // Device performance affects coherence
    const performanceFactor = this._contextData.devicePerformance;
    const performanceCoherence = 0.5 + (performanceFactor * 0.5);
    
    // Combine factors
    this._quantumState.coherence = Math.min(1.0, timeCoherence * performanceCoherence);
    this._quantumState.observability = observabilityFactor;
    
    // Update CSS variables
    this.style.setProperty('--quantum-coherence', this._quantumState.coherence);
    
    // Mark as needing render
    this._renderState.needsRender = true;
  }
  
  /**
   * Update variant styling
   * @private
   * @param {string} variant - Variant name
   */
  _updateVariant(variant) {
    // This implementation would normally update material properties based on variant
    switch (variant) {
      case 'frost':
        this._material.properties.clarity = 0.8;
        this._material.properties.luminousCapacity = 0.5;
        this._material.properties.quantumNoise = 0.1;
        break;
        
      case 'nebula':
        this._material.properties.clarity = 0.6;
        this._material.properties.luminousCapacity = 0.8;
        this._material.properties.quantumNoise = 0.2;
        break;
        
      case 'crystal':
        this._material.properties.clarity = 0.9;
        this._material.properties.luminousCapacity = 0.9;
        this._material.properties.quantumNoise = 0.05;
        break;
        
      default: // quantum-glass
        this._material.properties.clarity = 0.65;
        this._material.properties.luminousCapacity = 0.7;
        this._material.properties.quantumNoise = 0.15;
    }
    
    // Update CSS variables
    this.style.setProperty('--quantum-clarity', this._material.properties.clarity);
    this.style.setProperty('--quantum-luminance', this._material.properties.luminousCapacity);
    
    // Mark as needing render
    this._renderState.needsRender = true;
  }
  
  /**
   * Update state styling
   * @private
   * @param {string} state - State name
   */
  _updateState(state) {
    switch (state) {
      case 'active':
        this._quantumState.energyLevel = 1.0;
        break;
        
      case 'inactive':
        this._quantumState.energyLevel = 0.2;
        break;
        
      case 'focused':
        this._quantumState.energyLevel = 0.8;
        break;
        
      default: // default state
        this._quantumState.energyLevel = 0.5;
    }
    
    // Update CSS variable
    this.style.setProperty('--quantum-energy', this._quantumState.energyLevel);
    
    // Mark as needing render
    this._renderState.needsRender = true;
  }
  
  /**
   * Update material properties
   * @private
   */
  _updateMaterial() {
    // Apply preset materials if recognized
    switch (this._material.type) {
      case 'quantum-glass':
        this._material.properties.clarity = 0.65;
        this._material.properties.refraction = 1.35;
        this._material.properties.luminousCapacity = 0.7;
        this._material.properties.quantumNoise = 0.15;
        break;
        
      case 'frost':
        this._material.properties.clarity = 0.8;
        this._material.properties.refraction = 1.2;
        this._material.properties.luminousCapacity = 0.5;
        this._material.properties.quantumNoise = 0.1;
        break;
        
      case 'nebula':
        this._material.properties.clarity = 0.6;
        this._material.properties.refraction = 1.4;
        this._material.properties.luminousCapacity = 0.8;
        this._material.properties.quantumNoise = 0.2;
        break;
        
      case 'crystal':
        this._material.properties.clarity = 0.9;
        this._material.properties.refraction = 1.5;
        this._material.properties.luminousCapacity = 0.9;
        this._material.properties.quantumNoise = 0.05;
        break;
    }
    
    // Update CSS variables
    this.style.setProperty('--quantum-clarity', this._material.properties.clarity);
    this.style.setProperty('--quantum-luminance', this._material.properties.luminousCapacity);
    
    // Mark as needing render
    this._renderState.needsRender = true;
  }
  
  /**
   * Setup quantum entanglement with other elements
   * @private
   */
  _setupEntanglement() {
    // Listen for quantum events from entangled elements
    document.addEventListener('quantum-interaction', this._processEntanglement);
    
    // Register this element in the global quantum registry
    if (!window._quantumRegistry) {
      window._quantumRegistry = new Map();
    }
    
    window._quantumRegistry.set(this.id, {
      element: this,
      entanglement: this._quantumState.entanglement
    });
  }
  
  /**
   * Clean up entanglement listeners
   * @private
   */
  _cleanupEntanglement() {
    document.removeEventListener('quantum-interaction', this._processEntanglement);
    
    // Remove from registry
    if (window._quantumRegistry && this.id) {
      window._quantumRegistry.delete(this.id);
    }
  }
  
  /**
   * Process entanglement events
   * @private
   * @param {CustomEvent} event - Quantum event
   */
  _processEntanglement(event) {
    // Skip if this is the source element
    if (event.detail && event.detail.sourceId === this.id) {
      return;
    }
    
    // If this element's ID is in the entanglement list of the source,
    // or if the source is in this element's entanglement list
    const sourceId = event.detail?.sourceId;
    const sourceEntanglement = event.detail?.entanglement || [];
    
    const isEntangled = sourceId && (
      this._quantumState.entanglement.includes(sourceId) ||
      sourceEntanglement.includes(this.id)
    );
    
    if (isEntangled) {
      // Apply entanglement effect
      this._applyEntanglementEffect(event.detail);
    }
  }
  
  /**
   * Apply effect from entangled element
   * @private
   * @param {Object} detail - Event detail
   */
  _applyEntanglementEffect(detail) {
    // Adjust energy based on entanglement
    const energyTransfer = detail.energy * 0.7;
    this._quantumState.energyLevel = Math.max(
      this._quantumState.energyLevel,
      energyTransfer
    );
    
    // Phase synchronization
    const phaseDiff = Math.abs(this._quantumState.phase - detail.phase);
    if (phaseDiff > 0.1) {
      // Move phase slightly toward entangled element's phase
      const phaseStep = 0.05;
      if (this._quantumState.phase > detail.phase) {
        this._quantumState.phase -= phaseStep;
      } else {
        this._quantumState.phase += phaseStep;
      }
      this._quantumState.phase = this._quantumState.phase % 1;
    }
    
    // Update CSS variables
    this.style.setProperty('--quantum-energy', this._quantumState.energyLevel);
    this.style.setProperty('--quantum-phase', this._quantumState.phase);
    
    // Visual feedback of entanglement
    this._renderState.needsRender = true;
    
    // Dispatch event for other systems to react
    this._dispatchQuantumEvent('quantum-entanglement', {
      sourceId: detail.sourceId,
      targetId: this.id,
      energy: this._quantumState.energyLevel,
      phase: this._quantumState.phase
    });
  }
  
  /**
   * Track user interaction
   * @private
   * @param {string} type - Interaction type
   * @param {Object} data - Interaction data
   */
  _trackInteraction(type, data) {
    // Add to interaction history
    this._interactionHistory.push({
      type,
      data,
      timestamp: Date.now()
    });
    
    // Keep history limited in size
    if (this._interactionHistory.length > 20) {
      this._interactionHistory.shift();
    }
    
    // Notify observers
    this._notifyObservers('interaction', { type, data });
  }
  
  /**
   * Dispatch a quantum event
   * @private
   * @param {string} name - Event name
   * @param {Object} detail - Event detail
   */
  _dispatchQuantumEvent(name, detail) {
    // Add ID to source
    detail.sourceId = this.id;
    detail.entanglement = this._quantumState.entanglement;
    
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
    
    this.dispatchEvent(event);
  }
  
  /**
   * Register observer
   * @param {string} type - Observer type
   * @param {Function} callback - Observer callback
   * @returns {string} Observer ID
   */
  registerObserver(type, callback) {
    if (!this._observers.has(type)) {
      this._observers.set(type, new Map());
    }
    
    const id = Math.random().toString(36).substr(2, 9);
    this._observers.get(type).set(id, callback);
    
    return id;
  }
  
  /**
   * Unregister observer
   * @param {string} type - Observer type
   * @param {string} id - Observer ID
   */
  unregisterObserver(type, id) {
    if (this._observers.has(type)) {
      this._observers.get(type).delete(id);
    }
  }
  
  /**
   * Notify observers
   * @private
   * @param {string} type - Observer type
   * @param {Object} data - Notification data
   */
  _notifyObservers(type, data) {
    if (this._observers.has(type)) {
      this._observers.get(type).forEach(callback => {
        try {
          callback(data);
        } catch (e) {
          console.error('Error in quantum observer callback', e);
        }
      });
    }
  }
  
  // Public API
  
  /**
   * Get current quantum state
   * @returns {Object} Quantum state
   */
  getQuantumState() {
    return { ...this._quantumState };
  }
  
  /**
   * Set energy level
   * @param {number} energy - Energy level (0-1)
   */
  setEnergyLevel(energy) {
    this._quantumState.energyLevel = Math.max(0, Math.min(1, energy));
    this.style.setProperty('--quantum-energy', this._quantumState.energyLevel);
    this._renderState.needsRender = true;
  }
  
  /**
   * Set phase
   * @param {number} phase - Phase (0-1)
   */
  setPhase(phase) {
    this._quantumState.phase = phase % 1;
    this.style.setProperty('--quantum-phase', this._quantumState.phase);
    this._renderState.needsRender = true;
  }
  
  /**
   * Add entanglement with another element
   * @param {string} elementId - Element ID to entangle with
   */
  addEntanglement(elementId) {
    if (!this._quantumState.entanglement.includes(elementId)) {
      this._quantumState.entanglement.push(elementId);
      this.setAttribute('entanglement-id', this._quantumState.entanglement.join(' '));
      
      // Re-setup entanglement listeners
      this._cleanupEntanglement();
      this._setupEntanglement();
    }
  }
  
  /**
   * Remove entanglement with an element
   * @param {string} elementId - Element ID to remove entanglement with
   */
  removeEntanglement(elementId) {
    const index = this._quantumState.entanglement.indexOf(elementId);
    if (index !== -1) {
      this._quantumState.entanglement.splice(index, 1);
      this.setAttribute('entanglement-id', this._quantumState.entanglement.join(' '));
      
      // Re-setup entanglement listeners
      this._cleanupEntanglement();
      this._setupEntanglement();
    }
  }
}

// Define base element
customElements.define('quantum-element', QuantumElement);