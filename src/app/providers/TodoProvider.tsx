import { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { TodosState, Todo } from '@/entities/todo/model/types';
import { todoReducer } from '@/entities/todo/model/todoReducer';
import { getItem, setItem } from '@/shared/lib/storage';
import { STORAGE_KEYS } from '@/shared/constants/storage';
import { DEFAULT_FILTER } from '@/entities/todo/model/constants';
import { TodoContext } from './TodoContext';

const initialState: TodosState = {
  todos: [],
  currentFilter: DEFAULT_FILTER,
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState, () => {
    const stored = getItem<Todo[]>(STORAGE_KEYS.TODOS);
    if (stored) {
      return { todos: stored, currentFilter: DEFAULT_FILTER };
    }
    return initialState;
  });

  useEffect(() => {
    setItem(STORAGE_KEYS.TODOS, state.todos);
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
