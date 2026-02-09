import { useTheme } from '@/app/providers/useTheme';

export function useToggleTheme() {
  const { themeMode, effectiveTheme, setThemeMode } = useTheme();

  return {
    themeMode,
    effectiveTheme,
    setThemeMode,
  };
}
