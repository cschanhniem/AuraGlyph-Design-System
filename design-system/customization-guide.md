# 🎨 HƯỚNG DẪN TÙY CHỈNH HỆ THỐNG THIẾT KẾ AURAGLYPH

## Giới thiệu

AuraGlyph được thiết kế để vừa có tính nhất quán mạnh mẽ vừa có tính linh hoạt cao, cho phép các nhà thiết kế và nhà phát triển tùy chỉnh hệ thống theo nhu cầu cụ thể của dự án và thương hiệu. Tài liệu này hướng dẫn chi tiết cách tùy chỉnh AuraGlyph từ cấp độ token cơ bản đến các tính năng nâng cao như vật liệu lượng tử và hiệu ứng.

## Triết lý Tùy chỉnh

### Nguyên tắc "Quantum Customization"

Tùy chỉnh trong AuraGlyph tuân theo triết lý "Quantum Customization" - một cách tiếp cận đa trạng thái, trong đó:

1. **Superposition của Identity**: Hệ thống duy trì sự cân bằng giữa bản sắc AuraGlyph và bản sắc thương hiệu của bạn
2. **Entanglement của Thành phần**: Khi tùy chỉnh một khía cạnh, các thành phần liên quan sẽ tự động điều chỉnh để duy trì tính nhất quán
3. **Coherence của Thiết kế**: Bất kể mức độ tùy chỉnh, hệ thống luôn đảm bảo tính mạch lạc tổng thể và nguyên tắc cốt lõi
4. **Tiến hóa Adaptation**: Hệ thống tùy chỉnh có thể phát triển theo thời gian, học hỏi từ cách nó được sử dụng

## Phương pháp Tùy chỉnh

AuraGlyph cung cấp bốn cấp độ tùy chỉnh, từ đơn giản đến phức tạp:

1. **Design Token Customization**: Tùy chỉnh màu sắc, kích thước, khoảng cách và các yếu tố cơ bản
2. **CSS Customization**: Tùy chỉnh giao diện và khía cạnh thị giác
3. **JavaScript Configuration**: Tùy chỉnh hành vi và tương tác
4. **Quantum Engine Customization**: Tùy chỉnh các hiệu ứng lượng tử nâng cao

## 1. Tùy chỉnh Design Tokens

### 1.1. Hiểu về Cấu trúc Token

AuraGlyph sử dụng một hệ thống token đa lớp:

```
┌─────────────────────────────────────┐
│ Semantic Tokens                     │
│ (--primary, --card-background, ...) │
├─────────────────────────────────────┤
│ Composite Tokens                    │
│ (--color-blue-500, --space-6, ...)  │
├─────────────────────────────────────┤
│ Core Tokens                         │
│ (hsl values, pixel values, ...)     │
└─────────────────────────────────────┘
```

### 1.2. File Cấu hình Token

Tạo file `auraglyph.tokens.js` tại thư mục gốc của dự án:

