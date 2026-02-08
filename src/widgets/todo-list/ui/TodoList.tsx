import { useState } from 'react';
import styled from 'styled-components';
import { useFilteredTodos } from '@/app/providers';
import { TodoItem } from '@/entities/todo';
import { AddTodoForm } from '@/features/add-todo';
import { DeleteTodoButton } from '@/features/delete-todo';
import { EditTodoForm } from '@/features/edit-todo';
import { TodoStatusSelector } from '@/features/toggle-todo-status';
import { Button } from '@/shared/ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FormContainer = styled.div`
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (prefers-color-scheme: light) {
    background-color: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.div`
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 3rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);

  p {
    margin: 0;
  }

  @media (prefers-color-scheme: light) {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const EmptyHint = styled.p`
  font-size: 0.875rem;
`;

export function TodoList() {
  const { todos } = useFilteredTodos();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (todos.length === 0) {
    return (
      <Container>
        <FormContainer>
          <AddTodoForm />
        </FormContainer>
        <EmptyState>
          <p>タスクがありません</p>
          <EmptyHint>上のフォームから新しいタスクを追加してください</EmptyHint>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <FormContainer>
        <AddTodoForm />
      </FormContainer>

      <Items>
        {todos.map((todo) => (
          <Item key={todo.id}>
            {editingId === todo.id ? (
              <EditTodoForm
                todo={todo}
                onCancel={() => setEditingId(null)}
                onSave={() => setEditingId(null)}
              />
            ) : (
              <TodoItem todo={todo}>
                <TodoStatusSelector todoId={todo.id} currentStatus={todo.status} />
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setEditingId(todo.id)}
                >
                  編集
                </Button>
                <DeleteTodoButton todoId={todo.id} />
              </TodoItem>
            )}
          </Item>
        ))}
      </Items>
    </Container>
  );
}
