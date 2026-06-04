/**
 * Unified Theme System for CFA Study Platform
 *
 * This theme follows a monotone + accent color philosophy:
 * - Monotone (Neutral Grays): Used for 90% of the interface - backgrounds, text, borders
 * - Accent (Vibrant Blue): Used strategically for interactive elements, CTAs, and highlights
 * - Semantic Colors: Success/Warning/Error states use their traditional colors
 *
 * The theme supports both light and dark modes with carefully calibrated contrast ratios
 * to ensure readability during long study sessions.
 */

export const THEME = {
  // ========================================
  // MONOTONE PALETTE (Neutral Grays)
  // ========================================
  // This is your primary color system. We use warm grays to reduce eye strain.
  neutral: {
    // Light Mode Neutrals (Warm, slightly beige tint)
    light: {
      50: '#F5F5F0', // Off-White (Background)
      100: '#EDEDE8', // Light Beige
      200: '#E8DBC5', // Sand (Surface)
      300: '#D0BFA0', // Tan (Border)
      400: '#8C9490', // Muted Sage Gray (Text)
      500: '#5E6660', // Darker Muted Sage
      600: '#4A524D', // Charcoal Green
      700: '#2A332E', // Dark Charcoal (Primary Text)
      800: '#1F2622', // Deepest Charcoal
      900: '#141A17', // Almost Black
    },

    // Dark Mode Neutrals (Cool, slightly blue tint for reduced eye strain)
    dark: {
      50: '#0F1C2E', // Deepest Blue (Background)
      100: '#1F2B3E', // Dark Blue (Surface)
      200: '#2B394F', // Interpolated
      300: '#374357', // Slate Blue (Border)
      400: '#626F80', // Interpolated
      500: '#8D9BA8', // Steel (Muted Text)
      600: '#B7BABC', // Interpolated
      700: '#E0D8CC', // Beige (Default Text)
      800: '#ECE8E1', // Lighter Beige
      900: '#F7F5F2', // Lightest Beige
    },
  },

  // ========================================
  // ACCENT PALETTE (Vibrant Blue)
  // ========================================
  // This is your only chromatic color for the main interface.
  // Blue conveys trust, professionalism, and is associated with finance.
  accent: {
    50: '#F1F5F2', // Subtle Sage Tint
    100: '#E0E8E2', // Light Sage Background
    200: '#C8D6CC', // Sage Borders
    300: '#A5BDB0', // Hover Sage
    400: '#81A490', // Interactive Sage
    500: '#5E8C6A', // Primary Sage (Main Accent)
    600: '#4A7355', // Active Sage
    700: '#385942', // Dark Sage
    800: '#284030', // Darkest Sage
    900: '#19291F', // Deep Forest
  },

  // ========================================
  // SEMANTIC COLORS (Functional States)
  // ========================================
  // These colors have specific meanings and should be used consistently.

  // Success states (green) - for correct answers, completed modules, achievements
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Primary success
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // Warning states (amber) - for cautions, important notices, exam tips
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Primary warning
    600: '#D97706',
    700: '#B45309',
    800: '#92400e',
    900: '#78350F',
  },

  // Error states (red) - for incorrect answers, validation errors, critical warnings
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Primary error
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Info states (cyan) - for informational messages, tips, additional context
  info: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    200: '#A5F3FC',
    300: '#67E8F9',
    400: '#22D3EE',
    500: '#06B6D4', // Primary info
    600: '#0891B2',
    700: '#0E7490',
    800: '#155E75',
    900: '#164E63',
  },

  // ========================================
  // TYPOGRAPHY
  // ========================================
  // Professional, readable fonts for financial content
  typography: {
    fontFamily: {
      // Primary sans-serif for UI and body text
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",

      // Monospace for formulas, code, and financial calculations
      mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, 'Courier New', monospace",

      // Serif for emphasized headings (optional, for formal content)
      serif: "'Merriweather', Georgia, 'Times New Roman', serif",
    },

    // Type scale following a 1.2 ratio (major third) for harmonious sizing
    fontSize: {
      xs: '0.75rem', // 12px - Small labels, captions
      sm: '0.875rem', // 14px - Secondary text, helper text
      base: '1rem', // 16px - Body text (default)
      lg: '1.125rem', // 18px - Large body text
      xl: '1.25rem', // 20px - Small headings
      '2xl': '1.5rem', // 24px - Section headings
      '3xl': '1.875rem', // 30px - Page headings
      '4xl': '2.25rem', // 36px - Major headings
      '5xl': '3rem', // 48px - Hero headings
      '6xl': '3.75rem', // 60px - Display headings
    },

    // Font weights for hierarchy
    fontWeight: {
      normal: '400', // Body text
      medium: '500', // Emphasized text
      semibold: '600', // Subheadings
      bold: '700', // Headings
    },

    // Line heights optimized for readability
    lineHeight: {
      tight: '1.25', // Headings
      normal: '1.5', // Body text
      relaxed: '1.625', // Long-form content
      loose: '2', // Spacious content
    },

    // Letter spacing for different use cases
    letterSpacing: {
      tight: '-0.025em', // Large headings
      normal: '0', // Body text
      wide: '0.025em', // Small caps
      wider: '0.05em', // Labels, buttons
    },
  },

  // ========================================
  // SPACING SCALE
  // ========================================
  // Based on 4px grid for consistent spacing throughout the app
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  // ========================================
  // SHADOWS
  // ========================================
  // Subtle shadows for depth without distraction
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },

  // ========================================
  // BORDER RADIUS
  // ========================================
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px - Small elements
    base: '0.375rem', // 6px - Default (buttons, inputs)
    md: '0.5rem', // 8px - Cards
    lg: '0.75rem', // 12px - Large cards
    xl: '1rem', // 16px - Modals
    '2xl': '1.5rem', // 24px - Large modals
    full: '9999px', // Pills, circular elements
  },

  // ========================================
  // TRANSITIONS
  // ========================================
  // Smooth, professional animations
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth ease
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // Accelerate
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // Decelerate
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth both ends
    },
  },

  // ========================================
  // BREAKPOINTS (Responsive Design)
  // ========================================
  breakpoints: {
    sm: '640px', // Mobile landscape
    md: '768px', // Tablet portrait
    lg: '1024px', // Tablet landscape / Small desktop
    xl: '1280px', // Desktop
    '2xl': '1536px', // Large desktop
  },

  // ========================================
  // Z-INDEX LAYERS
  // ========================================
  // Organized layering system to prevent z-index conflicts
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export default THEME;
