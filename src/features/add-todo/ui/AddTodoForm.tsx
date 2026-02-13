import { useState, useCallback } from 'react';
import styled from 'styled-components';
import type { FormEvent, ChangeEvent } from 'react';
import { useAddTodo } from '../model/useAddTodo';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { DEFAULT_STATUS } from '@/entities/todo/model/constants';
import { ERROR_MESSAGES } from '@/shared/constants/validation';

const Form = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

export function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { addTodo } = useAddTodo();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      addTodo({
        title,
        description: description || undefined,
        status: DEFAULT_STATUS,
      });

      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.ADD_FAILED);
    }
  }, [title, description, addTodo]);

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
        />
        <Input
          type="text"
          placeholder="説明（任意）"
          value={description}
          onChange={handleDescriptionChange}
        />
      </Fields>
      <Button type="submit" disabled={!title.trim()}>
        追加
      </Button>
    </Form>
  );
}