```javascript
module.exports = {
  // Tùy chỉnh màu sắc
  colors: {
    // Màu sắc cơ bản
    primary: {
      light: 'hsl(220, 70%, 50%)',
      main: 'hsl(220, 70%, 40%)', 
      dark: 'hsl(220, 70%, 30%)',
      contrast: 'hsl(0, 0%, 100%)'
    },
    
    // Màu sắc lượng tử
    quantum: {
      nebula: {
        from: 'hsl(250, 80%, 60%)',
        to: 'hsl(280, 80%, 50%)'
      },
      frost: {
        base: 'hsl(200, 70%, 95%)',
        accent: 'hsl(200, 80%, 85%)'
      },
      crystal: {
        base: 'hsl(0, 0%, 100%)',
        refraction: 'hsl(190, 90%, 90%)'
      }
    }
  },
  
  // Tùy chỉnh kích thước
  spacing: {
    unit: '0.25rem',
    scale: [0, 1, 2, 4, 6, 8, 12, 16, 24, 32, 40, 48]
  },
  
  // Tùy chỉnh typography
  typography: {
    fontFamily: {
      base: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      heading: '"Montserrat", sans-serif',
      mono: '"Fira Code", monospace'
    },
    fontSize: {
      base: '1rem',
      scale: [0.75, 0.875, 1, 1.125, 1.25, 1.5, 2, 2.5, 3, 4]
    }
  },
  
  // Tùy chỉnh border radius
  radius: {
    base: '0.5rem',
    scale: ['0', '0.125rem', '0.25rem', '0.5rem', '1rem', '2rem', '999px']
  },
  
  // Tùy chỉnh hiệu ứng lượng tử
  quantum: {
    // Mức độ coherence mặc định
    coherence: 0.8,
    
    // Cường độ mặc định cho hiệu ứng
    energy: {
      default: 0.5,
      hover: 0.7,
      active: 0.9
    },
    
    // Độ sâu của lớp
    depth: {
      shallow: '1px',
      medium: '2px',
      deep: '3px'
    },
    
    // Hiệu ứng khúc xạ
    refraction: {
      index: 1.35,
      dispersion: 0.05
    }
  }
};
```

### 1.3. Cách Sử dụng Config

```javascript
// next.config.js, webpack.config.js, etc.
const auraglyphTokens = require('./auraglyph.tokens.js');

module.exports = {
  // ... cấu hình khác
  plugins: [
    require('@auraglyph/webpack-plugin')({
      tokens: auraglyphTokens
    })
  ]
};
```

### 1.4. Mở rộng Tokens qua CSS/SCSS

```scss
// styles/theme.scss
@use '@auraglyph/tokens/scss' with (
  $theme: (
    'colors': (
      'primary': #3b82f6,
      'secondary': #10b981,
      'accent': #8b5cf6
    )
  )
);

// Sử dụng tokens
.custom-element {
  color: var(--aura-color-primary);
  background: var(--aura-color-secondary);
  padding: calc(var(--aura-space-4) * 1px);
}
```

## 2. Tùy chỉnh CSS

### 2.1. Lớp CSS

AuraGlyph thực hiện tùy chỉnh CSS qua hệ thống lớp:

```
┌───────────────────────────────────┐
│ 4. Custom CSS                     │
├───────────────────────────────────┤
│ 3. Component-specific CSS         │
├───────────────────────────────────┤
│ 2. AuraGlyph Variants CSS         │
├───────────────────────────────────┤
│ 1. AuraGlyph Base CSS             │
└───────────────────────────────────┘
```

### 2.2. Ghi đè CSS Classes

```css
/* styles/custom-quantum.css */
.quantum-card {
  --card-radius: 1.5rem;
  --card-padding: 1.5rem;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.quantum-button {
  --button-border-width: 1px;
  --button-text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Điều chỉnh biến thể */
.quantum-nebula {
  --nebula-color-from: hsl(270, 80%, 60%);
  --nebula-color-to: hsl(310, 80%, 60%);
  --nebula-grain-intensity: 0.2;
}
```

### 2.3. CSS Module Theme

```javascript
// theme.module.css
.themeContainer {
  /* Ghi đè các biến AuraGlyph */
  --aura-radius-md: 0.75rem;
  --aura-font-sans: 'Roboto', sans-serif;
  --aura-quantum-energy: 0.7;
  
  /* Thêm các biến chủ đề riêng */
  --theme-special-gradient: linear-gradient(45deg, var(--aura-color-primary), var(--aura-color-secondary));
  --theme-special-shadow: 0 5px 20px rgba(var(--aura-color-primary-rgb), 0.3);
}

// Sử dụng trong component
import styles from './theme.module.css';

function MyApp({ children }) {
  return (
    <div className={styles.themeContainer}>
      {children}
    </div>
  );
}
```

### 2.4. Tùy chỉnh Tailwind

