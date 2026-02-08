import { useTodoContext } from '@/app/providers';
import { createTodo, validateTodoInput } from '@/entities/todo';
import type { TodoInput } from '@/entities/todo';

export function useAddTodo() {
  const { dispatch } = useTodoContext();

  const addTodo = (input: TodoInput) => {
    const errors = validateTodoInput(input);
    if (errors.length > 0) {
      throw new Error(errors[0]);
    }

    const newTodo = createTodo(input);
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  return { addTodo };
}
