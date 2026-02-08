import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import type { TodoFilter } from '@/entities/todo/model/types';

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
}

export function useTodos() {
  const { state, dispatch } = useTodoContext();
  return { todos: state.todos, dispatch };
}

export function useFilteredTodos() {
  const { state } = useTodoContext();

  const filteredTodos = state.todos.filter((todo) => {
    if (state.currentFilter === 'all') return true;
    return todo.status === state.currentFilter;
  });

  return {
    todos: filteredTodos,
    filter: state.currentFilter,
    allTodos: state.todos,
  };
}

export function useCurrentFilter() {
  const { state, dispatch } = useTodoContext();

  const setFilter = (filter: TodoFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return {
    filter: state.currentFilter,
    setFilter,
  };
}
