import { createContext } from 'react';
import type { TodosState, TodoAction } from '@/entities/todo/model/types';

interface TodoContextValue {
  state: TodosState;
  dispatch: (action: TodoAction) => void;
}

export const TodoContext = createContext<TodoContextValue | undefined>(undefined);
