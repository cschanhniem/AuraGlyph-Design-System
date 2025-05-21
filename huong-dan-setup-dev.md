# HƯỚNG DẪN THIẾT LẬP MÔI TRƯỜNG PHÁT TRIỂN AURAGLYPH

## 1. YÊU CẦU HỆ THỐNG

### 1.1 Cấu hình phần cứng tối thiểu
- **CPU**: Intel Core i5 hoặc AMD Ryzen 5 (thế hệ 8 trở lên)
- **RAM**: 16GB trở lên (khuyến nghị 32GB cho WebGL/WebGPU development)
- **GPU**: Card đồ họa hỗ trợ WebGL 2.0 và WebGPU (NVIDIA GTX 1060 / AMD RX 580 trở lên)
- **Ổ cứng**: SSD với ít nhất 100GB dung lượng trống

### 1.2 Hệ điều hành
- **MacOS**: Ventura 13.0 trở lên
- **Windows**: Windows 10/11 (64-bit)
- **Linux**: Ubuntu 22.04 LTS hoặc tương đương

### 1.3 Trình duyệt phát triển
- **Chrome Canary/Dev**: Phiên bản mới nhất (cho WebGPU)
- **Firefox Nightly**: Phiên bản mới nhất
- **Safari Technology Preview**: Phiên bản mới nhất

## 2. CÀI ĐẶT CÔNG CỤ PHÁT TRIỂN CƠ BẢN

### 2.1 Cài đặt Node.js và npm
```bash
# Cài đặt NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Khởi động NVM
source ~/.bashrc # hoặc source ~/.zshrc nếu sử dụng zsh

# Cài đặt Node.js v18 LTS
nvm install 18
nvm use 18

# Kiểm tra phiên bản Node.js và npm
node -v # Kết quả mong đợi: v18.x.x
npm -v # Kết quả mong đợi: 9.x.x
```

### 2.2 Cài đặt PNPM (Package Manager)
```bash
npm install -g pnpm
pnpm -v # Kiểm tra phiên bản pnpm
```

### 2.3 Cài đặt Git
```bash
# MacOS (sử dụng Homebrew)
brew install git

# Ubuntu/Debian
sudo apt update
sudo apt install git

# Windows: Tải và cài đặt từ https://git-scm.com/download/win

# Kiểm tra phiên bản Git
git --version # Kết quả mong đợi: 2.x.x
```

### 2.4 Cài đặt VS Code
- Tải và cài đặt từ: https://code.visualstudio.com/
- Các extension được khuyến nghị:
  - ESLint
  - Prettier
  - WebGL GLSL Editor
  - WGSL (WebGPU Shading Language)
  - TypeScript and JavaScript Language Features
  - Live Share
  - GitHub Copilot (nếu có license)

### 2.5 Cài đặt các công cụ WebGL/WebGPU
```bash
# Cài đặt công cụ shader compiling và validation
npm install -g @webgpu/glslang
npm install -g @webgpu/types
```

## 3. THIẾT LẬP DỰ ÁN AURAGLYPH

### 3.1 Clone repository
```bash
# Clone AuraGlyph repository
git clone https://github.com/AuraGlyph/design-system.git auraglyph
cd auraglyph

# Cài đặt dependencies
pnpm install
```

### 3.2 Cấu trúc thư mục
Dự án AuraGlyph sử dụng cấu trúc thư mục sau:
```
AuraGlyph/
├── design-system/          # Hệ thống thiết kế
│   ├── 00-Vision.md        # Tầm nhìn và triết lý thiết kế
│   ├── 01-foundations/     # Nền tảng thiết kế
│   ├── 02-components/      # Các thành phần UI
│   └── ...
├── react-components/       # Thành phần React
│   ├── components/         # Các thành phần UI
│   ├── quantum/            # Quantum engine
│   └── ...
├── code-implementation/    # Mã nguồn triển khai
│   ├── core/               # Core engine
│   ├── renderers/          # WebGL/WebGPU renderers
│   └── ...
└── ...
```

