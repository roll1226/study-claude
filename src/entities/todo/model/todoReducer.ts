import type { TodosState, TodoAction } from './types';

export function todoReducer(state: TodosState, action: TodoAction): TodosState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                ...action.payload.updates,
                updatedAt: Date.now(),
              }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        currentFilter: action.payload,
      };

    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
}
