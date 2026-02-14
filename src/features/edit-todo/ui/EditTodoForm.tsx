import { useState, useCallback } from 'react';
import styled from 'styled-components';
import type { FormEvent, ChangeEvent } from 'react';
import { useEditTodo } from '../model/useEditTodo';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import type { Todo } from '@/entities/todo/model/types';
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

  const handleSubmit = useCallback((e: FormEvent) => {
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
  }, [editTodo, todo.id, title, description, onSave]);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Fields>
        <Input
          type="text"
          placeholder="タスクを入力..."
          value={title}
          onChange={handleTitleChange}
          error={error}
          aria-label="タスクのタイトル"
        />
        <Input
          type="text"
          placeholder="説明（任意）"
          value={description}
          onChange={handleDescriptionChange}
          aria-label="タスクの説明"
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
