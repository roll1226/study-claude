import { createContext } from 'react';
import type { ThemeMode } from '@/shared/constants/theme';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
