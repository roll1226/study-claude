import { useTodoContext } from '@/app/providers/useTodoHooks';
import { validateTodoInput } from '@/entities/todo/lib';
import type { TodoUpdate } from '@/entities/todo/model/types';

export function useEditTodo() {
  const { dispatch } = useTodoContext();

  const editTodo = (id: string, updates: TodoUpdate) => {
    if (updates.title !== undefined) {
      const errors = validateTodoInput({ title: updates.title });
      if (errors.length > 0) {
        throw new Error(errors[0]);
      }
    }

    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, updates },
    });
  };

  return { editTodo };
}
