export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_MODES: Record<ThemeMode, ThemeMode> = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export const THEME_STORAGE_KEY = 'theme-mode';

export const THEME_LABELS: Record<ThemeMode, string> = {
  light: 'ライト',
  dark: 'ダーク',
  system: 'システム',
};
