import { test, expect } from '@playwright/test';

test.describe('LocalStorage永続化', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('追加したTodoがLocalStorageに保存されること', async ({ page }) => {
    // Todoを追加
    await page.getByPlaceholder('タスクを入力...').fill('保存テスト');
    await page.getByRole('button', { name: '追加' }).click();

    // LocalStorageにデータが保存されていることを確認
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('todos');
    });

    expect(storedData).toBeTruthy();
    const parsed = JSON.parse(storedData!);
    // バージョン管理されたデータ形式: { version: number, data: Todo[] }
    const todos = parsed.data ?? parsed;
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('保存テスト');
  });

  test('ページリロード後もTodoが表示されること', async ({ page }) => {
    // Todoを複数追加
    await page.getByPlaceholder('タスクを入力...').fill('永続化テスト1');
    await page.getByRole('button', { name: '追加' }).click();

    await page.getByPlaceholder('タスクを入力...').fill('永続化テスト2');
    await page.getByRole('button', { name: '追加' }).click();

    // ページをリロード
    await page.reload();

    // リロード後もTodoが表示されることを確認
    await expect(page.getByText('永続化テスト1')).toBeVisible();
    await expect(page.getByText('永続化テスト2')).toBeVisible();
  });

  test('Todoを削除するとLocalStorageからも削除されること', async ({ page }) => {
    // Todoを追加
    await page.getByPlaceholder('タスクを入力...').fill('削除テスト');
    await page.getByRole('button', { name: '追加' }).click();

    // 確認ダイアログを自動的に受け入れる
    page.on('dialog', dialog => dialog.accept());

    // Todoを削除
    await page.getByRole('button', { name: '削除' }).click();

    // 削除完了を待機
    await page.waitForTimeout(100);

    // LocalStorageが空配列になっていることを確認
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('todos');
    });

    expect(storedData).toBeTruthy();
    const parsed = JSON.parse(storedData!);
    const todos = parsed.data ?? parsed;
    expect(todos).toHaveLength(0);
  });

  test('Todoのステータス変更がLocalStorageに反映されること', async ({ page }) => {
    // Todoを追加
    await page.getByPlaceholder('タスクを入力...').fill('ステータス永続化テスト');
    await page.getByRole('button', { name: '追加' }).click();

    // ステータスを変更
    await page.locator('select').first().selectOption('completed');

    // LocalStorageのステータスが更新されていることを確認
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('todos');
    });

    const parsed = JSON.parse(storedData!);
    const todos = parsed.data ?? parsed;
    expect(todos[0].status).toBe('completed');

    // ページをリロード
    await page.reload();

    // リロード後もステータスが保持されていることを確認
    await expect(page.locator('span').filter({ hasText: /^完了$/ }).first()).toBeVisible();
  });
});
