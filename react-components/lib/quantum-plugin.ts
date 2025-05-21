import plugin from 'tailwindcss/plugin';

export const quantumPlugin = plugin(
  function({ addUtilities, theme, e }) {
    // Generate quantum energy utilities
    const energyUtilities = {};
    for (let i = 0; i <= 100; i++) {
      energyUtilities[`.${e(`quantum-energy-${i}`)}`] = {
        '--quantum-energy': `${i / 100}`
      };
    }

    // Generate quantum coherence utilities
    const coherenceUtilities = {};
    for (let i = 0; i <= 100; i++) {
      coherenceUtilities[`.${e(`quantum-coherence-${i}`)}`] = {
        '--quantum-coherence': `${i / 100}`
      };
    }

    // Generate quantum phase utilities
    const phaseUtilities = {};
    for (let i = 0; i <= 100; i++) {
      phaseUtilities[`.${e(`quantum-phase-${i}`)}`] = {
        '--quantum-phase': `${i / 100}`
      };
    }

    // Generate quantum observability utilities
    const observabilityUtilities = {};
    for (let i = 0; i <= 100; i++) {
      observabilityUtilities[`.${e(`quantum-observability-${i}`)}`] = {
        '--quantum-observability': `${i / 100}`
      };
    }

    // Generate quantum animation utilities
    const animationUtilities = {
      '.animate-quantum-breathe': {
        animation: 'quantum-breathe 4s infinite'
      },
      '.animate-quantum-pulse': {
        animation: 'quantum-pulse 2s infinite'
      },
      '.animate-quantum-glow': {
        animation: 'quantum-glow 3s infinite'
      },
      '.animate-quantum-excited': {
        animation: 'quantum-excited 0.5s infinite'
      }
    };

    // Generate quantum state utilities
    const stateUtilities = {
      '.quantum-pressed': {
        transform: 'scale(0.97)'
      },
      '.quantum-active': {
        '--quantum-energy': '0.8'
      },
      '.quantum-loading': {
        cursor: 'wait',
        opacity: '0.8'
      },
      '.quantum-success': {
        '--quantum-color-rgb': '88, 255, 88'
      },
      '.quantum-error': {
        '--quantum-color-rgb': '255, 88, 88'
      }
    };

    // Add all utilities
    addUtilities({
      ...energyUtilities,
      ...coherenceUtilities,
      ...phaseUtilities,
      ...observabilityUtilities,
      ...animationUtilities,
      ...stateUtilities
    });
  },
  {
    theme: {
      extend: {
        keyframes: {
          'quantum-breathe': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(calc(1 + (var(--quantum-energy) * 0.02)))' }
          },
          'quantum-pulse': {
            '0%, 100%': { opacity: 'calc(0.6 + (var(--quantum-energy) * 0.4))' },
            '50%': { opacity: '1' }
          },
          'quantum-glow': {
            '0%, 100%': { filter: 'brightness(1)' },
            '50%': { filter: 'brightness(calc(1 + (var(--quantum-energy) * 0.3)))' }
          },
          'quantum-excited': {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(1deg)' },
            '75%': { transform: 'rotate(-1deg)' }
          }
        }
      }
    }
  }
);
