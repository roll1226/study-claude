import type { TodoStatus, TodoFilter } from './types';

export const TODO_STATUSES: Record<TodoStatus, TodoStatus> = {
  pending: 'pending',
  in_progress: 'in_progress',
  completed: 'completed',
} as const;

export const DEFAULT_STATUS: TodoStatus = 'pending';
export const DEFAULT_FILTER: TodoFilter = 'all';

export const TODO_FILTERS: TodoFilter[] = [
  'all',
  'pending',
  'in_progress',
  'completed',
];

export const STATUS_LABELS: Record<TodoStatus, string> = {
  pending: '未完了',
  in_progress: '対応中',
  completed: '完了',
};

export const FILTER_LABELS: Record<TodoFilter, string> = {
  all: '全て',
  pending: '未完了',
  in_progress: '対応中',
  completed: '完了',
};
