import { describe, it, expect } from 'vitest';
import { validateTodoInput } from '../validation';

describe('validateTodoInput', () => {
  describe('成功ケース', () => {
    it('正常な入力の場合、エラーがない', () => {
      const errors = validateTodoInput({
        title: '有効なタイトル',
        description: '有効な説明',
      });

      expect(errors).toEqual([]);
    });

    it('説明なしでも有効', () => {
      const errors = validateTodoInput({
        title: 'タイトルのみ',
      });

      expect(errors).toEqual([]);
    });
  });

  describe('失敗ケース', () => {
    it('タイトルが空の場合、エラーを返す', () => {
      const errors = validateTodoInput({
        title: '',
      });

      expect(errors).toContain('タイトルを入力してください');
    });

    it('タイトルが空白のみの場合、エラーを返す', () => {
      const errors = validateTodoInput({
        title: '   ',
      });

      expect(errors).toContain('タイトルを入力してください');
    });

    it('タイトルが100文字を超える場合、エラーを返す', () => {
      const longTitle = 'あ'.repeat(101);
      const errors = validateTodoInput({
        title: longTitle,
      });

      expect(errors).toContain('タイトルは100文字以内で入力してください');
    });

    it('説明が500文字を超える場合、エラーを返す', () => {
      const longDescription = 'あ'.repeat(501);
      const errors = validateTodoInput({
        title: '有効なタイトル',
        description: longDescription,
      });

      expect(errors).toContain('説明は500文字以内で入力してください');
    });

    it('複数のエラーがある場合、すべて返す', () => {
      const errors = validateTodoInput({
        title: '',
        description: 'あ'.repeat(501),
      });

      expect(errors.length).toBeGreaterThan(1);
      expect(errors).toContain('タイトルを入力してください');
      expect(errors).toContain('説明は500文字以内で入力してください');
    });
  });
});
