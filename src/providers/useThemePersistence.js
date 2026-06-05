import { useEffect } from 'react';

import { THEME_CONSTANTS } from './themeConstants';
import { saveThemeToStorage, getSavedThemeFromStorage } from './themeStorage';

export const useThemePersistence = (theme, setThemeState) => {
  // Update DOM when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(THEME_CONSTANTS.LIGHT, THEME_CONSTANTS.DARK);
    root.classList.add(theme);

    saveThemeToStorage(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === THEME_CONSTANTS.DARK ? THEME_CONSTANTS.COLORS.DARK : THEME_CONSTANTS.COLORS.LIGHT
      );
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const savedTheme = getSavedThemeFromStorage();
    if (savedTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setThemeState(e.matches ? THEME_CONSTANTS.DARK : THEME_CONSTANTS.LIGHT);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [setThemeState]);
};
