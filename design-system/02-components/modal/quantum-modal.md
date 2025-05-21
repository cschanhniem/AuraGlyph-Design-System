# 🌠 QUANTUM MODAL

## Giới thiệu

Quantum Modal là thành phần modal tiên tiến của AuraGlyph, vượt xa khái niệm modal truyền thống để trở thành một không gian tương tác đa chiều. Thay vì chỉ là một lớp phủ đơn giản, Quantum Modal tạo ra một "pocket dimension" - một không gian thông tin riêng biệt có khả năng tương tác với người dùng theo cách có ý thức, phản ứng và thích ứng.

## Triết lý thiết kế

Quantum Modal được xây dựng dựa trên ba nguyên tắc cốt lõi:

1. **Không gian có ý thức (Sentient Space)**: Modal không chỉ là một container mà là một không gian thông tin có khả năng nhận thức ngữ cảnh và mục đích của nó.

2. **Tương tác đa chiều (Dimensional Interaction)**: Modal tạo ra cảm giác chiều sâu thực sự, với các lớp thông tin tương tác theo nhiều chiều không gian.

3. **Trải nghiệm liền mạch (Seamless Experience)**: Chuyển đổi giữa không gian chính và modal là một trải nghiệm mượt mà, tự nhiên, không gây gián đoạn dòng tương tác.

## Giải phẫu Quantum Modal

```
┌─────────────────────────────────────────────────┐
│  Quantum Backdrop (Interactive Dimensional Field)│
│  ┌─────────────────────────────────────────┐    │
│  │  Modal Container                         │    │
│  │  ┌─────────────────────────────────┐    │    │
│  │  │  Header                          │    │    │
│  │  │  (Focus Point + Navigation Zone) │    │    │
│  │  └─────────────────────────────────┘    │    │
│  │                                          │    │
│  │  ┌─────────────────────────────────┐    │    │
│  │  │  Content Area                    │    │    │
│  │  │  (Information Field)             │    │    │
│  │  │                                  │    │    │
│  │  │                                  │    │    │
│  │  └─────────────────────────────────┘    │    │
│  │                                          │    │
│  │  ┌─────────────────────────────────┐    │    │
│  │  │  Footer                          │    │    │
│  │  │  (Action Zone + Decision Point)  │    │    │
│  │  └─────────────────────────────────┘    │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### 1. Quantum Backdrop

Lớp phủ tương tác tạo ra "trường không gian" xung quanh modal:

- **Depth Blur**: Hiệu ứng blur thể hiện chiều sâu thực sự, không chỉ là làm mờ đơn giản
- **Interactive Particles**: Các hạt ánh sáng vi mô phản ứng với chuyển động con trỏ
- **Ambient Awareness**: Độ tối/sáng thay đổi theo nội dung modal và mục đích
- **Focus Management**: Tạo ra hiệu ứng "gravitational lensing" nhẹ, kéo sự chú ý vào modal

### 2. Modal Container

Vật chứa chính với vật liệu lượng tử:

- **Quantum Glass Material**: Sử dụng vật liệu kính lượng tử với đặc tính refraction và luminance
- **Dimensional Layering**: Tạo cảm giác lớp thông tin với hiệu ứng parallax tinh tế
- **Responsive Boundaries**: Đường viền phát sáng tinh tế, phản ứng với tương tác
- **Adaptive Sizing**: Tự điều chỉnh kích thước và vị trí tối ưu dựa trên nội dung và ngữ cảnh

### 3. Functional Zones

Modal được chia thành các vùng chức năng rõ ràng:

- **Header (Focus Point)**: Điểm tập trung chính, thường chứa tiêu đề và điều khiển đóng
- **Content Area (Information Field)**: Khu vực nội dung chính với khả năng cuộn dọc
- **Footer (Action Zone)**: Khu vực chứa các hành động, quyết định

## Các biến thể

### 1. Quantum Dialog

Modal nhỏ gọn, tập trung vào quyết định đơn giản:

```html
<quantum-modal variant="dialog" importance="high">
  <div slot="header">Xác nhận hành động</div>
  <div slot="content">
    <p>Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.</p>
  </div>
  <div slot="footer">
    <quantum-button variant="secondary">Hủy bỏ</quantum-button>
    <quantum-button variant="primary" emphasis="high">Xác nhận</quantum-button>
  </div>
