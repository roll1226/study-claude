import { useCallback } from 'react';
import { useDeleteTodo } from '../model/useDeleteTodo';
import { Button } from '@/shared/ui/Button';

export interface DeleteTodoButtonProps {
  todoId: string;
}

export function DeleteTodoButton({ todoId }: DeleteTodoButtonProps) {
  const { deleteTodo } = useDeleteTodo();

  const handleDelete = useCallback(() => {
    if (window.confirm('このタスクを削除しますか？')) {
      deleteTodo(todoId);
    }
  }, [deleteTodo, todoId]);

  return (
    <Button variant="danger" size="small" onClick={handleDelete} aria-label="タスクを削除">
      削除
    </Button>
  );
}
