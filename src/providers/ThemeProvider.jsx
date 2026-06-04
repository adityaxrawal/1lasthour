/* eslint-disable react-refresh/only-export-components */
/**
 * Theme Provider Component
 *
 * This component manages the application's theme state (light/dark mode) and provides
 * it to the entire application through React Context. It handles several important
 * responsibilities:
 *
 * 1. Reading the initial theme preference from localStorage
 * 2. Falling back to system preference if no saved preference exists
 * 3. Updating the DOM (adding/removing 'dark' class on <html>) when theme changes
 * 4. Saving the preference to localStorage for persistence across sessions
 * 5. Providing a simple API for components to toggle the theme
 *
 * The pattern we're using here is called "Context + Custom Hook". It's a common
 * React pattern for sharing state across many components without prop drilling.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

import { THEME_CONSTANTS } from './themeConstants';
import { getInitialTheme } from './themeUtils';
import { useThemePersistence } from './useThemePersistence';

const ThemeContext = createContext({
  theme: THEME_CONSTANTS.LIGHT,
  toggleTheme: () => {},
  setTheme: (_theme) => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Extracted persistence logic (DOM updates, localStorage, system listener)
  useThemePersistence(theme, setThemeState);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => (currentTheme === THEME_CONSTANTS.LIGHT ? THEME_CONSTANTS.DARK : THEME_CONSTANTS.LIGHT));
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (newTheme === THEME_CONSTANTS.LIGHT || newTheme === THEME_CONSTANTS.DARK) {
      setThemeState(newTheme);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
