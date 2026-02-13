import { useTodoContext } from '@/app/providers/useTodoHooks';
import type { TodoStatus } from '@/entities/todo/model/types';

export function useToggleTodoStatus() {
  const { dispatch } = useTodoContext();

  const changeTodoStatus = (id: string, status: TodoStatus) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, updates: { status } },
    });
  };

  return { changeTodoStatus };
}