### 3.3 Cấu hình môi trường phát triển
Tạo file `.env.local` trong thư mục gốc của dự án:
```
# Thiết lập môi trường phát triển
NODE_ENV=development

# WebGPU feature flags
ENABLE_WEBGPU=true
FALLBACK_TO_WEBGL=true

# API Endpoints
API_BASE_URL=http://localhost:3000/api

# Logging
DEBUG_LEVEL=verbose
ENABLE_SHADER_DEBUG=true
```

## 4. THIẾT LẬP MÔI TRƯỜNG PHÁT TRIỂN QUANTUM RENDERER

### 4.1 Cài đặt dependencies cho WebGPU
```bash
cd code-implementation/renderers
pnpm install
```

### 4.2 Thiết lập môi trường WebGPU
1. Mở Chrome Canary hoặc Chrome Dev
2. Vào địa chỉ `chrome://flags`
3. Tìm và bật `#enable-unsafe-webgpu`
4. Khởi động lại trình duyệt

### 4.3 Chạy ứng dụng demo WebGPU
```bash
# Từ thư mục gốc của dự án
cd code-implementation/renderers/webgpu-demo
pnpm dev

# Truy cập http://localhost:5173 để xem demo
```

### 4.4 Kiểm tra khả năng tương thích WebGPU
```javascript
// Sao chép đoạn mã sau vào Console của trình duyệt để kiểm tra WebGPU
async function checkWebGPU() {
  if (!navigator.gpu) {
    console.error('WebGPU không được hỗ trợ trên trình duyệt này');
    return false;
  }
  
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      console.error('Không thể tìm thấy WebGPU adapter');
      return false;
    }
    
    const device = await adapter.requestDevice();
    console.log('WebGPU được hỗ trợ!', device);
    return true;
  } catch (error) {
    console.error('Lỗi khởi tạo WebGPU:', error);
    return false;
  }
}

checkWebGPU();
```

## 5. THIẾT LẬP MÔI TRƯỜNG PHÁT TRIỂN REACT COMPONENTS

### 5.1 Cài đặt dependencies cho React Components
```bash
cd react-components
pnpm install
```

### 5.2 Chạy Storybook để phát triển components
```bash
pnpm storybook

# Truy cập http://localhost:6006 để xem Storybook
```

### 5.3 Chạy môi trường phát triển React
```bash
pnpm dev

# Truy cập http://localhost:3000 để xem ứng dụng demo
```

## 6. QUY TRÌNH PHÁT TRIỂN

### 6.1 Quy trình Git Flow
AuraGlyph sử dụng quy trình Git Flow cải tiến:

- `main`: Branch sản phẩm, luôn ở trạng thái ổn định
- `develop`: Branch phát triển chính
- `feature/*`: Các tính năng mới (ví dụ: `feature/quantum-color-system`)
- `experiment/*`: Các thử nghiệm không đảm bảo sẽ được merge
- `release/*`: Chuẩn bị phát hành
- `hotfix/*`: Sửa lỗi khẩn cấp

### 6.2 Quy trình commit
Sử dụng conventional commits để dễ dàng theo dõi thay đổi:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Ví dụ:
```
feat(quantum-renderer): thêm shader cho hiệu ứng Sentient Grain

- Thêm fragment shader xử lý texture grain
- Tối ưu hóa hiệu suất với compute shader
- Thêm kiểm soát density và animation speed

Closes #123
```

Các loại commit:
- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Chỉ thay đổi tài liệu
- `style`: Thay đổi không ảnh hưởng đến code (format, dấu cách, v.v.)
- `refactor`: Cải tiến code không thêm tính năng hoặc sửa lỗi
- `perf`: Cải thiện hiệu suất
- `test`: Thêm hoặc sửa test
- `chore`: Thay đổi quá trình build hoặc công cụ phụ trợ