</quantum-modal>
```

### 2. Information Panel

Modal lớn hơn với nhiều thông tin chi tiết:

```html
<quantum-modal 
  variant="panel" 
  size="large" 
  backdrop-effect="depth-blur"
  entry-animation="quantum-shift"
>
  <div slot="header">
    <h2>Thông tin chi tiết sản phẩm</h2>
    <quantum-button variant="icon" icon="close"></quantum-button>
  </div>
  <div slot="content">
    <!-- Nội dung thông tin chi tiết -->
  </div>
  <div slot="footer">
    <quantum-button variant="secondary">Đóng</quantum-button>
    <quantum-button variant="primary">Thêm vào giỏ hàng</quantum-button>
  </div>
</quantum-modal>
```

### 3. Immersive Experience

Modal toàn màn hình với trải nghiệm đắm chìm:

```html
<quantum-modal 
  variant="immersive" 
  backdrop-interaction="high"
  content-scrolling="parallax"
>
  <div slot="header">
    <h1>Khám phá không gian mới</h1>
  </div>
  <div slot="content">
    <!-- Nội dung phong phú với hình ảnh, video -->
  </div>
  <div slot="footer">
    <quantum-button variant="ghost">Trở về</quantum-button>
    <quantum-button variant="primary" size="large">Tiếp tục khám phá</quantum-button>
  </div>
</quantum-modal>
```

### 4. Contextual Notification

Modal nhỏ xuất hiện tạm thời để thông báo:

```html
<quantum-modal 
  variant="notification" 
  auto-dismiss="4000"
  position="top-right"
>
  <div slot="content">
    <quantum-icon name="check-circle"></quantum-icon>
    <p>Thao tác đã hoàn tất thành công!</p>
  </div>
</quantum-modal>
```

## API & Thuộc tính

### Thuộc tính cơ bản

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
|------------|--------------|----------|-------|
| `variant` | string | `'standard'` | Kiểu modal: `standard`, `dialog`, `panel`, `immersive`, `notification` |
| `size` | string | `'medium'` | Kích thước: `small`, `medium`, `large`, `auto` |
| `open` | boolean | `false` | Trạng thái hiển thị |
| `dismissible` | boolean | `true` | Cho phép đóng bằng backdrop hoặc ESC |
| `importance` | string | `'medium'` | Mức độ quan trọng: `low`, `medium`, `high` |

### Thuộc tính nâng cao

| Thuộc tính | Kiểu dữ liệu | Mặc định | Mô tả |
|------------|--------------|----------|-------|
| `backdrop-effect` | string | `'blur'` | Hiệu ứng backdrop: `simple`, `blur`, `depth-blur` |
| `backdrop-interaction` | string | `'medium'` | Mức độ tương tác với backdrop: `none`, `low`, `medium`, `high` |
| `entry-animation` | string | `'standard'` | Kiểu animation khi xuất hiện: `standard`, `quantum-shift`, `emerge`, `materialize` |
| `z-index-level` | string | `'modal'` | Lớp z-index: `modal`, `notification`, `critical` |
| `content-scrolling` | string | `'standard'` | Phương thức cuộn nội dung: `standard`, `parallax`, `depth` |
| `auto-dismiss` | number | `0` | Thời gian tự đóng (ms), `0` là không tự đóng |
| `position` | string | `'center'` | Vị trí: `center`, `top`, `right`, `bottom`, `left`, `top-right`, ... |

### Slots

- `header`: Phần tiêu đề modal
- `content`: Nội dung chính
- `footer`: Phần chân chứa các hành động
- `close-button`: Nút đóng tùy chỉnh

### Sự kiện

- `quantum-modal-open`: Phát ra khi modal mở
- `quantum-modal-close`: Phát ra khi modal đóng
- `quantum-modal-backdrop-click`: Phát ra khi click vào backdrop
- `quantum-modal-animation-complete`: Phát ra khi animation hoàn thành

## Hiệu ứng và Animations

### Entry Animations

1. **Standard**: Fade-in với scale từ 0.9 đến 1
2. **Quantum Shift**: Xuất hiện với hiệu ứng "lượng tử hóa" - từ mờ đến rõ, không gian cong nhẹ
3. **Emerge**: Từ từ hiện ra từ độ trong suốt cao
4. **Materialize**: Hiệu ứng vật liệu hóa từ các hạt ánh sáng

### Interactive Effects

1. **Depth Response**: Nội dung phản ứng với cuộn trang, tạo cảm giác chiều sâu
2. **Focus Illumination**: Các phần được hover hoặc focus phát sáng nhẹ
3. **Resonant Feedback**: Modal "rung" nhẹ khi có thao tác quan trọng
4. **Contextual Coloring**: Màu sắc và ánh sáng phản ánh ngữ cảnh và cảm xúc

## Triển khai Kỹ thuật

### Web Component

```javascript
class QuantumModal extends HTMLElement {
  static get observedAttributes() {
    return [
      'variant', 'size', 'open', 'dismissible', 'importance',
      'backdrop-effect', 'backdrop-interaction', 'entry-animation',
      'z-index-level', 'content-scrolling', 'auto-dismiss', 'position'
    ];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._renderModal();
    this._setupEventListeners();
  }
  
