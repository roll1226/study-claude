import type { Todo, TodoInput } from '../model/types';

export function generateTodoId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createTodo(input: TodoInput): Todo {
  const now = Date.now();
  return {
    id: generateTodoId(),
    title: input.title,
    description: input.description,
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };
}