```javascript
// tailwind.config.js
const { auraGlyphPreset } = require('@auraglyph/tokens/tailwind');

module.exports = {
  presets: [auraGlyphPreset],
  theme: {
    extend: {
      colors: {
        'brand': '#ff3e00',
        'brand-light': '#ff691f',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
      },
      // Mở rộng animation
      keyframes: {
        'custom-pulse': {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
      },
      animation: {
        'custom-pulse': 'custom-pulse 2s cubic-bezier(0.2, 0.9, 0.3, 1.0) infinite',
      },
    },
  },
  plugins: [
    // Plugin tùy chỉnh
    function({ addComponents }) {
      addComponents({
        '.brand-card': {
          backgroundColor: 'var(--aura-color-surface)',
          borderLeft: '4px solid var(--aura-color-brand)',
          padding: 'var(--aura-space-4)',
          borderRadius: 'var(--aura-radius-md)',
          boxShadow: 'var(--aura-shadow-md)',
        },
      });
    }
  ],
};
```

## 3. Tùy chỉnh JavaScript

### 3.1. Cấu hình QuantumProvider

```jsx
// _app.jsx hoặc App.jsx
import { QuantumProvider } from '@auraglyph/react';

// Tùy chỉnh theme
const theme = {
  // Các tùy chỉnh cụ thể
  colorScheme: 'brand',
  radius: 'relaxed',
  animation: {
    speed: 0.9, // 0-1, 1 là bình thường
    curve: 'bounce', // 'linear', 'ease', 'bounce'
  },
  responsive: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <QuantumProvider 
      theme={theme}
      options={{ 
        adaptability: 0.7,
        contextSensitivity: 0.6,
        quantumEffectsLevel: 'enhanced',
      }}
    >
      <Component {...pageProps} />
    </QuantumProvider>
  );
}
```

### 3.2. Component Variants

Định nghĩa biến thể tùy chỉnh cho các thành phần:

```jsx
// theme/components.js
export const components = {
  Button: {
    variants: {
      brandPrimary: {
        bg: 'brand.500',
        color: 'white',
        borderRadius: 'full',
        fontWeight: 'bold',
        _hover: {
          bg: 'brand.600',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        _active: {
          bg: 'brand.700',
          transform: 'translateY(0)',
        },
        // Lượng tử
        quantum: {
          energy: 0.8,
          depth: 'medium',
          clarity: 'high',
        },
      },
      subtle: {
        bg: 'transparent',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
        // Lượng tử
        quantum: {
          energy: 0.4,
          coherence: 0.9,
        },
      },
    },
    // Mặc định cho tất cả buttons
    defaultProps: {
      variant: 'brandPrimary',
      size: 'md',
    },
  },
  
  Card: {
    variants: {
      elevated: {
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: 'xl',
        p: 6,
        // Lượng tử
        quantum: {
          variant: 'crystal',
          depth: 'deep',
          clarity: 'high',
        },
      },
      flat: {
        bg: 'gray.50',
        borderRadius: 'md',
        p: 4,
        // Lượng tử
        quantum: {
          variant: 'frost',
          depth: 'shallow',
          clarity: 'medium',
        },
      },
    },
    defaultProps: {
      variant: 'elevated',
    },
  },
  
  // Các component khác...
};
```

### 3.3. Plugin Quantum Engine

```javascript
// plugins/custom-quantum-effects.js
import { extendQuantumEngine } from '@auraglyph/core';

// Tạo hiệu ứng tùy chỉnh
const customEffects = {
  // Custom ripple effect
  customRipple: (element, event, options = {}) => {
    const { intensity = 1.0, color = 'currentColor', duration = 800 } = options;
    
    // Triển khai hiệu ứng...
    const ripple = document.createElement('div');
    ripple.className = 'custom-quantum-ripple';
    // Cấu hình ripple...
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), duration);
  },
  
  // Custom hover effect
  customHover: (element, options = {}) => {
    const { intensity = 0.7, color = 'var(--aura-color-primary)' } = options;
    
    // Triển khai hover effect...
    element.addEventListener('mouseenter', () => {
      // Apply effect...
    });
    
    element.addEventListener('mouseleave', () => {
      // Remove effect...
    });
  }
};

// Đăng ký với Quantum Engine
extendQuantumEngine({
  effects: customEffects,
  materials: {
    // Tùy chỉnh vật liệu
    customMaterial: {
      // Cấu hình vật liệu...
    }
  }
});

// Xuất để sử dụng
export { customEffects };
```

