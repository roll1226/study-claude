import styled from 'styled-components';
import { useToggleTheme } from '../model/useToggleTheme';
import type { ThemeMode } from '@/shared/constants/theme';
import { THEME_LABELS } from '@/shared/constants/theme';

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  [data-theme='light'] & {
    color: #1a202c;
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const Icon = styled.span`
  font-size: 1.125rem;
`;

const THEME_ICONS: Record<ThemeMode, string> = {
  light: '☀️',
  dark: '🌙',
  system: '💻',
};

export function ThemeToggleButton() {
  const { themeMode, setThemeMode } = useToggleTheme();

  const cycleTheme = () => {
    const modes: ThemeMode[] = ['system', 'light', 'dark'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  return (
    <ToggleButton onClick={cycleTheme} title={`テーマ: ${THEME_LABELS[themeMode]}`}>
      <Icon>{THEME_ICONS[themeMode]}</Icon>
      <span>{THEME_LABELS[themeMode]}</span>
    </ToggleButton>
  );
}
