// types
export type {
  Todo,
  TodoStatus,
  TodoInput,
  TodoUpdate,
  TodoFilter,
  TodosState,
  TodoAction,
} from './model/types';

// constants
export {
  TODO_STATUSES,
  DEFAULT_STATUS,
  DEFAULT_FILTER,
  TODO_FILTERS,
  STATUS_LABELS,
  FILTER_LABELS,
} from './model/constants';

// reducer
export { todoReducer } from './model/todoReducer';

// lib
export { validateTodoInput, generateTodoId, createTodo } from './lib';

// ui
export { TodoItem } from './ui/TodoItem';
export type { TodoItemProps } from './ui/TodoItem';
export { TodoStatusBadge } from './ui/TodoStatusBadge';
export type { TodoStatusBadgeProps } from './ui/TodoStatusBadge';