### 3.4. Tùy chỉnh Hook

```javascript
// hooks/useCustomQuantum.js
import { useQuantum } from '@auraglyph/react';
import { customEffects } from '../plugins/custom-quantum-effects';

export function useCustomQuantum(options = {}) {
  // Sử dụng hook chuẩn từ AuraGlyph
  const quantum = useQuantum({
    ...options,
    // Custom configuration
    initialState: {
      ...options.initialState,
      customProperty: options.customProperty || 0.5,
    },
  });
  
  // Mở rộng với các phương thức tùy chỉnh
  return {
    ...quantum,
    // Thêm các phương thức tùy chỉnh
    applyCustomRipple: (event) => {
      customEffects.customRipple(quantum.ref.current, event, {
        intensity: quantum.energy * 1.2,
      });
    },
    applyCustomHover: () => {
      if (quantum.ref.current) {
        customEffects.customHover(quantum.ref.current, {
          intensity: quantum.energy,
        });
      }
    },
  };
}
```

## 4. Tùy chỉnh Từng Thành phần

### 4.1. Button

```jsx
// components/BrandButton.jsx
import { Button } from '@auraglyph/react';
import { useCustomQuantum } from '../hooks/useCustomQuantum';

export function BrandButton({ children, ...props }) {
  const { ref, cssVariables, applyCustomRipple } = useCustomQuantum({
    initialState: { energyLevel: 0.7 }
  });
  
  return (
    <Button
      ref={ref}
      style={{
        ...cssVariables,
        '--brand-button-color': 'var(--aura-color-brand)',
        '--brand-button-font': 'var(--aura-font-heading)',
      }}
      className="brand-button"
      quantum
      variant={props.variant || "quantum-nebula"}
      onClick={(e) => {
        applyCustomRipple(e);
        props.onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
```

### 4.2. Card

```jsx
// components/FeatureCard.jsx
import { Card, CardHeader, CardContent, CardFooter } from '@auraglyph/react';
import { useEffect } from 'react';
import { useQuantum } from '@auraglyph/react';

export function FeatureCard({ title, icon, children, variant = "frost", ...props }) {
  const { ref, energy, setEnergy, cssVariables } = useQuantum({
    quantumId: `feature-card-${title}`,
    initialState: { energyLevel: 0.5 }
  });
  
  // Thay đổi năng lượng dựa trên nội dung hiển thị
  useEffect(() => {
    // Phân tích nội dung để điều chỉnh năng lượng
    const textLength = typeof children === 'string' ? children.length : 0;
    const adjustedEnergy = 0.5 + Math.min(textLength / 500, 0.4);
    setEnergy(adjustedEnergy);
  }, [children, setEnergy]);
  
  return (
    <Card
      ref={ref}
      quantum
      variant={variant}
      depth="medium"
      className="feature-card"
      style={{
        ...cssVariables,
        '--card-min-height': '280px',
      }}
      {...props}
    >
      <CardHeader className="feature-card-header">
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="feature-card-footer">
        {props.footer}
      </CardFooter>
    </Card>
  );
}
```

### 4.3. Custom Modal

