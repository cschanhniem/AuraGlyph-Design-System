# KẾ HOẠCH TRIỂN KHAI KỸ THUẬT QUANTUM MATTER VỚI WEBGPU

## 1. TỔNG QUAN KỸ THUẬT

Quantum Matter là một trong những thành phần cốt lõi của hệ thống thiết kế AuraGlyph, biểu hiện cho vật liệu số có khả năng tồn tại đồng thời ở nhiều trạng thái, thể hiện tính chất lưỡng tính, và phản ứng với ngữ cảnh và tương tác. Kế hoạch này mô tả cách triển khai Quantum Matter sử dụng WebGPU - API đồ họa thế hệ mới cho web.

### 1.1 Định nghĩa kỹ thuật

Quantum Matter là hệ thống vật liệu số bao gồm:
- **Trạng thái lượng tử**: Khả năng tồn tại đồng thời ở nhiều trạng thái
- **Superposition màu sắc**: Layer màu sắc xen kẽ và chuyển đổi theo ngữ cảnh
- **Sentient Grain**: Các hạt vi mô thông minh, phản ứng với tương tác
- **Quantum Luminance**: Ánh sáng có ý thức, thích ứng với ngữ cảnh
- **Entanglement**: Liên kết giữa các thành phần, ảnh hưởng lẫn nhau

### 1.2 Tại sao sử dụng WebGPU?

- **Hiệu suất cao**: Hiệu suất tốt hơn 3-5x so với WebGL
- **Compute Shader**: Hỗ trợ tính toán song song mạnh mẽ
- **Pipelines linh hoạt**: Kiểm soát tốt hơn over render pipeline
- **Storage Buffer**: Quản lý dữ liệu hiệu quả hơn
- **Tương lai web graphics**: Được phát triển bởi W3C với sự hỗ trợ đa nền tảng

## 2. KIẾN TRÚC KỸ THUẬT

### 2.1 Kiến trúc tổng thể

```
┌──────────────────────────────────────────┐
│              AuraGlyph Core              │
└─────────────────┬────────────────────────┘
                   │
┌─────────────────▼────────────────────────┐
│             Quantum Engine               │
├──────────────────────────────────────────┤
│  ┌──────────────┐  ┌───────────────────┐ │
│  │ Quantum State│  │ Context Provider  │ │
│  │  Manager     │  │                   │ │
│  └──────┬───────┘  └─────────┬─────────┘ │
│         │                    │           │
│  ┌──────▼────────────────────▼─────────┐ │
│  │        Entanglement System          │ │
│  └──────┬────────────────────┬─────────┘ │
│         │                    │           │
│  ┌──────▼─────────┐  ┌───────▼─────────┐ │
│  │  Quantum       │  │  WebGPU Renderer │ │
│  │  Material      │◄─┤  + Fallbacks     │ │
│  │  System        │  │                  │ │
│  └────────────────┘  └──────────────────┘ │
└──────────────────────────────────────────┘
```

### 2.2 Kiến trúc WebGPU Renderer

```
┌─────────────────────────────────────────┐
│           WebGPU Renderer               │
├─────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ Device Manager  │ │ Shader Manager  │ │
│ └────────┬────────┘ └────────┬────────┘ │
│          │                   │          │
│ ┌────────▼──────────────────▼────────┐  │
│ │           Pipeline Factory         │  │
│ └────────┬──────────────────┬────────┘  │
│          │                  │           │
│ ┌────────▼─────────┐ ┌─────▼─────────┐  │
│ │ Render Pipeline  │ │Compute Pipeline│  │
│ └────────┬─────────┘ └─────┬─────────┘  │
│          │                 │            │
│ ┌────────▼─────────────────▼─────────┐  │
│ │         Resource Manager           │  │
│ └────────┬─────────────────┬─────────┘  │
│          │                 │            │
│ ┌────────▼─────────┐ ┌─────▼─────────┐  │
│ │  Render Pass     │ │ Compute Pass  │  │
│ │  Manager         │ │ Manager       │  │
│ └──────────────────┘ └───────────────┘  │
└─────────────────────────────────────────┘
```

## 3. TRIỂN KHAI QUANTUM MATTER

### 3.1 Quantum State System