  connectedCallback() {
    if (this.hasAttribute('open')) {
      this._showModal();
    }
    
    // Thiết lập trap focus
    this._setupFocusTrap();
    
    // Thiết lập auto-dismiss nếu có
    const autoDismiss = parseInt(this.getAttribute('auto-dismiss') || '0', 10);
    if (autoDismiss > 0) {
      this._autoDismissTimeout = setTimeout(() => {
        this.close();
      }, autoDismiss);
    }
  }
  
  disconnectedCallback() {
    // Dọn dẹp
    this._cleanup();
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      if (newValue !== null) {
        this._showModal();
      } else {
        this._hideModal();
      }
    }
  }
  
  // Public API
  open() {
    if (!this.hasAttribute('open')) {
      this.setAttribute('open', '');
    }
  }
  
  close() {
    if (this.hasAttribute('open')) {
      this.removeAttribute('open');
    }
  }
  
  // Private methods
  _renderModal() {
    const variant = this.getAttribute('variant') || 'standard';
    const backdrop = this.getAttribute('backdrop-effect') || 'blur';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --modal-z-index: var(--quantum-z-index-modal, 1000);
          --modal-backdrop-blur: var(--quantum-backdrop-blur, 10px);
          --modal-animation-duration: var(--quantum-duration-standard, 300ms);
          --modal-entry-curve: var(--quantum-curve-standard, cubic-bezier(0.2, 0.9, 0.3, 1.0));
          
          /* Variant-specific styling */
          --modal-width: ${this._getModalWidth()};
          --modal-max-height: ${variant === 'immersive' ? '100vh' : '90vh'};
          --modal-background: var(--quantum-surface-${variant}, rgba(255, 255, 255, 0.85));
          
          display: none;
          position: fixed;
          z-index: var(--modal-z-index);
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          align-items: center;
          justify-content: center;
        }
        
        :host([open]) {
          display: flex;
        }
        
        .quantum-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, ${variant === 'notification' ? '0.1' : '0.4'});
          backdrop-filter: ${backdrop === 'blur' ? 'blur(var(--modal-backdrop-blur))' : 'none'};
          opacity: 0;
          transition: opacity var(--modal-animation-duration) var(--modal-entry-curve);
        }
        
        :host([open]) .quantum-backdrop {
          opacity: 1;
        }
        
        .quantum-container {
          position: relative;
          width: var(--modal-width);
          max-height: var(--modal-max-height);
          background: var(--modal-background);
          border-radius: var(--quantum-radius-${variant}, 12px);
          box-shadow: var(--quantum-shadow-elevation-${variant}, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: scale(0.95);
          opacity: 0;
          transition: transform var(--modal-animation-duration) var(--modal-entry-curve),
                      opacity var(--modal-animation-duration) var(--modal-entry-curve);
        }
        
        :host([open]) .quantum-container {
          transform: scale(1);
          opacity: 1;
        }
        
        .quantum-header {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .quantum-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        
        .quantum-footer {
          padding: 16px 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        /* Animation variants */
        :host([entry-animation="quantum-shift"]) .quantum-container {
          transition-timing-function: cubic-bezier(0.2, 0.9, 0.3, 1.0);
        }
        
        :host([entry-animation="emerge"]) .quantum-container {
          transform: translateY(20px) scale(0.98);
          transition-timing-function: cubic-bezier(0.1, 0.7, 0.2, 1.0);
        }
        
        :host([entry-animation="materialize"]) .quantum-container {
          transform: scale(1.02);
          transition-timing-function: cubic-bezier(0.0, 0.8, 0.2, 1.2);
        }
        
        /* Position variants */
        :host([position="top"]) {
          align-items: flex-start;
        }
        
        :host([position="bottom"]) {
          align-items: flex-end;
        }
      </style>
      
      <div class="quantum-backdrop" part="backdrop"></div>
      <div class="quantum-container" part="container">
        <div class="quantum-header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="quantum-content" part="content">
          <slot name="content"></slot>
        </div>
        <div class="quantum-footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
  
  _getModalWidth() {
    const size = this.getAttribute('size') || 'medium';
    const variant = this.getAttribute('variant') || 'standard';
    
    if (variant === 'immersive') return '100vw';
    if (variant === 'notification') return 'auto';
    
    switch (size) {
      case 'small': return '400px';
      case 'large': return '800px';
      case 'auto': return 'auto';
      default: return '600px'; // medium
    }
  }
  
  _setupEventListeners() {
    // Đóng khi click backdrop
    this.shadowRoot.querySelector('.quantum-backdrop').addEventListener('click', (e) => {
      if (this.getAttribute('dismissible') !== 'false') {
        this.close();
        this.dispatchEvent(new CustomEvent('quantum-modal-backdrop-click'));
      }
    });
    
    // Ngăn sự kiện propagation từ container
    this.shadowRoot.querySelector('.quantum-container').addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Xử lý phím ESC
    this._handleKeyDown = (e) => {
      if (e.key === 'Escape' && this.hasAttribute('open') && this.getAttribute('dismissible') !== 'false') {
        this.close();
      }
    };
    document.addEventListener('keydown', this._handleKeyDown);
  }
  
  _setupFocusTrap() {
    // Triển khai focus trap để accessibility
  }
  
  _showModal() {
    // Thêm class vào body để ngăn scroll
    document.body.style.overflow = 'hidden';
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('quantum-modal-open'));
    
    // Track animation end
    const container = this.shadowRoot.querySelector('.quantum-container');
    container.addEventListener('transitionend', () => {
      this.dispatchEvent(new CustomEvent('quantum-modal-animation-complete', { detail: { state: 'open' } }));
    }, { once: true });
  }
  
  _hideModal() {
    // Khôi phục scroll
    document.body.style.overflow = '';
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('quantum-modal-close'));
    
    // Track animation end
    const container = this.shadowRoot.querySelector('.quantum-container');
    container.addEventListener('transitionend', () => {
      this.dispatchEvent(new CustomEvent('quantum-modal-animation-complete', { detail: { state: 'closed' } }));
    }, { once: true });
  }
  
  _cleanup() {
    document.removeEventListener('keydown', this._handleKeyDown);
    if (this._autoDismissTimeout) {
      clearTimeout(this._autoDismissTimeout);
    }
  }
}

