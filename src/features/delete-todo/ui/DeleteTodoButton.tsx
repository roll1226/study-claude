import { useDeleteTodo } from '../model/useDeleteTodo';
import { Button } from '@/shared/ui/Button';

export interface DeleteTodoButtonProps {
  todoId: string;
}

export function DeleteTodoButton({ todoId }: DeleteTodoButtonProps) {
  const { deleteTodo } = useDeleteTodo();

  const handleDelete = () => {
    if (window.confirm('このタスクを削除しますか？')) {
      deleteTodo(todoId);
    }
  };

  return (
    <Button variant="danger" size="small" onClick={handleDelete}>
      削除
    </Button>
  );
}
