import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getItem, setItem, removeItem, clear } from '../localStorage';

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('setItem', () => {
    it('データを正常に保存できる', () => {
      const data = { name: 'テスト', value: 123 };
      setItem('test-key', data);

      const stored = localStorage.getItem('test-key');
      const parsed = JSON.parse(stored!);

      // バージョン管理されたデータ形式で保存されることを確認
      expect(parsed).toEqual({
        version: 1,
        data: data,
      });
    });

    it('配列を保存できる', () => {
      const data = [1, 2, 3, 4, 5];
      setItem('array-key', data);

      const stored = getItem<number[]>('array-key');
      expect(stored).toEqual(data);
    });
  });

  describe('getItem', () => {
    it('保存されたデータを取得できる', () => {
      const data = { test: 'value' };
      localStorage.setItem('test-key', JSON.stringify(data));

      const result = getItem<typeof data>('test-key');
      expect(result).toEqual(data);
    });

    it('存在しないキーの場合、nullを返す', () => {
      const result = getItem('non-existent');
      expect(result).toBeNull();
    });

    it('不正なJSONの場合、nullを返してエラーをログに出す', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('invalid', 'invalid json');

      const result = getItem('invalid');
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('removeItem', () => {
    it('指定したキーのアイテムを削除できる', () => {
      setItem('test-key', { value: 'test' });
      expect(getItem('test-key')).toBeTruthy();

      removeItem('test-key');
      expect(getItem('test-key')).toBeNull();
    });
  });

  describe('clear', () => {
    it('すべてのアイテムをクリアできる', () => {
      setItem('key1', 'value1');
      setItem('key2', 'value2');

      expect(localStorage.length).toBeGreaterThan(0);

      clear();
      expect(localStorage.length).toBe(0);
    });
  });
});
