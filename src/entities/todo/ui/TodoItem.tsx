import { memo } from 'react';
import styled from 'styled-components';
import type { Todo } from '../model/types';
import { TodoStatusBadge } from './TodoStatusBadge';
import { Card } from '@/shared/ui/Card';
import { formatDate } from '@/shared/lib/date/formatDate';

export interface TodoItemProps {
  todo: Todo;
  children?: React.ReactNode;
}

const StyledCard = styled(Card)<{ $status: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  ${props => props.$status === 'completed' && `opacity: 0.7;`}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Title = styled.h3<{ $completed: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  word-break: break-word;

  ${props => props.$completed && `
    text-decoration: line-through;
    opacity: 0.6;
  `}
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  word-break: break-word;

  [data-theme='light'] & {
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  [data-theme='light'] & {
    border-top-color: rgba(0, 0, 0, 0.1);
  }
`;

const Date = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);

  [data-theme='light'] & {
    color: rgba(0, 0, 0, 0.65);
  }
`;

export const TodoItem = memo(function TodoItem({ todo, children }: TodoItemProps) {
  return (
    <StyledCard $status={todo.status}>
      <Header>
        <TitleSection>
          <Title $completed={todo.status === 'completed'}>{todo.title}</Title>
          <TodoStatusBadge status={todo.status} />
        </TitleSection>
        <Actions>{children}</Actions>
      </Header>

      {todo.description && <Description>{todo.description}</Description>}

      <Footer>
        <Date>更新: {formatDate(todo.updatedAt)}</Date>
      </Footer>
    </StyledCard>
  );
});
