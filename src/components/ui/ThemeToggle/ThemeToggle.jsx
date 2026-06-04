import { Sun, Moon } from 'lucide-react';
import React, { memo } from 'react';

import { useTheme } from '@/providers/ThemeProvider';

// ─── Component ────────────────────────────────────────────────────────────────

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative rounded-md border border-border bg-surface p-2 transition-all duration-200 hover:border-border hover:bg-canvas-inset focus:outline-none focus:ring-2 focus:ring-accent-emphasis focus:ring-offset-2 focus:ring-offset-canvas-default cursor-pointer"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative h-5 w-5">
        {/* Sun Icon (Light Mode) */}
        <Sun
          className={`absolute left-0 top-0 h-5 w-5 transition-all duration-300 text-warning ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-75 rotate-90 opacity-0'
          }`}
        />

        {/* Moon Icon (Dark Mode) */}
        <Moon
          className={`absolute left-0 top-0 h-5 w-5 transition-all duration-300 text-brand ${
            isDark ? 'scale-75 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
      </div>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

// ─── Sub-Components ────────────────────────────────────────────────────────────

export const ThemeToggleWithLabel = memo(function ThemeToggleWithLabel() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 transition-all duration-200 hover:border-border hover:bg-canvas-inset focus:outline-none focus:ring-2 focus:ring-accent-emphasis focus:ring-offset-2 focus:ring-offset-canvas-default"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Icon */}
      <div className="relative h-5 w-5">
        <Sun
          className={`absolute left-0 top-0 h-5 w-5 transition-all duration-300 text-warning ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-75 rotate-90 opacity-0'
          }`}
        />
        <Moon
          className={`absolute left-0 top-0 h-5 w-5 transition-all duration-300 text-brand ${
            isDark ? 'scale-75 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
      </div>

      {/* Label */}
      <span className="font-medium text-sm text-ink">{isDark ? 'Light' : 'Dark'} Mode</span>
    </button>
  );
});

ThemeToggleWithLabel.displayName = 'ThemeToggleWithLabel';

export const ThemeToggleCompact = memo(function ThemeToggleCompact() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full p-2 transition-colors duration-200 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent-emphasis"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5 text-brand" />}
    </button>
  );
});

ThemeToggleCompact.displayName = 'ThemeToggleCompact';

export { ThemeToggle };
export default ThemeToggle;