```jsx
// components/AnnouncementModal.jsx
import { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader,
  ModalFooter,
  ModalTitle,
  Button
} from '@auraglyph/react';
import { useGlobalQuantum } from '@auraglyph/react';

export function AnnouncementModal({ title, message, isOpen, onClose }) {
  // Sử dụng global quantum context để tạo hiệu ứng hệ thống
  const { setGlobalEnergy } = useGlobalQuantum();
  
  // Tăng energy khi modal mở
  useEffect(() => {
    if (isOpen) {
      setGlobalEnergy(0.9); // Tăng cường năng lượng toàn hệ thống khi hiển thị thông báo
      
      // Khôi phục sau khi đóng
      return () => setGlobalEnergy(0.5);
    }
  }, [isOpen, setGlobalEnergy]);
  
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent
        quantum
        variant="nebula"
        depth="deep"
        luminance="high"
        className="announcement-modal"
      >
        <ModalHeader>
          <ModalTitle className="announcement-title">{title}</ModalTitle>
        </ModalHeader>
        <div className="announcement-body">
          {message}
        </div>
        <ModalFooter>
          <Button quantum variant="quantum-crystal" onClick={onClose}>
            Đã hiểu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

## 5. Tùy chỉnh Nâng cao

### 5.1. Shaders Tùy chỉnh

AuraGlyph cho phép bạn tùy chỉnh shaders cho hiệu ứng vật liệu lượng tử:

```javascript
// shaders/custom-nebula.wgsl
// Custom WebGPU shader cho vật liệu nebula
const customNebulaShader = `
@vertex
fn main_vertex(@location(0) position: vec3<f32>,
               @location(1) uv: vec2<f32>) -> VertexOutput {
  // Custom vertex shader...
}

@fragment
fn main_fragment(in: VertexOutput) -> @location(0) vec4<f32> {
  // Lấy các tham số từ uniform buffer
  let time = uniforms.time;
  let energy = uniforms.energyLevel;
  let phase = uniforms.phase;
  
  // Tùy chỉnh hiệu ứng nebula
  let uv = in.uv;
  
  // Tạo chuyển động dựa trên thời gian và phase
  let distortion = vec2<f32>(
    sin(uv.y * 10.0 + time * 0.5 + phase * 6.28) * 0.02,
    cos(uv.x * 8.0 + time * 0.4 + phase * 6.28) * 0.02
  ) * energy;
  
  // Áp dụng biến dạng vào UV
  uv += distortion;
  
  // Tạo gradient từ hai màu
  let colorFrom = vec3<f32>(0.2, 0.4, 0.9); // Blue
  let colorTo = vec3<f32>(0.8, 0.3, 0.8);   // Purple
  let mixFactor = uv.x * 0.5 + uv.y * 0.5 + sin(time * 0.2) * 0.1;
  let baseColor = mix(colorFrom, colorTo, mixFactor);
  
  // Thêm stars effect
  let stars = step(0.98, noise(uv * 15.0 + vec2<f32>(time * 0.1, 0.0)));
  
  // Final color
  let finalColor = baseColor + stars * energy;
  
  return vec4<f32>(finalColor, baseAlpha * energy);
}`;

// Đăng ký shader với AuraGlyph
import { registerCustomShader } from '@auraglyph/webgpu-renderer';

registerCustomShader('custom-nebula', customNebulaShader, {
  isFragment: true,
  parameters: {
    baseAlpha: 0.85,
    noiseScale: 15.0
  }
});
```

### 5.2. Context Engine Tùy chỉnh

```javascript
// context/custom-context-engine.js
import { extendContextEngine } from '@auraglyph/core';

