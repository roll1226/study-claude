import styled from 'styled-components';
import type { TodoStatus } from '../model/types';
import { STATUS_LABELS } from '../model/constants';

export interface TodoStatusBadgeProps {
  status: TodoStatus;
}

const StyledBadge = styled.span<{ $status: TodoStatus }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  white-space: nowrap;

  ${props => {
    switch (props.$status) {
      case 'pending':
        return `
          background-color: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        `;
      case 'in_progress':
        return `
          background-color: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
      case 'completed':
        return `
          background-color: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
    }
  }}
`;

export function TodoStatusBadge({ status }: TodoStatusBadgeProps) {
  return (
    <StyledBadge $status={status}>
      {STATUS_LABELS[status]}
    </StyledBadge>
  );
}