#### 3.1.1 Interface
```typescript
interface QuantumState {
  superposition: number;      // 0-1: Mức độ superposition
  energyLevel: number;        // 0-1: Mức năng lượng
  entanglement: number;       // 0-1: Mức độ liên kết
  coherence: number;          // 0-1: Mức độ coherence
  phase: number;              // 0-2π: Pha hiện tại
  contextReactivity: number;  // 0-1: Mức độ phản ứng với ngữ cảnh
}

interface QuantumStateManager {
  getState(): QuantumState;
  setState(state: Partial<QuantumState>): void;
  interpolateTo(targetState: Partial<QuantumState>, duration: number): Promise<void>;
  observeState(property: keyof QuantumState): Observable<number>;
  entangleWith(target: QuantumStateManager, strength?: number): void;
}
```

#### 3.1.2 Cài đặt cốt lõi
```typescript
class QuantumStateManagerImpl implements QuantumStateManager {
  private state: QuantumState = {
    superposition: 0.5,
    energyLevel: 0.8,
    entanglement: 0.0,
    coherence: 1.0,
    phase: 0,
    contextReactivity: 0.7,
  };
  
  private stateObservables: Map<keyof QuantumState, Subject<number>> = new Map();
  private entanglements: Array<{ target: QuantumStateManager, strength: number }> = [];
  
  constructor(initialState?: Partial<QuantumState>) {
    if (initialState) {
      this.setState(initialState);
    }
    
    // Khởi tạo observables cho mỗi thuộc tính
    Object.keys(this.state).forEach(key => {
      this.stateObservables.set(key as keyof QuantumState, new Subject<number>());
    });
    
    // Cập nhật phase theo thời gian
    this.startPhaseEvolution();
  }
  
  // ... triển khai các phương thức khác
}
```

### 3.2 WebGPU Shaders cho Quantum Matter

#### 3.2.1 Vertex Shader
```wgsl
struct VertexInput {
  @location(0) position: vec3<f32>,
  @location(1) uv: vec2<f32>,
  @location(2) normal: vec3<f32>,
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) worldPosition: vec3<f32>,
  @location(2) normal: vec3<f32>,
};

struct Uniforms {
  modelMatrix: mat4x4<f32>,
  viewMatrix: mat4x4<f32>,
  projectionMatrix: mat4x4<f32>,
  normalMatrix: mat4x4<f32>,
  time: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<uniform> quantumState: QuantumState;

@vertex
fn main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  
  // Superposition effect - subtle vertex displacement
  let displacementFactor = sin(input.position.x * 10.0 + uniforms.time) * quantumState.superposition * 0.02;
  let displacedPosition = input.position + input.normal * displacementFactor;
  
  // Transform to clip space
  let modelPosition = uniforms.modelMatrix * vec4<f32>(displacedPosition, 1.0);
  output.worldPosition = modelPosition.xyz;
  output.position = uniforms.projectionMatrix * uniforms.viewMatrix * modelPosition;
  
  // Pass through texture coordinates
  output.uv = input.uv;
  
  // Transform normal to world space
  output.normal = (uniforms.normalMatrix * vec4<f32>(input.normal, 0.0)).xyz;
  
  return output;
}
```

