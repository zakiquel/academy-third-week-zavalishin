import { useContext } from "react";

import { ThemeContext } from '../../context/ThemeContext';

import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";
import { Theme } from "@/shared/const/theme";

export interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}
export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }

  return {
    theme,
    toggleTheme
  }
}