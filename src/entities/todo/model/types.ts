export type TodoStatus = 'pending' | 'in_progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: number;
  updatedAt: number;
}

export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

export type TodoUpdate = Partial<Omit<Todo, 'id' | 'createdAt'>>;

export type TodoFilter = 'all' | TodoStatus;

export interface TodosState {
  todos: Todo[];
  currentFilter: TodoFilter;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: TodoUpdate } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: TodoFilter }
  | { type: 'LOAD_TODOS'; payload: Todo[] };
