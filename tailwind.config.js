/**
 * Tailwind CSS Configuration for CFA Study Platform
 *
 * This configuration file tells Tailwind CSS how to generate utility classes based on
 * our custom theme. The key insight here is that we're bridging between our JavaScript
 * theme definition (theme.js) and Tailwind's utility class system.
 *
 * How it works:
 * 1. We import our theme configuration from theme.js
 * 2. We map our theme colors to CSS custom properties in index.css
 * 3. Tailwind generates classes like "bg-canvas-default" that use var(--color-canvas-default)
 * 4. This creates a seamless connection between our theme system and Tailwind utilities
 *
 * The benefit of this approach is that when users toggle dark mode, the CSS variables
 * change automatically, and all Tailwind classes update without any additional code.
 */

import { THEME } from './src/styles/theme.js'

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Content Paths
   *
   * This tells Tailwind which files to scan for class names. Tailwind will look through
   * all these files and generate CSS only for the classes you actually use. This keeps
   * your final CSS bundle small and fast to download.
   *
   * The glob patterns mean:
   * - ./index.html: Scan the root HTML file
   * - ./src: Scan all JavaScript files in src, no matter how deep
   */
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  /**
   * Dark Mode Strategy
   *
   * We use 'class' strategy which means dark mode is controlled by adding/removing
   * the 'dark' class on the <html> element. This gives us programmatic control.
   *
   * Alternative approaches and why we didn't use them:
   * - 'media': Uses system preference only, no manual control
   * - ['class', '[data-theme="dark"]']: More complex, no real benefit for our use case
   */
  darkMode: 'class',

  theme: {
    /**
     * Extending vs. Replacing
     *
     * When you put values in the 'extend' object, you're ADDING to Tailwind's defaults,
     * not replacing them. This means you keep all of Tailwind's built-in utilities
     * (like bg-red-500, text-blue-600, etc.) and add your custom ones on top.
     *
     * If you put values directly in 'theme' instead of 'theme.extend', you'd completely
     * replace Tailwind's defaults, losing hundreds of useful utilities. That's rarely
     * what you want.
     */
    extend: {
      /**
       * Custom Colors
       *
       * These map to the CSS custom properties we defined in index.css. When you use
       * className="bg-bg", Tailwind generates CSS that uses
       * var(--color-bg), which pulls from our theme system.
       *
       * The magic here is that the CSS variable changes based on light/dark mode,
       * so the Tailwind classes automatically adapt. No need for special dark: variants.
       */
      colors: {
        bg: 'var(--color-bg)',
        brand: {
          DEFAULT:  'var(--color-brand)',
          mid:      'var(--color-brand-mid)',
          bright:   'var(--color-brand-bright)',
          subtle:   'var(--color-brand-subtle)',
          dark:     'var(--color-brand-dark)',
        },
        highlight: {
          DEFAULT:  'var(--color-highlight)',
          hover:    'var(--color-highlight-hover)',
          tint:     'var(--color-highlight-tint)',
        },
        secondary: {
          DEFAULT:  'var(--color-secondary)',
          hover:    'var(--color-secondary-hover)',
          tint:     'var(--color-secondary-tint)',
        },
        amber: {
          DEFAULT:  'var(--color-amber)',
          tint:     'var(--color-amber-tint)',
        },
        charcoal: {
          DEFAULT:  'var(--color-charcoal)',
          tint:     'var(--color-charcoal-tint)',
        },
        ink: {
          DEFAULT:   'var(--color-ink)',
          secondary: 'var(--color-ink-secondary)',
          tertiary:  'var(--color-ink-tertiary)',
          inverted:  'var(--color-ink-inverted)',
        },
        surface: {
          DEFAULT:   'var(--color-surface)',
          '2':       'var(--color-surface-2)',
        },
        border: {
          DEFAULT:   'var(--color-border)',
          strong:    'var(--color-border-strong)',
        },
        success: {
          DEFAULT:   'var(--color-success)',
          mid:       'var(--color-success-mid)',
          tint:      'var(--color-success-tint)',
        },
        error: {
          DEFAULT:   'var(--color-error)',
          mid:       'var(--color-error-mid)',
          tint:      'var(--color-error-tint)',
        },
        warning: {
          DEFAULT:   'var(--color-warning)',
          tint:      'var(--color-warning-tint)',
        },
        info: {
          DEFAULT:   'var(--color-info)',
          tint:      'var(--color-info-tint)',
        },
        focus: 'var(--color-focus)',
        overlay: 'var(--color-overlay)',
        disabled: {
          bg: 'var(--color-disabled-bg)',
          text: 'var(--color-disabled-text)',
        }
      },

      /**
       * Font Families
       *
       * These map directly to our theme.js font definitions. When you use
       * className="font-sans" or "font-mono", Tailwind will apply these fonts.
       */
      fontFamily: {
        sans: THEME.typography.fontFamily.sans.split(',').map((f) => f.trim()),
        mono: THEME.typography.fontFamily.mono.split(',').map((f) => f.trim()),
        serif: THEME.typography.fontFamily.serif.split(',').map((f) => f.trim()),
      },

      /**
       * Font Sizes
       *
       * We define our type scale here. Each size includes both the font size and
       * an appropriate line height. This ensures text is readable at every size.
       *
       * Example: text-base gives you 16px font with 1.5 line height
       */
      fontSize: THEME.typography.fontSize,

      /**
       * Box Shadows
       *
       * Custom shadows create depth and elevation in your interface. We keep them
       * subtle to avoid overwhelming the content - remember, the focus should be
       * on the educational material, not the UI.
       */
      boxShadow: {
        ...THEME.shadows,
        // Add new semantic shadows
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        card: 'var(--shadow-card)',
        float: 'var(--shadow-float)',
      },

      /**
       * Border Radius
       *
       * Consistent rounding throughout the application creates a cohesive feel.
       * We favor modern, slightly rounded corners over sharp 90-degree angles.
       */
      borderRadius: THEME.borderRadius,

      /**
       * Spacing Scale
       *
       * While Tailwind has a comprehensive spacing scale, we add a few custom
       * values that are useful for our specific layout needs.
       */
      spacing: {
        4.5: '1.125rem', // 18px - useful for certain button paddings
        18: '4.5rem', // 72px - for larger gaps
        22: '5.5rem', // 88px - custom large spacing
      },

      /**
       * Z-Index Layers
       *
       * Predefined z-index values prevent "z-index wars" where you keep adding
       * higher and higher values trying to get one element above another.
       *
       * Instead, use these semantic names. For example, a modal should always be
       * z-modal (1050), and a tooltip should always be z-tooltip (1070).
       */
      zIndex: THEME.zIndex,

      /**
       * Animation and Transitions
       *
       * Smooth animations make your application feel polished and professional.
       * We define custom animations for common patterns like fading in content
       * or sliding in sidebars.
       */
      animation: {
        'fade-in': 'fadeIn 300ms ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideInLeft 200ms ease-out forwards',
      },

      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },

      /**
       * Transition Durations and Timing
       *
       * Consistent timing across all transitions creates a unified feel. Use these
       * predefined durations rather than arbitrary numbers.
       */
      transitionDuration: THEME.transitions.duration,

      transitionTimingFunction: {
        DEFAULT: THEME.transitions.timing.ease,
        ...THEME.transitions.timing,
      },

      /**
       * Breakpoints
       *
       * Our responsive breakpoints cover all common device sizes. When you use
       * responsive utilities like md:text-lg, you're using these breakpoints.
       */
      screens: THEME.breakpoints,
    },
  },

  /**
   * Plugins
   *
   * Tailwind plugins add additional functionality. Currently, we keep it minimal,
   * but you could add useful plugins like:
   *
   * - @tailwindcss/forms: Better form styling out of the box
   * - @tailwindcss/typography: Beautiful prose styling for long-form content
   * - @tailwindcss/aspect-ratio: Aspect ratio utilities for images and videos
   *
   * You can install these with: npm install @tailwindcss/forms
   */
  plugins: [],
}

