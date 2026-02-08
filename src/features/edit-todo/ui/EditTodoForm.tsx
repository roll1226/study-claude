import { useState } from 'react';
import styled from 'styled-components';
import type { FormEvent } from 'react';
import { useEditTodo } from '../model/useEditTodo';
import { Input, Button } from '@/shared/ui';
import type { Todo } from '@/entities/todo';
import { ERROR_MESSAGES } from '@/shared/constants/validation';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;

  @media (max-width: 640px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export interface EditTodoFormProps {
  todo: Todo;
  onCancel: () => void;
  onSave: () => void;
}

export function EditTodoForm({ todo, onCancel, onSave }: EditTodoFormProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [error, setError] = useState('');
  const { editTodo } = useEditTodo();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      editTodo(todo.id, {
        title,
        description: description || undefined,
      });
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.UPDATE_FAILED);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fields>
        <Input
          type="text"
          placeholder="タスクを入力..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error}
        />
        <Input
          type="text"
          placeholder="説明（任意）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Fields>
      <Actions>
        <Button type="submit" size="small" disabled={!title.trim()}>
          保存
        </Button>
        <Button type="button" variant="secondary" size="small" onClick={onCancel}>
          キャンセル
        </Button>
      </Actions>
    </Form>
  );
}
