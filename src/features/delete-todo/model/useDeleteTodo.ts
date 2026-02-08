import { useTodoContext } from '@/app/providers';

export function useDeleteTodo() {
  const { dispatch } = useTodoContext();

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return { deleteTodo };
}