// Thêm bộ cảm biến (sensor) tùy chỉnh
extendContextEngine({
  sensors: {
    // Cảm biến thời tiết - lấy dữ liệu từ API
    weather: {
      id: 'weather-sensor',
      initialize: async () => {
        // Kết nối với Weather API
        const API_KEY = process.env.WEATHER_API_KEY;
        return { apiKey: API_KEY, lastUpdated: 0 };
      },
      update: async (state) => {
        const now = Date.now();
        // Cập nhật mỗi 30 phút
        if (now - state.lastUpdated > 30 * 60 * 1000) {
          try {
            // Lấy vị trí người dùng
            const position = await getCurrentPosition();
            // Lấy dữ liệu thời tiết
            const weatherData = await fetchWeatherData(
              position.coords.latitude,
              position.coords.longitude,
              state.apiKey
            );
            
            return {
              ...state,
              lastUpdated: now,
              data: weatherData,
              conditions: weatherData.current.condition.text,
              temperature: weatherData.current.temp_c,
              isDay: weatherData.current.is_day === 1,
              humidity: weatherData.current.humidity,
            };
          } catch (error) {
            console.error('Weather sensor error:', error);
            return state;
          }
        }
        return state;
      },
      provide: (state) => {
        if (!state.data) return {};
        
        // Chuyển đổi dữ liệu thời tiết thành các thông số ngữ cảnh
        const brightness = state.isDay ? 0.8 : 0.2;
        const energyModifier = mapRange(state.temperature, 0, 30, 0.3, 0.9);
        const humidityFactor = state.humidity / 100;
        
        // Trả về các thông số ngữ cảnh
        return {
          brightness,
          energyModifier,
          humidityFactor,
          weatherCondition: state.conditions,
          isDay: state.isDay
        };
      }
    },
    
    // Cảm biến hoạt động ứng dụng
    appActivity: {
      id: 'app-activity-sensor',
      initialize: () => ({ lastAction: Date.now(), actionCount: 0, activeSection: null }),
      update: (state, action) => {
        if (action && action.type === 'USER_ACTION') {
          return {
            ...state,
            lastAction: Date.now(),
            actionCount: state.actionCount + 1,
            activeSection: action.section || state.activeSection
          };
        }
        return state;
      },
      provide: (state) => {
        const timeSinceLastAction = (Date.now() - state.lastAction) / 1000;
        const activityLevel = Math.max(0, 1 - (timeSinceLastAction / 60));
        
        return {
          activityLevel,
          actionDensity: Math.min(state.actionCount / 100, 1),
          activeSection: state.activeSection
        };
      }
    }
  },
  
  // Bộ xử lý ngữ cảnh tùy chỉnh
  processors: {
    // Xử lý thích ứng tâm trạng
    moodAdapter: (context) => {
      // Combine weather and activity data
      const { brightness, energyModifier, weatherCondition } = context;
      const { activityLevel, actionDensity } = context;
      
      // Calculate mood factors
      let calmness = 0.5;
      if (weatherCondition) {
        if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
          calmness = 0.8;
        } else if (weatherCondition.includes('storm') || weatherCondition.includes('thunder')) {
          calmness = 0.2;
        } else if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
          calmness = 0.6;
        }
      }
      
      // Combine with activity
      const energy = (energyModifier || 0.5) * (actionDensity * 0.7 + 0.3);
      const focus = activityLevel * 0.8 + 0.2;
      
      // Return processed context
      return {
        ...context,
        moodEnergy: energy,
        moodCalmness: calmness,
        moodFocus: focus,
        
        // Recommend UI adaptations
        suggestedLuminance: mapRange(brightness, 0, 1, 0.3, 0.8),
        suggestedCoherence: calmness,
        suggestedEnergy: energy
      };
    }
  }
});

// Utility function for mapping ranges
function mapRange(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Function to get current position
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 300000 // 5 minutes
    });
  });
}

// Function to fetch weather data
async function fetchWeatherData(lat, lon, apiKey) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
  );
  return await response.json();
}
```

### 5.3. Custom Animation System

```javascript
// animation/custom-animations.js
import { extendAnimationSystem } from '@auraglyph/motion';

