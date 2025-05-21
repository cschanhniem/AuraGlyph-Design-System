# 🔮 HƯỚNG DẪN CÀI ĐẶT AURAGLYPH

## Giới thiệu

AuraGlyph là hệ thống thiết kế tiên tiến, xây dựng với triết lý "vật liệu lượng tử" và "giao diện có ý thức", mang đến trải nghiệm người dùng đột phá cho thập kỷ 2025-2035. Tài liệu này hướng dẫn bạn cài đặt và thiết lập AuraGlyph cho dự án của mình.

## Yêu cầu hệ thống

### Yêu cầu cơ bản
- Node.js phiên bản 16.0.0 trở lên
- npm 7+ hoặc yarn 1.22+ hoặc pnpm 8.x+
- Trình duyệt hỗ trợ WebGL 2.0 (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Yêu cầu nâng cao (cho hiệu ứng đầy đủ)
- Trình duyệt hỗ trợ WebGPU (Chrome 113+ với flag, Edge 113+ với flag, Safari 17+)
- Card đồ họa hỗ trợ WebGPU
- CPU đa nhân và RAM tối thiểu 8GB cho hiệu ứng phức tạp

## Phương pháp cài đặt

### 1. Sử dụng npm/yarn/pnpm

```bash
# Sử dụng npm
npm install @auraglyph/react @auraglyph/core @auraglyph/tokens

# Sử dụng yarn
yarn add @auraglyph/react @auraglyph/core @auraglyph/tokens

# Sử dụng pnpm
pnpm add @auraglyph/react @auraglyph/core @auraglyph/tokens
```

### 2. Cài đặt các bộ xử lý hiệu ứng tùy chọn

```bash
# Sử dụng npm
npm install @auraglyph/webgl-renderer @auraglyph/webgpu-renderer @auraglyph/motion

# Sử dụng yarn
yarn add @auraglyph/webgl-renderer @auraglyph/webgpu-renderer @auraglyph/motion

# Sử dụng pnpm
pnpm add @auraglyph/webgl-renderer @auraglyph/webgpu-renderer @auraglyph/motion
```

### 3. Cài đặt thông qua CDN (cho thử nghiệm nhanh)

```html
<!-- Core CSS -->
<link rel="stylesheet" href="https://cdn.auraglyph.design/core/1.0.0/auraglyph.css">

<!-- Core JavaScript -->
<script src="https://cdn.auraglyph.design/core/1.0.0/auraglyph.js"></script>

<!-- React (nếu sử dụng) -->
<script src="https://cdn.auraglyph.design/react/1.0.0/auraglyph-react.js"></script>
```

## Cấu hình cơ bản

### Thêm CSS cơ sở

```javascript
// Trong JavaScript/TypeScript
import '@auraglyph/core/styles/base.css';
```

hoặc

```css
/* Trong CSS */
@import '@auraglyph/core/styles/base.css';
```

hoặc

```html
<!-- Trong HTML -->
<link rel="stylesheet" href="node_modules/@auraglyph/core/dist/styles/base.css">
```

### Cấu hình Tailwind CSS (nếu sử dụng)

Tạo file `tailwind.config.js` tại thư mục gốc dự án:

```javascript
const { auraGlyphPreset } = require('@auraglyph/tokens/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    // Thêm đường dẫn cho các component AuraGlyph
    './node_modules/@auraglyph/react/dist/**/*.{js,jsx,ts,tsx}',
  ],
  // Thêm preset của AuraGlyph
  presets: [auraGlyphPreset],
  theme: {
    extend: {
      // Mở rộng theme Tailwind (nếu cần)
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

## Thiết lập cho React

### 1. Cài đặt QuantumProvider ở cấp cao nhất

```jsx
// _app.jsx hoặc App.jsx hoặc root component của bạn
import { QuantumProvider } from '@auraglyph/react';

function MyApp({ Component, pageProps }) {
  return (
    <QuantumProvider 
      options={{ 
        adaptability: 0.7,  // Mức độ thích ứng (0-1)
        contextSensitivity: 0.6,  // Độ nhạy với ngữ cảnh (0-1)
        quantumEffectsLevel: 'standard',  // 'none', 'subtle', 'standard', 'enhanced', 'maximum'
        debug: false  // Chế độ debug
      }}
    >
      <Component {...pageProps} />
    </QuantumProvider>
  );
}

export default MyApp;
```

### 2. Sử dụng các thành phần

```jsx
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  CardTitle, 
  CardDescription,
  Input,
  Toggle,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress
} from '@auraglyph/react';

