import { THEME_CONSTANTS } from './themeConstants';

export const saveThemeToStorage = (theme) => {
  localStorage.setItem(THEME_CONSTANTS.STORAGE_KEY, theme);
};

export const getSavedThemeFromStorage = () => {
  return localStorage.getItem(THEME_CONSTANTS.STORAGE_KEY);
};