customElements.define('quantum-modal', QuantumModal);
```

### React Component

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './QuantumModal.css';

const QuantumModal = ({
  variant = 'standard',
  size = 'medium',
  open = false,
  dismissible = true,
  importance = 'medium',
  backdropEffect = 'blur',
  backdropInteraction = 'medium',
  entryAnimation = 'standard',
  zIndexLevel = 'modal',
  contentScrolling = 'standard',
  autoDismiss = 0,
  position = 'center',
  onOpen,
  onClose,
  onBackdropClick,
  children,
  header,
  footer
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  
  // Sync with props
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  
  // Handle auto-dismiss
  useEffect(() => {
    let timer;
    if (isOpen && autoDismiss > 0) {
      timer = setTimeout(() => {
        setIsOpen(false);
        onClose && onClose();
      }, autoDismiss);
    }
    return () => timer && clearTimeout(timer);
  }, [isOpen, autoDismiss, onClose]);
  
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && dismissible) {
        setIsOpen(false);
        onClose && onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dismissible, onClose]);
  
  // Control body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      onOpen && onOpen();
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, onOpen]);
  
  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (backdropRef.current === e.target && dismissible) {
      setIsOpen(false);
      onClose && onClose();
      onBackdropClick && onBackdropClick();
    }
  };
  
  if (!isOpen) return null;
  
  const modalContent = (
    <div 
      className={`quantum-modal quantum-modal--${variant} quantum-modal--${size} quantum-modal--${position}`}
      data-importance={importance}
      data-entry-animation={entryAnimation}
      data-backdrop-effect={backdropEffect}
      data-backdrop-interaction={backdropInteraction}
      data-z-index-level={zIndexLevel}
      data-content-scrolling={contentScrolling}
    >
      <div 
        className="quantum-backdrop" 
        ref={backdropRef}
        onClick={handleBackdropClick}
      />
      <div className="quantum-container" ref={modalRef}>
        {header && (
          <div className="quantum-header">
            {header}
          </div>
        )}
        <div className={`quantum-content quantum-content--${contentScrolling}`}>
          {children}
        </div>
        {footer && (
          <div className="quantum-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
  
  return createPortal(modalContent, document.body);
};

export default QuantumModal;
```