// Define custom easing functions
const customEasings = {
  bounceOut: t => {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  
  elasticIn: t => {
    return t === 0
      ? 0
      : t === 1
        ? 1
        : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
  },
  
  quantumPulse: t => {
    // Custom easing designed for quantum effects
    const p = Math.pow(t, 2) * (3 - 2 * t);
    return p * (1 + 0.1 * Math.sin(t * Math.PI * 4));
  }
};

// Define custom animations
const customAnimations = {
  quantumAppear: {
    from: { opacity: 0, transform: 'scale(0.9) translateY(10px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    duration: 600,
    easing: 'quantumPulse',
  },
  
  energyPulse: {
    keyframes: [
      { offset: 0, opacity: 0.7, boxShadow: '0 0 0px rgba(var(--quantum-glow-color), 0.2)' },
      { offset: 0.5, opacity: 1, boxShadow: '0 0 20px rgba(var(--quantum-glow-color), 0.5)' },
      { offset: 1, opacity: 0.7, boxShadow: '0 0 0px rgba(var(--quantum-glow-color), 0.2)' },
    ],
    duration: 2000,
    easing: 'linear',
    iterations: Infinity,
  },
  
  entanglement: {
    keyframes: (element1, element2) => {
      // Get positions of both elements
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
      
      // Calculate center points
      const center1 = {
        x: rect1.left + rect1.width / 2,
        y: rect1.top + rect1.height / 2
      };
      
      const center2 = {
        x: rect2.left + rect2.width / 2,
        y: rect2.top + rect2.height / 2
      };
      
      // Create connection line animation
      return {
        start: { x: center1.x, y: center1.y },
        end: { x: center2.x, y: center2.y }
      };
    },
    duration: 800,
    easing: 'quantumPulse',
  }
};

// Register with AuraGlyph
extendAnimationSystem({
  easings: customEasings,
  animations: customAnimations,
  
  // Custom timing engine
  timingEngine: {
    id: 'quantum-timing',
    initialize: () => ({ frameCount: 0, lastTimestamp: performance.now() }),
    getTimingFactor: (state, elapsedTime) => {
      // Apply quantum fluctuations to timing
      const fluctuation = Math.sin(state.frameCount / 10) * 0.1;
      state.frameCount++;
      return 1.0 + fluctuation;
    }
  }
});
```

## 6. Tích hợp với Dự án Thực tế

### 6.1. Next.js App

```jsx
// app/layout.jsx (Next.js App Router)
import { AuraGlyphProvider } from '../components/AuraGlyphProvider';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuraGlyphProvider>
          {children}
        </AuraGlyphProvider>
      </body>
    </html>
  );
}

// components/AuraGlyphProvider.jsx
import { QuantumProvider } from '@auraglyph/react';
import auraglyphTokens from '../config/auraglyph.tokens';
import { useEffect } from 'react';

// Đăng ký plugins tùy chỉnh
import '../plugins/custom-quantum-effects';
import '../animation/custom-animations';
import '../context/custom-context-engine';

export function AuraGlyphProvider({ children }) {
  // Phát hiện khả năng trình duyệt
  useEffect(() => {
    import('@auraglyph/core').then(({ detectCapabilities }) => {
      detectCapabilities().then((capabilities) => {
        console.log('AuraGlyph capabilities:', capabilities);
        
        // Điều chỉnh cấu hình dựa trên khả năng
        if (!capabilities.webgpu) {
          // Fallback to WebGL
          import('@auraglyph/core').then(({ configureQuantumEngine }) => {
            configureQuantumEngine({
              quantumEffectsLevel: 'standard',
              renderingEngine: 'webgl'
            });
          });
        }
      });
    });
  }, []);
  
  return (
    <QuantumProvider
      options={{
        adaptability: 0.7,
        contextSensitivity: 0.6,
        quantumEffectsLevel: 'enhanced',
        debug: process.env.NODE_ENV === 'development'
      }}
      theme={auraglyphTokens}
    >
      {children}
    </QuantumProvider>
  );
}
```

### 6.2. Tích hợp với Design System hiện có

```javascript
// config/design-system-integration.js
import { createThemeIntegration } from '@auraglyph/core';

