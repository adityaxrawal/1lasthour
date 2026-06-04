/**
 * Helper: Get System Theme Preference
 *
 * This function checks what theme the user's operating system is using.
 * Modern OSes (macOS, Windows, iOS, Android) let users choose between light
 * and dark modes. We can detect this preference and use it as our default.
 */
export const getSystemTheme = () => {
  // The matchMedia API checks if the user's system is set to dark mode
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
};

/**
 * Helper: Get Initial Theme
 *
 * When the app loads, we need to determine which theme to use. The priority is:
 * 1. User's saved preference (from localStorage)
 * 2. System theme preference
 * 3. Default to light mode
 *
 * This ensures we respect the user's explicit choice if they've made one, but
 * provide a sensible default if they haven't.
 */
export const getInitialTheme = () => {
  // Check if we're running in a browser (not during server-side rendering)
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Try to get the saved preference
  const savedTheme = localStorage.getItem('theme');

  // If the user has explicitly chosen a theme, use that
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  // Otherwise, use their system preference
  return getSystemTheme();
};