#### 3.2.2 Fragment Shader
```wgsl
struct FragmentInput {
  @location(0) uv: vec2<f32>,
  @location(1) worldPosition: vec3<f32>,
  @location(2) normal: vec3<f32>,
};

struct QuantumState {
  superposition: f32,
  energyLevel: f32,
  entanglement: f32,
  coherence: f32,
  phase: f32,
  contextReactivity: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<uniform> quantumState: QuantumState;
@group(1) @binding(0) var baseColorSampler: sampler;
@group(1) @binding(1) var baseColorTexture: texture_2d<f32>;
@group(1) @binding(2) var grainTexture: texture_2d<f32>;
@group(1) @binding(3) var noiseTexture: texture_2d<f32>;

@fragment
fn main(input: FragmentInput) -> @location(0) vec4<f32> {
  // Base color from texture
  let baseColor = textureSample(baseColorTexture, baseColorSampler, input.uv);
  
  // Quantum grain effect
  let time = uniforms.time;
  let animatedUV = input.uv + vec2<f32>(sin(time * 0.1), cos(time * 0.1)) * 0.01;
  let grain = textureSample(grainTexture, baseColorSampler, animatedUV).r;
  
  // Noise for quantum fluctuations
  let noiseUV = input.uv * 2.0 + vec2<f32>(time * 0.05, 0.0);
  let noise = textureSample(noiseTexture, baseColorSampler, noiseUV).r;
  
  // Quantum superposition effect - color shifting
  let hueShift = sin(quantumState.phase) * quantumState.superposition * 0.1;
  let saturationBoost = quantumState.energyLevel * 0.3;
  
  // Apply hue shift (simplified approach)
  let colorShifted = shiftHue(baseColor.rgb, hueShift);
  
  // Apply saturation based on energy level
  let colorSaturated = adjustSaturation(colorShifted, 1.0 + saturationBoost);
  
  // Add quantum grain
  let grainIntensity = 0.05 * quantumState.coherence;
  let grainEffect = mix(vec3<f32>(1.0), vec3<f32>(grain), grainIntensity);
  
  // Quantum glow based on energy level
  let glowColor = vec3<f32>(0.3, 0.7, 1.0) * quantumState.energyLevel;
  let glowIntensity = noise * quantumState.energyLevel * 0.15;
  
  // Final color with all quantum effects
  let finalColor = colorSaturated * grainEffect + glowColor * glowIntensity;
  
  return vec4<f32>(finalColor, baseColor.a);
}

// Helper functions for color manipulation
fn shiftHue(color: vec3<f32>, shift: f32) -> vec3<f32> {
  // ... implement hue shifting logic
  return color; // Placeholder
}

fn adjustSaturation(color: vec3<f32>, saturationFactor: f32) -> vec3<f32> {
  // ... implement saturation adjustment
  return color; // Placeholder
}
```

#### 3.2.3 Compute Shader cho Particle System
```wgsl
struct Particle {
  position: vec4<f32>,
  velocity: vec4<f32>,
  color: vec4<f32>,
  age: f32,
  lifetime: f32,
  size: f32,
  type: f32,
};

struct SimulationParams {
  deltaTime: f32,
  energyLevel: f32,
  coherence: f32,
  attractorPosition: vec4<f32>,
  attractorStrength: f32,
  randomSeed: f32,
};

@group(0) @binding(0) var<uniform> params: SimulationParams;
@group(0) @binding(1) var<storage, read_write> particles: array<Particle>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  if (index >= arrayLength(&particles)) {
    return;
  }
  
  var particle = particles[index];
  
  // Update age
  particle.age += params.deltaTime;
  if (particle.age >= particle.lifetime) {
    // Respawn particle
    respawnParticle(&particle, params.randomSeed + f32(index));
  } else {
    // Update particle based on quantum state
    updateParticle(&particle, params);
  }
  
  // Write back
  particles[index] = particle;
}

fn updateParticle(particle: ptr<function, Particle>, params: SimulationParams) {
  // Apply attractor force based on energy level
  let attractorDir = params.attractorPosition.xyz - (*particle).position.xyz;
  let distance = length(attractorDir);
  let normalizedDir = attractorDir / max(distance, 0.001);
  
  // Quantum coherence affects how particles follow rules
  let coherenceFactor = mix(
    randomFloat((*particle).position.xy + vec2<f32>(params.randomSeed)), 
    1.0, 
    params.coherence
  );
  
  // Energy level affects strength of movement
  let attractionStrength = params.attractorStrength * params.energyLevel * coherenceFactor;
  let acceleration = normalizedDir * attractionStrength / max(distance * distance, 0.1);
  
  // Update velocity with some damping
  (*particle).velocity.xyz = (*particle).velocity.xyz * 0.95 + acceleration * params.deltaTime;
  
  // Update position
  (*particle).position.xyz += (*particle).velocity.xyz * params.deltaTime;
  
  // Energy level affects particle color and size
  let lifeProgress = (*particle).age / (*particle).lifetime;
  (*particle).color = mix(
    vec4<f32>(0.1, 0.3, 0.9, 1.0),  // Cool blue at low energy
    vec4<f32>(0.9, 0.5, 0.2, 1.0),  // Warm orange at high energy
    params.energyLevel
  );
  
  // Fade transparency near end of life
  (*particle).color.a = 1.0 - smoothstep(0.7, 1.0, lifeProgress);
  
  // Particle size pulses with energy
  (*particle).size = mix(
    (*particle).size * 0.99,
    (*particle).size * (1.0 + 0.05 * sin(params.randomSeed * 10.0)),
    params.energyLevel
  );
}

fn respawnParticle(particle: ptr<function, Particle>, seed: f32) {
  // ... particle respawn logic
}

fn randomFloat(seed: vec2<f32>) -> f32 {
  // ... generate random float from seed
  return 0.5; // Placeholder
}
```

