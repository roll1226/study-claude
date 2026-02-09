import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode } from '@/shared/constants/theme';
import { DEFAULT_THEME_MODE, THEME_STORAGE_KEY } from '@/shared/constants/theme';
import { getItem, setItem } from '@/shared/lib/storage';
import { ThemeContext } from './ThemeContext';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const stored = getItem<ThemeMode>(THEME_STORAGE_KEY);
    return stored || DEFAULT_THEME_MODE;
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'light' : 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const effectiveTheme = useMemo(() => {
    if (themeMode === 'system') {
      return systemTheme;
    }
    return themeMode;
  }, [themeMode, systemTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, [effectiveTheme]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    setItem(THEME_STORAGE_KEY, mode);
  };

  const value = useMemo(
    () => ({
      themeMode,
      effectiveTheme,
      setThemeMode,
    }),
    [themeMode, effectiveTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