## Nguyên tắc Sử dụng

### Khi nào sử dụng

- Khi cần tập trung sự chú ý vào một nhiệm vụ cụ thể
- Khi cần người dùng đưa ra quyết định
- Khi hiển thị thông tin chi tiết mà không chuyển hướng
- Khi cần xác nhận hành động quan trọng
- Khi muốn tạo trải nghiệm đắm chìm

### Khi nào không sử dụng

- Khi thông tin có thể hiển thị trực tiếp trong luồng nội dung
- Khi có quá nhiều thông tin phức tạp (sử dụng trang riêng)
- Khi cần người dùng tham khảo nhiều nội dung khác cùng lúc
- Khi chỉ cần thông báo đơn giản không cần tương tác (sử dụng Toast)

### Các mẫu UI phổ biến

1. **Xác nhận Hành động**:
   - Sử dụng `variant="dialog"` với `importance="high"`
   - Nên có 2 nút: hành động và hủy
   - Nên sử dụng ngôn ngữ rõ ràng, trực tiếp

2. **Chi tiết Thông tin**:
   - Sử dụng `variant="panel"` với `size="large"`
   - Tối ưu hóa cho việc đọc và khám phá
   - Cân nhắc sử dụng `content-scrolling="parallax"` để tăng trải nghiệm

3. **Biểu mẫu Thu thập**:
   - Sử dụng `variant="standard"` với focus trap
   - Đảm bảo validation và phản hồi rõ ràng
   - Nên có nút lưu và hủy

4. **Nội dung Đa phương tiện**:
   - Sử dụng `variant="immersive"` cho trải nghiệm toàn màn hình
   - Tối ưu hóa điều khiển phát/dừng và thoát
   - Sử dụng `backdrop-effect="depth-blur"` để tạo chiều sâu

## Accessibility

- **Keyboard Navigation**: Đảm bảo tất cả tương tác có thể thực hiện bằng bàn phím
- **Focus Management**: Giữ focus trong modal khi mở (focus trap)
- **ARIA Roles**: Sử dụng đúng `role="dialog"` và `aria-modal="true"`
- **Screen Reader Support**: Đảm bảo nội dung được đọc chính xác
- **Reduced Motion**: Tuân thủ `prefers-reduced-motion` để giảm hiệu ứng

## Hiệu suất

- Sử dụng lazy loading cho nội dung lớn
- Tránh làm nặng DOM khi modal đóng
- Sử dụng CSS transitions thay vì JS animations khi có thể
- Tối ưu hóa hiệu ứng backdrop cho thiết bị di động

## Tương lai Phát triển

### Phase 1: Neural Response
- Tích hợp phân tích cảm xúc từ tương tác để điều chỉnh UX
- Thêm khả năng dự đoán hành động người dùng

### Phase 2: Spatial Expansion
- Hỗ trợ đầy đủ AR/VR với modal 3D thực sự
- Chuyển đổi giữa các không gian thông tin với hiệu ứng không-thời gian

### Phase 3: Multi-sensory
- Tích hợp phản hồi haptic cho tương tác quan trọng
- Thêm soundscapes thích ứng theo nội dung

Quantum Modal không chỉ là một cửa sổ thông tin mà là một cánh cổng đến một không gian tương tác mới, định nghĩa lại khái niệm về modal trong thiết kế UI của tương lai.