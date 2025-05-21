/**
 * @license
 * Copyright 2023-2035 AuraGlyph Organization
 * SPDX-License-Identifier: MIT
 */

import { QuantumElement } from './quantum-element.js';

/**
 * QuantumButton - An enhanced button component with quantum material properties
 * 
 * Features:
 * - Quantum material effects with dynamic lighting and depth
 * - Responsive tactile feedback
 * - Energy state animation
 * - Context awareness
 * - Entanglement capabilities
 */
export class QuantumButton extends QuantumElement {
  static get observedAttributes() {
    return [
      ...QuantumElement.observedAttributes,
      'emphasis',
      'loading',
      'icon',
      'icon-position',
      'interaction-ripple',
      'disabled'
    ];
  }
  
  constructor() {
    super();
    
    // Initialize button state
    this._buttonState = {
      hover: false,
      active: false,
      loading: false,
      disabled: false
    };
    
    // Override some base quantum properties
    this._quantumState.energyLevel = 0.6; // Buttons have slightly higher energy
    this._material.properties.luminousCapacity = 0.75; // More luminous
    
    // Initialize additional properties
    this._buttonProps = {
      emphasis: this.getAttribute('emphasis') || 'medium',
      iconPosition: this.getAttribute('icon-position') || 'left',
      interactionRipple: this.hasAttribute('interaction-ripple') 
        ? this.getAttribute('interaction-ripple') !== 'false'
        : true
    };
    
    // Create button DOM
    this._createButtonDOM();
  }
  
  /**
   * Create button-specific DOM structure
   * @private
   */
  _createButtonDOM() {
    // Clear existing content (from base class)
    if (this._content) {
      this._content.innerHTML = '';
    }
    
    // Create button element
    this._buttonElement = document.createElement('button');
    this._buttonElement.classList.add('quantum-button-native');
    this._buttonElement.type = 'button';
    
    // Create layout container
    this._buttonLayout = document.createElement('div');
    this._buttonLayout.classList.add('quantum-button-layout');
    this._buttonElement.appendChild(this._buttonLayout);
    
    // Create icon container (left)
    this._iconLeft = document.createElement('div');
    this._iconLeft.classList.add('quantum-button-icon', 'quantum-button-icon-left');
    this._buttonLayout.appendChild(this._iconLeft);
    
    // Create label container with slot
    this._labelContainer = document.createElement('div');
    this._labelContainer.classList.add('quantum-button-label');
    const slot = document.createElement('slot');
    this._labelContainer.appendChild(slot);
    this._buttonLayout.appendChild(this._labelContainer);
    
    // Create icon container (right)
    this._iconRight = document.createElement('div');
    this._iconRight.classList.add('quantum-button-icon', 'quantum-button-icon-right');
    this._buttonLayout.appendChild(this._iconRight);
    
    // Create loading indicator
    this._loadingIndicator = document.createElement('div');
    this._loadingIndicator.classList.add('quantum-button-loading');
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.classList.add('quantum-loading-dot');
      this._loadingIndicator.appendChild(dot);
    }
    this._buttonElement.appendChild(this._loadingIndicator);
    
    // Add button to content
    this._content.appendChild(this._buttonElement);
    
    // Add button-specific styles
    this._addButtonStyles();
    
