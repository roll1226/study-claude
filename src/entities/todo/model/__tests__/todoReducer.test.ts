import { describe, it, expect } from 'vitest';
import { todoReducer } from '../todoReducer';
import type { TodosState, Todo } from '../types';

const mockTodo: Todo = {
  id: 'test-1',
  title: 'テストタスク',
  description: 'テスト説明',
  status: 'pending',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const initialState: TodosState = {
  todos: [],
  currentFilter: 'all',
};

describe('todoReducer', () => {
  describe('ADD_TODO', () => {
    it('新しいTodoを追加できる', () => {
      const newState = todoReducer(initialState, {
        type: 'ADD_TODO',
        payload: mockTodo,
      });

      expect(newState.todos).toHaveLength(1);
      expect(newState.todos[0]).toEqual(mockTodo);
    });

    it('既存のTodoに追加できる', () => {
      const stateWithTodo: TodosState = {
        ...initialState,
        todos: [mockTodo],
      };

      const newTodo: Todo = {
        ...mockTodo,
        id: 'test-2',
        title: '2つ目のタスク',
      };

      const newState = todoReducer(stateWithTodo, {
        type: 'ADD_TODO',
        payload: newTodo,
      });

      expect(newState.todos).toHaveLength(2);
      expect(newState.todos[1]).toEqual(newTodo);
    });
  });

  describe('UPDATE_TODO', () => {
    it('Todoを更新できる', () => {
      const stateWithTodo: TodosState = {
        ...initialState,
        todos: [mockTodo],
      };

      const newState = todoReducer(stateWithTodo, {
        type: 'UPDATE_TODO',
        payload: {
          id: 'test-1',
          updates: { title: '更新されたタイトル' },
        },
      });

      expect(newState.todos[0].title).toBe('更新されたタイトル');
      expect(newState.todos[0].updatedAt).toBeGreaterThan(mockTodo.updatedAt);
    });

    it('存在しないIDの場合、何も変更しない', () => {
      const stateWithTodo: TodosState = {
        ...initialState,
        todos: [mockTodo],
      };

      const newState = todoReducer(stateWithTodo, {
        type: 'UPDATE_TODO',
        payload: {
          id: 'non-existent',
          updates: { title: '更新' },
        },
      });

      expect(newState.todos).toEqual(stateWithTodo.todos);
    });
  });

  describe('DELETE_TODO', () => {
    it('Todoを削除できる', () => {
      const stateWithTodo: TodosState = {
        ...initialState,
        todos: [mockTodo],
      };

      const newState = todoReducer(stateWithTodo, {
        type: 'DELETE_TODO',
        payload: 'test-1',
      });

      expect(newState.todos).toHaveLength(0);
    });

    it('存在しないIDの場合、何も変更しない', () => {
      const stateWithTodo: TodosState = {
        ...initialState,
        todos: [mockTodo],
      };

      const newState = todoReducer(stateWithTodo, {
        type: 'DELETE_TODO',
        payload: 'non-existent',
      });

      expect(newState.todos).toHaveLength(1);
      expect(newState.todos[0]).toEqual(mockTodo);
    });
  });

  describe('SET_FILTER', () => {
    it('フィルターを設定できる', () => {
      const newState = todoReducer(initialState, {
        type: 'SET_FILTER',
        payload: 'completed',
      });

      expect(newState.currentFilter).toBe('completed');
    });
  });

  describe('LOAD_TODOS', () => {
    it('Todoリストをロードできる', () => {
      const todos: Todo[] = [mockTodo, { ...mockTodo, id: 'test-2' }];

      const newState = todoReducer(initialState, {
        type: 'LOAD_TODOS',
        payload: todos,
      });

      expect(newState.todos).toEqual(todos);
    });
  });
});
