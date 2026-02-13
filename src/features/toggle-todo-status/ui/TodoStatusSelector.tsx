import styled from 'styled-components';
import { useToggleTodoStatus } from '../model/useToggleTodoStatus';
import { STATUS_LABELS, TODO_STATUSES } from '@/entities/todo/model/constants';
import type { TodoStatus } from '@/entities/todo/model/types';

export interface TodoStatusSelectorProps {
  todoId: string;
  currentStatus: TodoStatus;
}

const StyledSelect = styled.select<{ $status: TodoStatus }>`
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  cursor: pointer;
  transition: all 0.2s;
  outline: none;

  &:hover {
    border-color: #646cff;
    background-color: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    border-color: #646cff;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
  }

  ${props => {
    switch (props.$status) {
      case 'pending':
        return 'border-color: rgba(239, 68, 68, 0.3);';
      case 'in_progress':
        return 'border-color: rgba(59, 130, 246, 0.3);';
      case 'completed':
        return 'border-color: rgba(34, 197, 94, 0.3);';
    }
  }}

  [data-theme='light'] & {
    background-color: #ffffff;
    color: #213547;
    border-color: rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;

export function TodoStatusSelector({ todoId, currentStatus }: TodoStatusSelectorProps) {
  const { changeTodoStatus } = useToggleTodoStatus();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeTodoStatus(todoId, e.target.value as TodoStatus);
  };

  return (
    <StyledSelect
      $status={currentStatus}
      value={currentStatus}
      onChange={handleChange}
    >
      {Object.values(TODO_STATUSES).map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status]}
        </option>
      ))}
    </StyledSelect>
  );
}