### 3.3 Tối ưu hiệu suất

#### 3.3.1 Adaptive Quality
```typescript
class AdaptiveQualityManager {
  private lastFrameTime: number = 0;
  private frameTimeHistory: number[] = [];
  private currentQualityLevel: number = 1.0; // 0.0 - 1.0
  
  constructor(
    private targetFPS: number = 60,
    private minQuality: number = 0.3,
    private maxQuality: number = 1.0,
    private adaptationRate: number = 0.05
  ) {}
  
  public updateQuality(currentTime: number): number {
    if (this.lastFrameTime === 0) {
      this.lastFrameTime = currentTime;
      return this.currentQualityLevel;
    }
    
    // Calculate frame time
    const frameTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;
    
    // Add to history and keep only recent frames
    this.frameTimeHistory.push(frameTime);
    if (this.frameTimeHistory.length > 30) {
      this.frameTimeHistory.shift();
    }
    
    // Calculate average frame time
    const avgFrameTime = this.frameTimeHistory.reduce((sum, time) => sum + time, 0) 
                        / this.frameTimeHistory.length;
    
    // Calculate target frame time in ms
    const targetFrameTime = 1000 / this.targetFPS;
    
    // Adjust quality level based on performance
    if (avgFrameTime > targetFrameTime * 1.1) {
      // Too slow, reduce quality
      this.currentQualityLevel = Math.max(
        this.minQuality,
        this.currentQualityLevel - this.adaptationRate
      );
    } else if (avgFrameTime < targetFrameTime * 0.9) {
      // Fast enough, increase quality
      this.currentQualityLevel = Math.min(
        this.maxQuality,
        this.currentQualityLevel + this.adaptationRate * 0.5 // Increase more slowly
      );
    }
    
    return this.currentQualityLevel;
  }
  
  public getCurrentQualityParameters(): QualityParameters {
    // Map quality level to specific parameters
    return {
      particleCount: Math.floor(lerp(100, 1000, this.currentQualityLevel)),
      textureResolution: this.currentQualityLevel > 0.5 ? 1024 : 512,
      shadowQuality: this.currentQualityLevel > 0.7 ? 'high' : 'low',
      postProcessingEffects: this.getPostProcessingConfig(this.currentQualityLevel),
    };
  }
  
  private getPostProcessingConfig(quality: number): PostProcessingConfig {
    // ... return config based on quality
  }
}
```

#### 3.3.2 Level of Detail Strategy
```typescript
interface LODLevel {
  distanceThreshold: number;
  shadingModel: 'full' | 'simplified' | 'basic';
  particleMultiplier: number;
  useComputeShader: boolean;
}

class QuantumMatterLODSystem {
  private lodLevels: LODLevel[] = [
    {
      distanceThreshold: 10,
      shadingModel: 'full',
      particleMultiplier: 1.0,
      useComputeShader: true
    },
    {
      distanceThreshold: 20,
      shadingModel: 'simplified',
      particleMultiplier: 0.6,
      useComputeShader: true
    },
    {
      distanceThreshold: 50,
      shadingModel: 'basic',
      particleMultiplier: 0.3,
      useComputeShader: false
    }
  ];
  
  public getLODForDistance(distance: number): LODLevel {
    for (const level of this.lodLevels) {
      if (distance <= level.distanceThreshold) {
        return level;
      }
    }
    
    // Fallback to the lowest detail level
    return this.lodLevels[this.lodLevels.length - 1];
  }
  
  public updateShaderParameters(distance: number, renderer: QuantumRenderer): void {
    const lod = this.getLODForDistance(distance);
    
    // Update shader selection
    renderer.setShaderModel(lod.shadingModel);
    
    // Update particle count
    renderer.setParticleMultiplier(lod.particleMultiplier);
    
    // Toggle compute vs. vertex shader for particles
    renderer.setUseComputeShader(lod.useComputeShader);
  }
}
```

### 3.4 Graceful Fallbacks