export default function MyComponent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">AuraGlyph Demo</h1>
      
      {/* Basic Button */}
      <Button quantum variant="quantum">Quantum Button</Button>
      
      {/* Card with quantum effects */}
      <Card 
        quantum 
        variant="frost" 
        depth="medium"
        className="mt-6"
      >
        <CardHeader>
          <CardTitle>Quantum Card</CardTitle>
          <CardDescription>Card with quantum frost material</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a card with quantum effects.</p>
          <Input 
            quantum 
            variant="frost" 
            placeholder="Enter text..." 
            className="mt-4" 
          />
        </CardContent>
        <CardFooter>
          <Button quantum variant="quantum">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### 3. Sử dụng hook tùy chỉnh

Tích hợp sâu hơn với hệ thống lượng tử bằng hooks:

```jsx
import { useQuantum, useGlobalQuantum } from '@auraglyph/react';

function CustomQuantumElement() {
  // Hook cục bộ cho thành phần
  const { 
    ref, 
    energy, 
    phase, 
    cssVariables,
    pulse,
    emitInteraction 
  } = useQuantum({
    id: 'custom-element',
    initialState: { energyLevel: 0.6 },
    onInteraction: (state) => {
      console.log('Interaction:', state);
    }
  });
  
  // Hook toàn cục cho hệ thống
  const { state, setGlobalEnergy, setGlobalPhase } = useGlobalQuantum();
  
  return (
    <div 
      ref={ref} 
      style={cssVariables}
      className="quantum-glass p-4 rounded-lg"
      onClick={() => pulse(1.0)}
    >
      <h3>Custom Quantum Element</h3>
      <p>Energy: {energy.toFixed(2)} | Phase: {phase.toFixed(2)}</p>
      <button onClick={() => emitInteraction('custom', 0.8)}>
        Emit Interaction
      </button>
    </div>
  );
}
```

## Thiết lập cho Vue

### 1. Cài đặt plugin AuraGlyph

```javascript
// main.js
import { createApp } from 'vue';
import { AuraGlyphPlugin } from '@auraglyph/vue';
import App from './App.vue';

const app = createApp(App);

app.use(AuraGlyphPlugin, {
  adaptability: 0.7,
  contextSensitivity: 0.6,
  quantumEffectsLevel: 'standard',
  debug: false
});

app.mount('#app');
```

### 2. Sử dụng các thành phần

```vue
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">AuraGlyph Vue Demo</h1>
    
    <quantum-button 
      variant="quantum-nebula" 
      @click="handleClick"
    >
      Quantum Button
    </quantum-button>
    
    <quantum-card 
      variant="frost" 
      class="mt-6"
    >
      <template #header>
        <h3 class="text-lg font-medium">Quantum Card</h3>
        <p class="text-sm text-muted-foreground">Card with frost material</p>
      </template>
      
      <template #default>
        <p>This is a card with quantum effects.</p>
        <quantum-input 
          variant="frost" 
          placeholder="Enter text..." 
          class="mt-4" 
        />
      </template>
      
      <template #footer>
        <quantum-button variant="quantum">Action</quantum-button>
      </template>
    </quantum-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuantum } from '@auraglyph/vue';

const { state, pulse } = useQuantum('my-component');

function handleClick() {
  pulse(1.0);
}
</script>
```

## Thiết lập cho Web Components

### 1. Import và đăng ký Web Components

