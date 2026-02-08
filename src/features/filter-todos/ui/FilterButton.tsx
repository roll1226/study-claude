import styled from 'styled-components';
import { Button } from '@/shared/ui';
import type { TodoFilter } from '@/entities/todo';
import { FILTER_LABELS } from '@/entities/todo';

export interface FilterButtonProps {
  filter: TodoFilter;
  isActive: boolean;
  count: number;
  onClick: () => void;
}

const StyledButton = styled(Button)<{ $isActive: boolean }>`
  min-width: 100px;
  white-space: nowrap;

  ${props => props.$isActive && 'font-weight: 600;'}

  @media (max-width: 640px) {
    min-width: auto;
    flex: 1;
  }
`;

export function FilterButton({ filter, isActive, count, onClick }: FilterButtonProps) {
  return (
    <StyledButton
      variant={isActive ? 'primary' : 'secondary'}
      size="small"
      onClick={onClick}
      $isActive={isActive}
    >
      {FILTER_LABELS[filter]} ({count})
    </StyledButton>
  );
}
