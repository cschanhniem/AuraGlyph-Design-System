# AuraGlyph Design System - React

![AuraGlyph](https://via.placeholder.com/1200x300?text=AuraGlyph+Design+System)

> AuraGlyph - Hệ thống thiết kế lượng tử định hình ngôn ngữ thị giác, không gian và đạo đức của thập kỷ 2025-2035.

## Giới thiệu

AuraGlyph là hệ thống thiết kế tiên phong, phát triển từ Glassmorphism thành một "sinh vật thiết kế" thông minh và có khả năng thích ứng. Với triết lý dựa trên nguyên lý lượng tử, AuraGlyph tạo ra các giao diện động, tương tác và có ý thức, mang lại trải nghiệm người dùng sâu sắc và trực quan.

### Tính năng nổi bật

- **Vật liệu Lượng tử**: Các bề mặt phản ứng với tương tác và ngữ cảnh
- **Hệ thống Entanglement**: Các thành phần UI có thể liên kết và tương tác với nhau
- **Ngữ cảnh Thích ứng**: Giao diện điều chỉnh theo môi trường và người dùng
- **API Dễ tiếp cận**: Xây dựng trên nền tảng shadcn/ui, dễ dàng áp dụng
- **Hiệu suất cao**: Được tối ưu hóa cho hiệu suất và khả năng mở rộng

## Cài đặt

```bash
# Sử dụng npm
npm install @auraglyph/react

# Sử dụng yarn
yarn add @auraglyph/react

# Sử dụng pnpm
pnpm add @auraglyph/react
```

### Cài đặt dependencies

AuraGlyph yêu cầu một số dependencies để hoạt động đầy đủ:

```bash
# Tailwind CSS và các plugins
npm install tailwindcss-animate class-variance-authority tailwind-merge clsx

# React libraries
npm install @radix-ui/react-slot @react-spring/web
```

### Cấu hình Tailwind CSS

Cập nhật file `tailwind.config.js` của bạn:

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    // ... your content paths
    "./node_modules/@auraglyph/react/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  plugins: [
    require("tailwindcss-animate"),
    // ... your other plugins
  ],
}
```

## Cách sử dụng cơ bản

### 1. Thiết lập QuantumProvider

```jsx
// _app.jsx / _app.tsx
import { QuantumProvider } from '@auraglyph/react';
import '@auraglyph/react/styles.css'; // Import styles

function MyApp({ Component, pageProps }) {
  return (
    <QuantumProvider options={{ 
      adaptability: 0.7,
      quantumEffectsLevel: 'standard'
    }}>
      <Component {...pageProps} />
    </QuantumProvider>
  );
}

export default MyApp;
```

### 2. Sử dụng các thành phần Quantum

```jsx
import { Button, Card, CardHeader, CardContent, CardFooter } from '@auraglyph/react';

function MyComponent() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">AuraGlyph Demo</h1>
      
      <Card 
        quantum
        variant="nebula"
        className="max-w-md mx-auto mb-8"
      >
        <CardHeader>
          <h2 className="text-xl font-semibold">Quantum Card</h2>
        </CardHeader>
        <CardContent>
          <p>Thẻ này sử dụng vật liệu lượng tử "nebula" với hiệu ứng quantum.</p>
        </CardContent>
        <CardFooter>
          <Button quantum variant="quantum-frost">
            Quantum Button
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### 3. Entanglement giữa các thành phần

```jsx
function EntanglementDemo() {
  return (
    <div className="flex gap-8">
      <Button 
        quantum 
        quantumId="button-1"
        entanglement={["button-2"]}
        variant="quantum-nebula"
      >
        Button 1
      </Button>
      
      <Button 
        quantum 
        quantumId="button-2"
        entanglement={["button-1"]}
        variant="quantum-frost"
      >
        Button 2
      </Button>
    </div>
  );
}
```

## Tài liệu Component

### Button

Button với hiệu ứng lượng tử và khả năng tương tác cao.

```jsx
<Button
  // Shadcn props
  variant="default" // default | destructive | outline | secondary | ghost | link | quantum | quantum-nebula | quantum-frost | quantum-crystal
  size="default"    // default | sm | lg | icon
  
  // Quantum props
  quantum={true}           // Bật hiệu ứng lượng tử
  quantumId="my-button"    // ID duy nhất cho button
  entanglement={["other-id"]} // Liên kết với thành phần khác
  depth="medium"           // shallow | medium | deep
  luminance="medium"       // low | medium | high
  clarity="medium"         // low | medium | high
  ripple={true}            // Hiệu ứng gợn sóng khi click
  hoverEffect={true}       // Hiệu ứng khi hover
  animate={true}           // Animation liên tục
>
  Quantum Button
</Button>
```

### Card

Card với vật liệu lượng tử và hiệu ứng thích ứng.

