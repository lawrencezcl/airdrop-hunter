// Modern Design System for Airdrop Hunter
// Light Theme with Glass-morphism and Modern UI Elements

export const designTokens = {
  // Color Palette - Light Theme
  colors: {
    // Primary colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },

    // Secondary colors
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },

    // Accent colors
    accent: {
      50: '#fef3e2',
      100: '#fdeacb',
      200: '#fad7b0',
      300: '#f5c06a',
      400: '#f0a738',
      500: '#ec8c23',
      600: '#db7219',
      700: '#b85c0f',
      800: '#954a14',
      900: '#7c3f13',
      950: '#43200b',
    },

    // Success colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },

    // Warning colors
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },

    // Error colors
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },

    // Neutral colors
    neutral: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Semantic colors
    semantic: {
      background: '#ffffff',
      foreground: '#0a0a0a',
      muted: '#f5f5f5',
      'muted-foreground': '#737373',
      popover: '#ffffff',
      'popover-foreground': '#0a0a0a',
      card: '#ffffff',
      'card-foreground': '#0a0a0a',
      border: '#e5e5e5',
      input: '#e5e5e5',
      ring: '#3b82f6',
    },

    // Glass morphism
    glass: {
      background: 'rgba(255, 255, 255, 0.8)',
      backgroundLight: 'rgba(255, 255, 255, 0.6)',
      backgroundHeavy: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(255, 255, 255, 0.2)',
      blur: '12px',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    48: '12rem',
    64: '16rem',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

    // Modern glass shadow
    glass: '0 8px 32px 0 rgb(31 38 135 / 0.15)',
    glassSm: '0 4px 16px 0 rgb(31 38 135 / 0.1)',
    glassLg: '0 16px 48px 0 rgb(31 38 135 / 0.2)',

    // Colored shadows
    primary: '0 4px 14px 0 rgb(59 130 246 / 0.15)',
    secondary: '0 4px 14px 0 rgb(168 85 247 / 0.15)',
    success: '0 4px 14px 0 rgb(34 197 94 / 0.15)',
    warning: '0 4px 14px 0 rgb(245 158 11 / 0.15)',
    error: '0 4px 14px 0 rgb(239 68 68 / 0.15)',
  },

  // Animation and Transitions
  animation: {
    none: 'none',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',

    // Custom animations
    'fade-in': 'fadeIn 0.5s ease-out',
    'slide-up': 'slideUp 0.4s ease-out',
    'slide-down': 'slideDown 0.4s ease-out',
    'scale-in': 'scaleIn 0.3s ease-out',
    'float': 'float 3s ease-in-out infinite',
    'glow': 'glow 2s ease-in-out infinite alternate',
    'shimmer': 'shimmer 2s linear infinite',
  },

  transition: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    timingFunction: {
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Component specific tokens
  components: {
    button: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem',
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
        xl: '1.25rem 2.5rem',
      },
    },

    card: {
      padding: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      gap: '1.5rem',
    },

    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
      padding: '0 1rem',
    },

    navigation: {
      height: '4rem',
      padding: '0 1.5rem',
    },
  },
}

// Custom utility classes for common patterns
export const utilityClasses = {
  glass: {
    light: 'bg-white/60 backdrop-blur-md border border-white/20',
    medium: 'bg-white/80 backdrop-blur-lg border border-white/20',
    heavy: 'bg-white/95 backdrop-blur-xl border border-white/20',
  },

  gradient: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
    accent: 'bg-gradient-to-r from-orange-400 to-pink-400',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    hero: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  },

  text: {
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  },

  shadow: {
    card: 'shadow-lg shadow-gray-100/50',
    cardHover: 'hover:shadow-xl hover:shadow-gray-200/50',
    button: 'shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-600/30',
  },
}

export default designTokens