    // Update initial state
    this._updateButtonState();
    this._updateIconsFromAttributes();
  }
  
  /**
   * Add button-specific styles
   * @private
   */
  _addButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --button-font-size: var(--quantum-button-font-size, 1rem);
        --button-font-weight: var(--quantum-button-font-weight, 500);
        --button-padding-x: var(--quantum-button-padding-x, 1.5rem);
        --button-padding-y: var(--quantum-button-padding-y, 0.75rem);
        --button-border-radius: var(--quantum-border-radius, 8px);
        --button-height: var(--quantum-button-height, auto);
        --button-min-width: var(--quantum-button-min-width, 2.5rem);
        --button-transition: var(--quantum-transition, all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.0));
        
        display: inline-block;
        vertical-align: middle;
        position: relative;
      }
      
      .quantum-button-native {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: var(--button-height);
        min-width: var(--button-min-width);
        padding: var(--button-padding-y) var(--button-padding-x);
        margin: 0;
        border: none;
        border-radius: var(--button-border-radius);
        font-family: var(--aura-font-primary, inherit);
        font-size: var(--button-font-size);
        font-weight: var(--button-font-weight);
        text-align: center;
        text-decoration: none;
        overflow: hidden;
        cursor: pointer;
        background: transparent;
        color: var(--button-text-color, inherit);
        outline: none;
        user-select: none;
        transition: var(--button-transition);
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Button layout for icon + label alignment */
      .quantum-button-layout {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .quantum-button-label {
        flex: 0 1 auto;
        position: relative;
        transition: transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1.0);
      }
      
      .quantum-button-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        height: 1.2em;
        width: 1.2em;
        transition: transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1.0);
      }
      
      .quantum-button-icon-left {
        margin-right: 0.5em;
      }
      
      .quantum-button-icon-right {
        margin-left: 0.5em;
      }
      
      /* Loading indicator */
      .quantum-button-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: inherit;
        border-radius: inherit;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      
      :host([loading]) .quantum-button-loading {
        opacity: 1;
      }
      
      :host([loading]) .quantum-button-layout {
        opacity: 0;
      }
      
      .quantum-loading-dot {
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        background-color: currentColor;
        margin: 0 0.25em;
        animation: quantum-loading-pulse 1.4s infinite ease-in-out both;
      }
      
      .quantum-loading-dot:nth-child(1) {
        animation-delay: -0.32s;
      }
      
      .quantum-loading-dot:nth-child(2) {
        animation-delay: -0.16s;
      }
      
      @keyframes quantum-loading-pulse {
        0%, 80%, 100% {
          transform: scale(0);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      /* State styling */
      :host([disabled]) .quantum-button-native {
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .quantum-button-native:hover {
        transform: translateY(-2px);
      }
      
      .quantum-button-native:active {
        transform: translateY(1px);
      }
      
      /* Variants */
      :host([variant="primary"]) .quantum-container {
        --quantum-clarity: 0.7;
        --quantum-luminance: 0.9;
        background-color: rgba(30, 144, 255, 0.9);
        box-shadow: 0 4px 20px rgba(30, 144, 255, 0.4);
      }
      
      :host([variant="primary"]) .quantum-button-native {
        color: white;
      }
      
      :host([variant="secondary"]) .quantum-container {
        --quantum-clarity: 0.8;
        --quantum-luminance: 0.7;
        background-color: rgba(240, 240, 255, 0.3);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
      
      :host([variant="tertiary"]) .quantum-container {
        --quantum-clarity: 0.9;
        --quantum-luminance: 0.5;
        background-color: transparent;
        box-shadow: none;
      }
      
      :host([variant="tertiary"]) .quantum-button-native {
        padding: var(--button-padding-y) calc(var(--button-padding-x) * 0.5);
      }
      
      /* Emphasis levels */
      :host([emphasis="high"]) .quantum-container {
        --quantum-luminance: 1;
      }
      
      :host([emphasis="low"]) .quantum-container {
        --quantum-luminance: 0.4;
      }
      
      /* Sizes */
      :host([size="small"]) {
        --button-font-size: 0.875rem;
        --button-padding-x: 1rem;
        --button-padding-y: 0.5rem;
      }
      
      :host([size="large"]) {
        --button-font-size: 1.125rem;
        --button-padding-x: 2rem;
        --button-padding-y: 1rem;
      }
    `;
    this.shadowRoot.appendChild(style);
  }
  
  /**
   * Handle button state changes
   * @private
   */
  _updateButtonState() {
    // Update disabled state
    this._buttonElement.disabled = this._buttonState.disabled;
    
    // Update internal state for animation
    if (this._buttonState.loading) {
      this.setAttribute('state', 'loading');
    } else if (this._buttonState.disabled) {
      this.setAttribute('state', 'disabled');
    } else if (this._buttonState.active) {
      this.setAttribute('state', 'active');
    } else if (this._buttonState.hover) {
      this.setAttribute('state', 'hover');
    } else {
      this.removeAttribute('state');
    }
  }
  
  /**
   * Update icons based on attributes
   * @private
   */
  _updateIconsFromAttributes() {
    const icon = this.getAttribute('icon');
    const position = this.getAttribute('icon-position') || 'left';
    
    // Clear existing icons
    this._iconLeft.innerHTML = '';
    this._iconRight.innerHTML = '';
    
    if (icon) {
      const iconElement = document.createElement('div');
      iconElement.classList.add('quantum-icon');
      
      // Check if it's a named icon or custom HTML
      if (icon.includes('<')) {
        iconElement.innerHTML = icon;
      } else {
        // Use from icon registry or create placeholder
        iconElement.textContent = icon;
        iconElement.classList.add('quantum-icon-name');
      }
      
      // Add to appropriate container
      if (position === 'right') {
        this._iconRight.appendChild(iconElement);
      } else {
        this._iconLeft.appendChild(iconElement);
      }
    }
  }
  
  /**
   * Connected callback - invoked when element is added to the document
   * @override
   */
  connectedCallback() {
    super.connectedCallback();
    
    // Add button-specific event listeners
    this._buttonElement.addEventListener('mouseenter', this._handleMouseEnter.bind(this));
    this._buttonElement.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
    this._buttonElement.addEventListener('mousedown', this._handleMouseDown.bind(this));
    this._buttonElement.addEventListener('mouseup', this._handleMouseUp.bind(this));
    this._buttonElement.addEventListener('focus', this._handleFocus.bind(this));
    this._buttonElement.addEventListener('blur', this._handleBlur.bind(this));
    this._buttonElement.addEventListener('click', this._handleClick.bind(this));
    
    // Set initial disabled state
    if (this.hasAttribute('disabled')) {
      this._buttonState.disabled = true;
      this._updateButtonState();
    }
    
    // Set initial loading state
    if (this.hasAttribute('loading')) {
      this._buttonState.loading = true;
      this._updateButtonState();
    }
  }
  
  /**
   * Disconnected callback - invoked when element is removed from the document
   * @override
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Remove button-specific event listeners
    if (this._buttonElement) {
      this._buttonElement.removeEventListener('mouseenter', this._handleMouseEnter);
      this._buttonElement.removeEventListener('mouseleave', this._handleMouseLeave);
      this._buttonElement.removeEventListener('mousedown', this._handleMouseDown);
      this._buttonElement.removeEventListener('mouseup', this._handleMouseUp);
      this._buttonElement.removeEventListener('focus', this._handleFocus);
      this._buttonElement.removeEventListener('blur', this._handleBlur);
      this._buttonElement.removeEventListener('click', this._handleClick);
    }
  }
  
  /**
   * Attribute changed callback
   * @override
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'disabled':
        this._buttonState.disabled = newValue !== null;
        this._updateButtonState();
        break;
        
      case 'loading':
        this._buttonState.loading = newValue !== null;
        this._updateButtonState();
        break;
        
      case 'emphasis':
        this._buttonProps.emphasis = newValue || 'medium';
        break;
        
      case 'icon':
      case 'icon-position':
        this._buttonProps.iconPosition = this.getAttribute('icon-position') || 'left';
        this._updateIconsFromAttributes();
        break;
        
      case 'interaction-ripple':
        this._buttonProps.interactionRipple = newValue !== 'false';
        break;
    }
  }
  
  /**
   * Handle mouse enter
   * @private
   * @param {MouseEvent} event - Mouse event
   */
  _handleMouseEnter(event) {
    if (this._buttonState.disabled || this._buttonState.loading) return;
    
    this._buttonState.hover = true;
    this._updateButtonState();
    
    // Boost energy level
    this.setEnergyLevel(0.8);
  }
  
  /**
   * Handle mouse leave
   * @private
   * @param {MouseEvent} event - Mouse event
   */
  _handleMouseLeave(event) {
    if (this._buttonState.disabled || this._buttonState.loading) return;
    
    this._buttonState.hover = false;
    this._updateButtonState();
    
    // Reduce energy level
    this.setEnergyLevel(0.6);
  }
  
  /**
   * Handle mouse down
   * @private
   * @param {MouseEvent} event - Mouse event
   */
  _handleMouseDown(event) {
    if (this._buttonState.disabled || this._buttonState.loading) return;
    
    this._buttonState.active = true;
    this._updateButtonState();
    
    // Maximum energy when pressed
    this.setEnergyLevel(1.0);
  }
  
  /**
   * Handle mouse up
   * @private
   * @param {MouseEvent} event - Mouse event
   */
  _handleMouseUp(event) {
    if (this._buttonState.disabled || this._buttonState.loading) return;
    
    this._buttonState.active = false;
    this._updateButtonState();
    
    // Return to hover energy
    this.setEnergyLevel(0.8);
  }
  
  /**
   * Handle focus
   * @private
   * @param {FocusEvent} event - Focus event
   */
  _handleFocus(event) {
    if (this._buttonState.disabled || this._buttonState.loading) return;
    
    // Add focus styling
    this._content.classList.add('focus-visible');
    
    // Increase energy slightly
    this.setEnergyLevel(0.7);
  }
  
  /**
   * Handle blur
   * @private
   * @param {FocusEvent} event - Blur event
   */
  _handleBlur(event) {
    // Remove focus styling
    this._content.classList.remove('focus-visible');
    
    // Return to default energy
    this.setEnergyLevel(0.6);
  }
  
  /**
   * Handle click
   * @private
   * @param {MouseEvent} event - Click event
   */
  _handleClick(event) {
    if (this._buttonState.disabled || this._buttonState.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Create ripple if enabled
    if (this._buttonProps.interactionRipple && this._createRippleEffect) {
      this._createRippleEffect(event);
    }
    
    // Dispatch quantum click event
    this._dispatchQuantumEvent('quantum-click', {
      originalEvent: event,
      energy: this._quantumState.energyLevel,
      phase: this._quantumState.phase
    });
  }
  
  /**
   * Public API - Set loading state
   * @param {boolean} isLoading - Whether button is in loading state
   */
  setLoading(isLoading) {
    if (isLoading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }
  
  /**
   * Public API - Set disabled state
   * @param {boolean} isDisabled - Whether button is disabled
   */
  setDisabled(isDisabled) {
    if (isDisabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  
  /**
   * Public API - Set icon
   * @param {string} icon - Icon name or HTML
   * @param {string} position - Position ('left' or 'right')
   */
  setIcon(icon, position = 'left') {
    this.setAttribute('icon', icon);
    this.setAttribute('icon-position', position);
  }
  
  /**
   * Public API - Remove icon
   */
  removeIcon() {
    this.removeAttribute('icon');
  }
  
  /**
   * Public API - Get native button element
   * @returns {HTMLButtonElement} Native button element
   */
  getNativeElement() {
    return this._buttonElement;
  }
  
  /**
   * Public API - Programmatically click the button
   */
  click() {
    this._buttonElement.click();
  }
}

// Define custom element
customElements.define('quantum-button', QuantumButton);