```jsx
<Card
  // Quantum props
  quantum={true}           // Bật hiệu ứng lượng tử
  variant="glass"          // default | glass | nebula | frost | crystal
  depth="medium"           // shallow | medium | deep
  luminance="medium"       // low | medium | high
  clarity="medium"         // low | medium | high
  hoverEffect={true}       // Hiệu ứng khi hover
  animate={true}           // Animation liên tục
  quantumId="my-card"      // ID duy nhất
  entanglement={["btn-id"]} // Liên kết với thành phần khác
>
  <CardHeader>
    <CardTitle>Tiêu đề</CardTitle>
    <CardDescription>Mô tả</CardDescription>
  </CardHeader>
  <CardContent>
    Nội dung thẻ
  </CardContent>
  <CardFooter>
    <Button>Hành động</Button>
  </CardFooter>
</Card>
```

## Các hooks

### useQuantum

Hook kết nối một component với hệ thống lượng tử.

```jsx
function CustomComponent() {
  const { 
    id,                  // ID của thành phần
    phase,               // Pha lượng tử hiện tại (0-1)
    energy,              // Mức năng lượng (0-1)
    coherence,           // Độ gắn kết lượng tử (0-1)
    entanglement,        // Mảng các ID liên kết
    observability,       // Độ hiển thị của hiệu ứng (0-1)
    
    ref,                 // Ref callback - kết nối element với hệ thống lượng tử
    
    setEnergy,           // Hàm đặt năng lượng
    setPhase,            // Hàm đặt pha
    entangleWith,        // Hàm tạo liên kết với thành phần khác
    removeEntanglement,  // Hàm xóa liên kết
    pulse,               // Hàm tạo xung năng lượng
    emitInteraction,     // Hàm phát ra sự kiện tương tác
    
    cssVariables,        // CSS variables cho quantum effects
  } = useQuantum({
    id: 'custom-element',              // Optional ID
    entanglement: ['other-element'],   // Optional liên kết ban đầu
    initialState: {                    // Optional trạng thái ban đầu
      phase: 0.5,
      energyLevel: 0.7,
    },
    onInteraction: (state) => {        // Optional callback
      console.log('Interaction occurred', state);
    },
  });
  
  return (
    <div 
      ref={ref} 
      style={cssVariables} 
      className="quantum-glass"
      onClick={() => pulse(1.0)}
    >
      My Quantum Element - Phase: {phase.toFixed(2)}
    </div>
  );
}
```

### useGlobalQuantum

Hook truy cập trạng thái lượng tử toàn cục.

```jsx
function QuantumController() {
  const { 
    state,            // Trạng thái lượng tử toàn cục
    contextData,      // Dữ liệu ngữ cảnh
    setGlobalEnergy,  // Đặt năng lượng toàn cục
    setGlobalPhase    // Đặt pha toàn cục
  } = useGlobalQuantum();
  
  return (
    <div>
      <p>Current phase: {state.phase.toFixed(2)}</p>
      <button onClick={() => setGlobalEnergy(1.0)}>
        Energize All Components
      </button>
    </div>
  );
}
```

## Các lớp CSS Utility

### Quantum Glass

```jsx
<div className="quantum-glass">
  Quantum Glass Content
</div>
```

### Quantum Variants

```jsx
<div className="quantum-nebula">Nebula Variant</div>
<div className="quantum-frost">Frost Variant</div>
<div className="quantum-crystal">Crystal Variant</div>
```

### Quantum Properties

```jsx
<div className="quantum-depth-1">Shallow Depth</div>
<div className="quantum-depth-2">Medium Depth</div>
<div className="quantum-depth-3">Deep Depth</div>

<div className="quantum-luminance-low">Low Luminance</div>
<div className="quantum-luminance-medium">Medium Luminance</div>
<div className="quantum-luminance-high">High Luminance</div>

<div className="quantum-clarity-low">Low Clarity</div>
<div className="quantum-clarity-medium">Medium Clarity</div>
<div className="quantum-clarity-high">High Clarity</div>
```

### Quantum Animations

```jsx
<div className="animate-quantum-pulse">Pulsing Element</div>
<div className="animate-quantum-breathe">Breathing Element</div>
<div className="animate-quantum-phase-shift">Phase Shifting Element</div>
<div className="animate-quantum-glow">Glowing Element</div>
```

## Advanced Usage

### QuantumProvider Options

```jsx
<QuantumProvider 
  options={{
    // Độ nhạy cảm với ngữ cảnh (0-1)
    contextSensitivity: 0.5,
    
    // Tốc độ thích ứng với thay đổi (0-1)
    adaptability: 0.7,
    
    // Mức độ hiệu ứng lượng tử
    quantumEffectsLevel: 'standard', // 'none' | 'subtle' | 'standard' | 'enhanced' | 'maximum'
    
    // Trạng thái ban đầu
    initialState: {
      phase: 0.2,
      coherence: 0.8,
      energyLevel: 0.5,
    },
    
    // Chế độ debug
    debug: false,
  }}
>
  {/* Your app */}
</QuantumProvider>
```

## Contributing

Chúng tôi luôn hoan nghênh mọi đóng góp! Vui lòng xem [CONTRIBUTING.md](./CONTRIBUTING.md) để biết thêm thông tin.

## License

MIT © [AuraGlyph Organization]