### 6.3 Quy trình Pull Request
1. Tạo branch từ `develop` với quy ước đặt tên phù hợp
2. Phát triển tính năng và commit theo quy ước
3. Chạy tests và đảm bảo code đạt yêu cầu chất lượng
4. Tạo Pull Request vào branch `develop`
5. Chỉ định ít nhất 2 reviewer từ các Tâm liên quan
6. Đợi CI/CD kiểm tra và approval từ reviewers
7. Merge sau khi được chấp thuận

## 7. HƯỚNG DẪN TRIỂN KHAI QUANTUM EFFECTS

### 7.1 Thiết lập shader development
Tạo một shader cơ bản cho Quantum Material:

1. Tạo thư mục và files:
```bash
mkdir -p code-implementation/renderers/quantum-effects/shaders
cd code-implementation/renderers/quantum-effects/shaders
touch quantum-material.wgsl
```

2. Thêm code shader cơ bản vào `quantum-material.wgsl`:
```wgsl
// Vertex shader
struct VertexInput {
  @location(0) position: vec3<f32>,
  @location(1) uv: vec2<f32>,
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

struct Uniforms {
  modelViewProjection: mat4x4<f32>,
  time: f32,
  quantumState: f32,
  energyLevel: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = uniforms.modelViewProjection * vec4<f32>(input.position, 1.0);
  output.uv = input.uv;
  return output;
}

// Fragment shader
@group(0) @binding(1) var textureSampler: sampler;
@group(0) @binding(2) var textureData: texture_2d<f32>;

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
  let uv = input.uv;
  let time = uniforms.time;
  
  // Quantum wavefront effect
  let waveFactor = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
  let energyPulse = sin(time * 2.0) * 0.5 + 0.5;
  
  // Base color from texture
  let baseColor = textureSample(textureData, textureSampler, uv);
  
  // Quantum luminance - state-dependent glow
  let quantumGlow = uniforms.quantumState * vec4<f32>(0.1, 0.5, 1.0, 0.0);
  
  // Energy level affects intensity
  let energyIntensity = uniforms.energyLevel * energyPulse;
  
  // Final color with quantum properties
  let finalColor = baseColor + quantumGlow * waveFactor * energyIntensity;
  
  return finalColor;
}
```

### 7.2 Tích hợp shader vào renderer
Tạo file JavaScript để tích hợp shader với WebGPU:

```bash
touch code-implementation/renderers/quantum-effects/quantum-material.js
```

