import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#f8f5f0',
        champagne: '#f3e9dc',
        blush: '#f4d6d1',
        softGold: '#c6a75e',
        gold: '#c6a75e',
        burgundy: '#7a3142',
        sage: '#8e9b88',
        sageDark: '#7c8876',
        cocoa: '#2f1c1f'
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        script: ['var(--font-script)']
      },
      boxShadow: {
        'gold-glow': '0 0 32px rgba(198, 167, 94, 0.35)',
        'gold-soft': '0 18px 50px rgba(47, 28, 31, 0.16)',
        'candle-soft': '0 20px 60px rgba(47, 28, 31, 0.24)'
      },
      backgroundImage: {
        'luxury-radial': 'radial-gradient(circle at top, rgba(244, 214, 209, 0.4), transparent 55%)',
        'champagne-sheen': 'linear-gradient(135deg, rgba(243, 233, 220, 0.92) 0%, rgba(248, 245, 240, 0.98) 45%, rgba(156, 175, 136, 0.35) 100%)',
        'gold-sheen': 'linear-gradient(120deg, rgba(198, 167, 94, 0.95), rgba(243, 233, 220, 0.8), rgba(198, 167, 94, 0.95))'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        petalFloat: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '100%': { transform: 'translate3d(-40px, 180px, 0) rotate(120deg)', opacity: '0' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        },
        pulseGold: {
          '0%': { boxShadow: '0 0 0 0 rgba(198, 167, 94, 0.5)' },
          '70%': { boxShadow: '0 0 0 16px rgba(198, 167, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(198, 167, 94, 0)' }
        },
        candleFlicker: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '0.95' }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite',
        'pulse-gold': 'pulseGold 4.5s ease-out infinite',
        'petal-float': 'petalFloat 8s ease-in infinite',
        'candle-flicker': 'candleFlicker 2.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
