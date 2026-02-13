import { useContext, useMemo } from 'react';
import { TodoContext } from './TodoContext';
import type { TodoFilter } from '@/entities/todo/model/types';
import { DEFAULT_FILTER } from '@/entities/todo/model/constants';

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

  const filteredTodos = useMemo(() => {
    return state.todos.filter((todo) => {
      if (state.currentFilter === DEFAULT_FILTER) return true;
      return todo.status === state.currentFilter;
    });
  }, [state.todos, state.currentFilter]);

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