```javascript
// Trong file JavaScript chính của bạn
import '@auraglyph/webcomponents';

// Đảm bảo các component đã được đăng ký
document.addEventListener('DOMContentLoaded', () => {
  console.log('AuraGlyph components ready:', !!customElements.get('quantum-button'));
});
```

### 2. Sử dụng trong HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AuraGlyph Web Components</title>
  
  <!-- Import AuraGlyph styles -->
  <link rel="stylesheet" href="node_modules/@auraglyph/core/dist/styles/base.css">
  
  <!-- Import AuraGlyph script -->
  <script type="module" src="node_modules/@auraglyph/webcomponents/dist/index.js"></script>
</head>
<body>
  <div class="container p-8">
    <h1 class="text-2xl font-bold mb-6">AuraGlyph Web Components Demo</h1>
    
    <quantum-button variant="quantum-nebula" id="my-button">
      Quantum Button
    </quantum-button>
    
    <quantum-card variant="frost" class="mt-6">
      <div slot="header">
        <h3 class="text-lg font-medium">Quantum Card</h3>
        <p class="text-sm text-muted-foreground">Card with frost material</p>
      </div>
      
      <div slot="content">
        <p>This is a card with quantum effects.</p>
        <quantum-input variant="frost" placeholder="Enter text..." class="mt-4"></quantum-input>
      </div>
      
      <div slot="footer">
        <quantum-button variant="quantum">Action</quantum-button>
      </div>
    </quantum-card>
  </div>

  <script>
    document.getElementById('my-button').addEventListener('click', () => {
      // Tạo quantum pulse
      document.dispatchEvent(new CustomEvent('quantum-pulse', {
        detail: { targetId: 'my-button', intensity: 1.0 }
      }));
    });
  </script>
</body>
</html>
```

## Cấu hình Nâng cao

### 1. Tùy chỉnh theme

Tạo file `auraglyph.config.js` tại thư mục gốc dự án:

```javascript
module.exports = {
  // Tùy chỉnh theme
  theme: {
    // Tùy chỉnh màu sắc cơ bản
    colors: {
      primary: {
        DEFAULT: '#3b82f6',
        foreground: '#ffffff',
      },
      // Các màu khác...
    },
    
    // Tùy chỉnh vật liệu lượng tử
    quantum: {
      glass: {
        clarity: 0.65,
        blur: '12px',
      },
      nebula: {
        colorFrom: 'hsl(225, 80%, 60%)',
        colorTo: 'hsl(270, 80%, 60%)',
      },
      frost: {
        colorBase: 'hsl(210, 90%, 95%)',
        noiseIntensity: 0.15,
      },
      crystal: {
        reflectionFactor: 0.8,
        refractionIndex: 1.35,
      },
    },
    
    // Tùy chỉnh animation
    animation: {
      quantum: {
        duration: '1s',
        curve: 'cubic-bezier(0.2, 0.9, 0.3, 1.0)',
      },
    },
  },
  
  // Tùy chỉnh hiệu ứng
  effects: {
    shimmer: true,
    glow: true,
    breathe: true,
    ripple: true,
  },
  
  // Cấu hình hiệu suất
  performance: {
    adaptiveQuality: true,
    throttleUpdates: true,
    updateInterval: 16, // ms (60fps)
  },
  
  // Cấu hình accessibility
  accessibility: {
    reducedMotion: 'respect-preference', // 'always', 'respect-preference', 'never'
    contrastEnhancement: true,
    focusVisibility: 'enhanced', // 'standard', 'enhanced'
  },
};
```

### 2. Cấu hình hiệu suất

```javascript
// Trong file cấu hình của bạn
import { configureQuantumEngine } from '@auraglyph/core';