Thêm code vào file `quantum-material.js`:
```javascript
import quantumShader from './shaders/quantum-material.wgsl';

export class QuantumMaterial {
  constructor(device, options = {}) {
    this.device = device;
    this.options = {
      quantumState: 0.5,
      energyLevel: 0.8,
      ...options
    };
    
    this.initialize();
  }
  
  async initialize() {
    // Tạo pipeline layout
    this.pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [this.createBindGroupLayout()]
    });
    
    // Tạo shader module
    this.shaderModule = this.device.createShaderModule({
      code: quantumShader
    });
    
    // Thiết lập rendering pipeline
    this.pipeline = await this.createRenderPipeline();
    
    // Khởi tạo uniforms buffer
    this.initializeUniforms();
  }
  
  createBindGroupLayout() {
    return this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
          buffer: {
            type: 'uniform'
          }
        },
        {
          binding: 1,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: {}
        },
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          texture: {}
        }
      ]
    });
  }
  
  async createRenderPipeline() {
    return this.device.createRenderPipeline({
      layout: this.pipelineLayout,
      vertex: {
        module: this.shaderModule,
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 20, // 3 floats for position + 2 for uv = 5 floats * 4 bytes
            attributes: [
              {
                // position
                shaderLocation: 0,
                offset: 0,
                format: 'float32x3'
              },
              {
                // uv
                shaderLocation: 1,
                offset: 12, // 3 floats * 4 bytes
                format: 'float32x2'
              }
            ]
          }
        ]
      },
      fragment: {
        module: this.shaderModule,
        entryPoint: 'fs_main',
        targets: [
          {
            format: navigator.gpu.getPreferredCanvasFormat()
          }
        ]
      },
      primitive: {
        topology: 'triangle-list'
      },
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus'
      }
    });
  }
  
  initializeUniforms() {
    // Tạo uniform buffer
    const uniformBufferSize = 
      16 * 4 + // mat4x4 (modelViewProjection)
      4 +      // float (time)
      4 +      // float (quantumState)
      4;       // float (energyLevel)
    
    this.uniformBuffer = this.device.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    
    // Khởi tạo giá trị
    this.uniforms = {
      modelViewProjection: new Float32Array(16),
      time: 0,
      quantumState: this.options.quantumState,
      energyLevel: this.options.energyLevel
    };
  }
  
  update(deltaTime, modelViewProjection) {
    // Cập nhật thời gian
    this.uniforms.time += deltaTime;
    
    // Cập nhật ma trận modelViewProjection
    if (modelViewProjection) {
      this.uniforms.modelViewProjection.set(modelViewProjection);
    }
    
    // Cập nhật uniform buffer
    const uniformsArray = new Float32Array([
      ...this.uniforms.modelViewProjection,
      this.uniforms.time,
      this.uniforms.quantumState,
      this.uniforms.energyLevel
    ]);
    
    this.device.queue.writeBuffer(
      this.uniformBuffer,
      0,
      uniformsArray.buffer,
      uniformsArray.byteOffset,
      uniformsArray.byteLength
    );
  }
  
  // Phương thức để thay đổi quantum state
  setQuantumState(value) {
    this.uniforms.quantumState = Math.max(0, Math.min(1, value));
  }
  
  // Phương thức để thay đổi energy level
  setEnergyLevel(value) {
    this.uniforms.energyLevel = Math.max(0, Math.min(1, value));
  }
  
  // Tạo bind group với texture
  createBindGroup(sampler, texture) {
    return this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer
          }
        },
        {
          binding: 1,
          resource: sampler
        },
        {
          binding: 2,
          resource: texture.createView()
        }
      ]
    });
  }
}
```

## 8. KIỂM TRA MÔI TRƯỜNG PHÁT TRIỂN

### 8.1 Checklist kiểm tra môi trường
Chạy script kiểm tra để đảm bảo môi trường phát triển đã được thiết lập đúng:

```bash
# Từ thư mục gốc của dự án
cd scripts
node check-environment.js
```

Kết quả mong đợi:
```
✅ Node.js: v18.x.x
✅ PNPM: 8.x.x
✅ Git: 2.x.x
✅ WebGPU support: Available
✅ Project structure: Valid
✅ Dependencies: Installed
✅ Dev environment: Ready
```

### 8.2 Giải quyết vấn đề phổ biến

1. **WebGPU không khả dụng**
   - Đảm bảo bạn đang sử dụng Chrome Canary hoặc Chrome Dev mới nhất
   - Đảm bảo đã bật flag `#enable-unsafe-webgpu`
   - Kiểm tra card đồ họa của bạn có hỗ trợ WebGPU

2. **Lỗi khi cài đặt dependencies**
   - Xóa `node_modules` và file lock, sau đó cài đặt lại
   ```bash
   rm -rf node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

3. **Shader không biên dịch**
   - Kiểm tra cú pháp WGSL
   - Cập nhật trình duyệt lên phiên bản mới nhất
   - Kiểm tra lỗi trong Console của DevTools

## 9. TÀI NGUYÊN HỌC TẬP

### 9.1 WebGPU
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [WebGPU Samples](https://austineng.github.io/webgpu-samples/)
- [WebGPU Specification](https://www.w3.org/TR/webgpu/)

### 9.2 WGSL (WebGPU Shading Language)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WGSL Reference](https://www.w3.org/TR/WGSL/#reference)

### 9.3 AuraGlyph Resources
- [AuraGlyph Design Principles](./design-system/00-Vision.md)
- [AuraGlyph API Documentation](./code-implementation/docs/api.md)
- [Internal Wiki](https://wiki.auraglyph.design)

---

**Phiên bản**: 1.0  
**Ngày cập nhật**: 05/01/2024  
**Người biên soạn**: Đội ngũ Kỹ thuật AuraGlyph