// Ví dụ với MUI
export function createMUIIntegration(muiTheme) {
  return createThemeIntegration({
    source: 'mui',
    mapTokens: {
      // Map MUI tokens to AuraGlyph
      colors: {
        primary: muiTheme.palette.primary.main,
        secondary: muiTheme.palette.secondary.main,
        background: muiTheme.palette.background.default,
        surface: muiTheme.palette.background.paper,
        text: muiTheme.palette.text.primary,
      },
      typography: {
        fontFamily: {
          base: muiTheme.typography.fontFamily,
          heading: muiTheme.typography.h1.fontFamily || muiTheme.typography.fontFamily,
        },
        fontSize: {
          base: muiTheme.typography.fontSize,
        },
      },
      spacing: {
        unit: muiTheme.spacing(1),
      },
      shape: {
        borderRadius: muiTheme.shape.borderRadius,
      }
    },
    
    // Custom component mapping
    components: {
      Button: {
        map: (muiProps) => {
          // Map MUI Button props to AuraGlyph Button props
          const { variant, color, size, ...rest } = muiProps;
          
          const variantMap = {
            contained: 'quantum',
            outlined: 'frost',
            text: 'crystal',
          };
          
          const sizeMap = {
            small: 'sm',
            medium: 'md',
            large: 'lg',
          };
          
          return {
            variant: `quantum-${variantMap[variant] || 'quantum'}`,
            size: sizeMap[size] || 'md',
            quantum: true,
            ...rest,
          };
        }
      },
      
      Card: {
        map: (muiProps) => {
          const { variant, elevation, ...rest } = muiProps;
          
          // Map elevation to depth
          let depth = 'medium';
          if (elevation > 8) depth = 'deep';
          else if (elevation < 4) depth = 'shallow';
          
          return {
            variant: 'quantum-frost',
            depth,
            quantum: true,
            ...rest,
          };
        }
      }
    }
  });
}

// Ví dụ với Tailwind
export function createTailwindIntegration(tailwindConfig) {
  return createThemeIntegration({
    source: 'tailwind',
    mapTokens: {
      colors: {
        primary: tailwindConfig.theme.colors.primary.DEFAULT || tailwindConfig.theme.colors.primary[500],
        secondary: tailwindConfig.theme.colors.secondary.DEFAULT || tailwindConfig.theme.colors.secondary[500],
        // Map other colors...
      },
      // Map other tokens...
    }
  });
}
```

## 7. Kết luận

Việc tùy chỉnh AuraGlyph cho phép bạn tạo ra một hệ thống thiết kế độc đáo khó bắt chước, mang đậm bản sắc thương hiệu của bạn trong khi vẫn giữ được các tính năng tiên tiến và hiệu ứng lượng tử mạnh mẽ.

Các nguyên tắc quan trọng khi tùy chỉnh:

1. **Bắt đầu từ Tokens**: Luôn bắt đầu tùy chỉnh từ cấp độ token trước khi đi vào CSS hoặc JavaScript
2. **Cân bằng Độc đáo và Nhất quán**: Tùy chỉnh để phản ánh thương hiệu nhưng vẫn duy trì tính nhất quán của hệ thống
3. **Tiệm tiến Ứng dụng Quantum**: Áp dụng hiệu ứng lượng tử một cách tiệm tiến, từ đơn giản đến phức tạp
4. **Thử nghiệm Trước khi Triển khai**: Luôn thử nghiệm các tùy chỉnh trên nhiều thiết bị và trình duyệt
5. **Documentation**: Tài liệu hóa tất cả các tùy chỉnh để đảm bảo tính nhất quán qua thời gian

Với các hướng dẫn tùy chỉnh này, bạn có thể biến AuraGlyph thành một hệ thống thiết kế độc đáo, mang đậm dấu ấn riêng của thương hiệu, đồng thời tận dụng tối đa các khả năng tiên tiến của nó.

---

**Phiên bản tài liệu**: 1.0.0  
**Cập nhật**: Tháng 5, 2024