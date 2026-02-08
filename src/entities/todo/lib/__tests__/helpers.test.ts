import { describe, it, expect } from 'vitest';
import { generateTodoId, createTodo } from '../helpers';
import type { TodoInput } from '../../model/types';

describe('generateTodoId', () => {
  it('一意のIDを生成する', () => {
    const id1 = generateTodoId();
    const id2 = generateTodoId();

    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('IDは文字列である', () => {
    const id = generateTodoId();
    expect(typeof id).toBe('string');
  });
});

describe('createTodo', () => {
  it('正常にTodoを作成できる', () => {
    const input: TodoInput = {
      title: 'テストタスク',
      description: 'テスト説明',
      status: 'pending',
    };

    const todo = createTodo(input);

    expect(todo.id).toBeTruthy();
    expect(todo.title).toBe('テストタスク');
    expect(todo.description).toBe('テスト説明');
    expect(todo.status).toBe('pending');
    expect(todo.createdAt).toBeTypeOf('number');
    expect(todo.updatedAt).toBeTypeOf('number');
    expect(todo.createdAt).toBe(todo.updatedAt);
  });

  it('説明なしでTodoを作成できる', () => {
    const input: TodoInput = {
      title: 'タイトルのみ',
      status: 'in_progress',
    };

    const todo = createTodo(input);

    expect(todo.title).toBe('タイトルのみ');
    expect(todo.description).toBeUndefined();
    expect(todo.status).toBe('in_progress');
  });
});