configureQuantumEngine({
  // Chiến lược rendering
  renderStrategy: {
    hydrationMode: 'partial',
    updateStrategy: 'batched',
    throttleUpdates: true,
    updateInterval: 16 // ms (60fps)
  },
  
  // Quản lý tài nguyên
  assets: {
    lazyLoad: true,
    preloadCritical: true,
    textureCompression: 'auto', // 'none', 'auto', 'aggressive'
    shaderBundling: true
  },
  
  // Quản lý bộ nhớ
  memory: {
    objectPooling: true,
    gcHints: true,
    resourceTimeout: 60000 // ms
  }
});
```

## Phát hiện Khả năng Trình duyệt

```javascript
import { detectCapabilities } from '@auraglyph/core';

// Kiểm tra khả năng của trình duyệt
async function checkBrowserCapabilities() {
  const capabilities = await detectCapabilities();
  
  console.log('WebGPU support:', capabilities.webgpu);
  console.log('WebGL2 support:', capabilities.webgl2);
  console.log('WebGL1 support:', capabilities.webgl1);
  console.log('Compute Shaders support:', capabilities.computeShaders);
  console.log('Float Textures support:', capabilities.floatTextures);
  console.log('Max Texture Size:', capabilities.maxTextureSize);
  
  // Điều chỉnh cấu hình dựa trên khả năng
  if (!capabilities.webgpu && !capabilities.webgl2) {
    // Giảm hiệu ứng nếu không hỗ trợ
    configureQuantumEngine({
      quantumEffectsLevel: 'minimal',
      useBasicRenderer: true
    });
  }
}

checkBrowserCapabilities();
```

## Xử lý lỗi Thường gặp

### 1. "WebGPU không khả dụng"

**Nguyên nhân**: Trình duyệt không hỗ trợ WebGPU hoặc chưa bật tính năng này.

**Giải pháp**:
- Đảm bảo bạn đang sử dụng Chrome 113+, Edge 113+, hoặc Safari 17+
- Đối với Chrome/Edge, truy cập `chrome://flags` hoặc `edge://flags` và bật `#enable-unsafe-webgpu`
- AuraGlyph sẽ tự động sử dụng WebGL nếu WebGPU không khả dụng

### 2. "Hiệu suất kém trên thiết bị di động"

**Nguyên nhân**: Hiệu ứng lượng tử có thể nặng cho thiết bị di động.

**Giải pháp**:
- Giảm mức hiệu ứng trên thiết bị di động:
```javascript
import { isMobile, configureQuantumEngine } from '@auraglyph/core';

if (isMobile()) {
  configureQuantumEngine({
    quantumEffectsLevel: 'subtle',
    adaptiveQuality: true
  });
}
```

### 3. "Type errors in TypeScript"

**Nguyên nhân**: Thiếu tệp định nghĩa kiểu.

**Giải pháp**:
- Đảm bảo cài đặt gói `@auraglyph/types`
- Thêm vào tsconfig.json:
```json
{
  "compilerOptions": {
    "types": ["@auraglyph/types"]
  }
}
```

## Tiếp theo

Sau khi cài đặt thành công AuraGlyph, bạn có thể:

1. **Khám phá tài liệu**:
   - Tài liệu API đầy đủ: [https://docs.auraglyph.design](https://docs.auraglyph.design)
   - Ví dụ tương tác: [https://examples.auraglyph.design](https://examples.auraglyph.design)

2. **Tham gia cộng đồng**:
   - GitHub: [https://github.com/auraglyph/design-system](https://github.com/auraglyph/design-system)
   - Discord: [https://discord.gg/auraglyph](https://discord.gg/auraglyph)

3. **Học tập và phát triển**:
   - Khóa học: [https://learn.auraglyph.design](https://learn.auraglyph.design)
   - Blog kỹ thuật: [https://blog.auraglyph.design](https://blog.auraglyph.design)

---

## Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, hãy liên hệ với chúng tôi:

- **Email**: support@auraglyph.design
- **GitHub Issues**: [https://github.com/auraglyph/design-system/issues](https://github.com/auraglyph/design-system/issues)
- **Twitter**: [@AuraGlyphDesign](https://twitter.com/AuraGlyphDesign)

---

**Phiên bản tài liệu**: 1.0.0  
**Cập nhật**: Tháng 5, 2024