#### 3.4.1 Browser Support Detection
```typescript
class BrowserCapabilityDetector {
  public async detectCapabilities(): Promise<RenderingCapabilities> {
    const capabilities: RenderingCapabilities = {
      webgpu: false,
      webgl2: false,
      webgl1: false,
      computeShaders: false,
      floatTextures: false,
      anisotropicFiltering: false,
      maxTextureSize: 0,
      preferredCanvasFormat: undefined
    };
    
    // Check WebGPU
    if ('gpu' in navigator) {
      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (adapter) {
          capabilities.webgpu = true;
          capabilities.computeShaders = true;
          
          // Get preferred format
          capabilities.preferredCanvasFormat = navigator.gpu.getPreferredCanvasFormat();
          
          // Check limits
          const adapterInfo = await adapter.requestAdapterInfo();
          console.log('WebGPU Adapter:', adapterInfo);
        }
      } catch (error) {
        console.warn('WebGPU capability check failed:', error);
      }
    }
    
    // Check WebGL2
    try {
      const canvas = document.createElement('canvas');
      const gl2 = canvas.getContext('webgl2');
      if (gl2) {
        capabilities.webgl2 = true;
        capabilities.floatTextures = !!gl2.getExtension('EXT_color_buffer_float');
        capabilities.anisotropicFiltering = !!gl2.getExtension('EXT_texture_filter_anisotropic');
        capabilities.maxTextureSize = gl2.getParameter(gl2.MAX_TEXTURE_SIZE);
      }
    } catch (error) {
      console.warn('WebGL2 capability check failed:', error);
    }
    
    // Check WebGL1 as last resort
    if (!capabilities.webgl2) {
      try {
        const canvas = document.createElement('canvas');
        const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl1) {
          capabilities.webgl1 = true;
          capabilities.maxTextureSize = gl1.getParameter(gl1.MAX_TEXTURE_SIZE);
        }
      } catch (error) {
        console.warn('WebGL1 capability check failed:', error);
      }
    }
    
    return capabilities;
  }
}
```

#### 3.4.2 Renderer Selection Strategy
```typescript
class QuantumRendererFactory {
  private capabilities: RenderingCapabilities;
  
  constructor(capabilities: RenderingCapabilities) {
    this.capabilities = capabilities;
  }
  
  public createRenderer(canvas: HTMLCanvasElement, options: RendererOptions): QuantumRenderer {
    // Try to create renderers in order of capability
    if (this.capabilities.webgpu && options.allowWebGPU !== false) {
      try {
        return new WebGPUQuantumRenderer(canvas, options);
      } catch (error) {
        console.warn('Failed to create WebGPU renderer, falling back:', error);
      }
    }
    
    if (this.capabilities.webgl2) {
      try {
        return new WebGL2QuantumRenderer(canvas, options);
      } catch (error) {
        console.warn('Failed to create WebGL2 renderer, falling back:', error);
      }
    }
    
    if (this.capabilities.webgl1) {
      try {
        return new WebGL1QuantumRenderer(canvas, options);
      } catch (error) {
        console.warn('Failed to create WebGL1 renderer, falling back:', error);
      }
    }
    
    // Final fallback to CSS-only renderer with minimal effects
    return new CSSQuantumRenderer(canvas, options);
  }
}
```

## 4. LỘ TRÌNH TRIỂN KHAI

### 4.1 Giai đoạn 1: Foundation (Tuần 1-3)
- Thiết lập kiến trúc WebGPU renderer
- Phát triển shader cơ bản cho Quantum Matter
- Xây dựng Quantum State Management
- Kiểm tra tương thích trình duyệt và fallback

### 4.2 Giai đoạn 2: Core Implementation (Tuần 4-6)
- Phát triển đầy đủ shader WGSL cho Quantum Matter
- Triển khai hệ thống Sentient Grain
- Xây dựng particle system sử dụng compute shader
- Tích hợp với Context Engine

### 4.3 Giai đoạn 3: Advanced Features (Tuần 7-9)
- Triển khai Quantum Luminance effects
- Thêm Entanglement giữa các components
- Tối ưu hiệu suất và cache strategies
- Cải thiện visual fidelity

### 4.4 Giai đoạn 4: Integration & Optimization (Tuần 10-13)
- Tích hợp với React Components
- Triển khai đầy đủ Progressive Enhancement
- Tối ưu hóa cuối cùng
- Tài liệu API và documentation
- Phát triển showcase demos

## 5. CÔNG CỤ TESTING VÀ DEBUG

### 5.1 QuantumMatter Inspector

Phát triển một công cụ visual inspection cho Quantum Matter:

```typescript
class QuantumMatterInspector {
  private inspectorContainer: HTMLElement;
  private renderer: QuantumRenderer;
  private stateManger: QuantumStateManager;
  
  constructor(
    container: HTMLElement,
    renderer: QuantumRenderer,
    stateManager: QuantumStateManager
  ) {
    this.inspectorContainer = document.createElement('div');
    this.inspectorContainer.className = 'quantum-inspector';
    container.appendChild(this.inspectorContainer);
    
    this.renderer = renderer;
    this.stateManger = stateManager;
    
    this.initializeUI();
  }
  
  private initializeUI() {
    // Create controls for quantum state properties
    const properties = [
      'superposition',
      'energyLevel',
      'entanglement',
      'coherence',
      'phase',
      'contextReactivity'
    ];
    
    properties.forEach(prop => {
      this.createPropertyControl(prop as keyof QuantumState);
    });
    
    // Add visualization options
    this.createVisualizationControls();
    
    // Add performance metrics
    this.createPerformanceMetrics();
  }
  
  private createPropertyControl(property: keyof QuantumState) {
    // Create slider control for the property
    const container = document.createElement('div');
    container.className = 'control-group';
    
    const label = document.createElement('label');
    label.textContent = property;
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = String(this.stateManger.getState()[property]);
    
    slider.addEventListener('input', () => {
      const value = parseFloat(slider.value);
      this.stateManger.setState({ [property]: value });
    });
    
    // Add to container
    container.appendChild(label);
    container.appendChild(slider);
    this.inspectorContainer.appendChild(container);
  }
  
  private createVisualizationControls() {
    // Add controls for debug visualization
    const visualizationOptions = [
      { id: 'show-quantum-fields', label: 'Show Quantum Fields' },
      { id: 'show-particle-system', label: 'Show Particle System' },
      { id: 'show-entanglement', label: 'Show Entanglement' }
    ];
    
    const container = document.createElement('div');
    container.className = 'visualization-controls';
    
    visualizationOptions.forEach(opt => {
      const control = document.createElement('div');
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = opt.id;
      
      const label = document.createElement('label');
      label.htmlFor = opt.id;
      label.textContent = opt.label;
      
      checkbox.addEventListener('change', () => {
        this.renderer.setDebugVisualization(opt.id, checkbox.checked);
      });
      
      control.appendChild(checkbox);
      control.appendChild(label);
      container.appendChild(control);
    });
    
    this.inspectorContainer.appendChild(container);
  }
  
  private createPerformanceMetrics() {
    // Create performance metrics display
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'performance-metrics';
    
    const fpsDisplay = document.createElement('div');
    fpsDisplay.className = 'metric';
    fpsDisplay.innerHTML = '<span>FPS:</span> <strong>0</strong>';
    
    const gpuTimeDisplay = document.createElement('div');
    gpuTimeDisplay.className = 'metric';
    gpuTimeDisplay.innerHTML = '<span>GPU Time:</span> <strong>0 ms</strong>';
    
    const particleCountDisplay = document.createElement('div');
    particleCountDisplay.className = 'metric';
    particleCountDisplay.innerHTML = '<span>Particles:</span> <strong>0</strong>';
    
    metricsContainer.appendChild(fpsDisplay);
    metricsContainer.appendChild(gpuTimeDisplay);
    metricsContainer.appendChild(particleCountDisplay);
    this.inspectorContainer.appendChild(metricsContainer);
    
    // Update metrics periodically
    let lastTime = performance.now();
    let frames = 0;
    
    const updateMetrics = () => {
      const now = performance.now();
      frames++;
      
      if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        fpsDisplay.querySelector('strong')!.textContent = String(fps);
        
        const metrics = this.renderer.getPerformanceMetrics();
        gpuTimeDisplay.querySelector('strong')!.textContent = `${metrics.gpuTime.toFixed(2)} ms`;
        particleCountDisplay.querySelector('strong')!.textContent = String(metrics.particleCount);
        
        frames = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(updateMetrics);
    };
    
    updateMetrics();
  }
}