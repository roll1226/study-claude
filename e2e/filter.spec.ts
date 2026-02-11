import { test, expect } from '@playwright/test';

test.describe('フィルター機能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // テスト用のTodoを追加
    await page.getByPlaceholder('タスクを入力...').fill('未完了タスク');
    await page.getByRole('button', { name: '追加' }).click();

    await page.getByPlaceholder('タスクを入力...').fill('対応中タスク');
    await page.getByRole('button', { name: '追加' }).click();
    await page.locator('select').last().selectOption('in_progress');

    await page.getByPlaceholder('タスクを入力...').fill('完了タスク');
    await page.getByRole('button', { name: '追加' }).click();
    await page.locator('select').last().selectOption('completed');
  });

  test('全てのフィルターが表示されること', async ({ page }) => {
    await expect(page.getByRole('button', { name: /全て/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /未完了.*\d/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /対応中.*\d/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^完了.*\d/ })).toBeVisible();
  });

  test('デフォルトで全てのTodoが表示されること', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '未完了タスク', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '対応中タスク', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '完了タスク', exact: true })).toBeVisible();
  });

  test('未完了フィルターで未完了のTodoのみ表示されること', async ({ page }) => {
    // 未完了フィルターボタンをクリック
    await page.getByRole('button', { name: /未完了.*\d/ }).click();

    // 未完了タスクのみ表示されることを確認
    await expect(page.getByRole('heading', { name: '未完了タスク', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '対応中タスク', exact: true })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: '完了タスク', exact: true })).not.toBeVisible();
  });

  test('対応中フィルターで対応中のTodoのみ表示されること', async ({ page }) => {
    // 対応中フィルターボタンをクリック
    await page.getByRole('button', { name: /対応中.*\d/ }).click();

    // 対応中タスクのみ表示されることを確認
    await expect(page.getByRole('heading', { name: '未完了タスク', exact: true })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: '対応中タスク', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '完了タスク', exact: true })).not.toBeVisible();
  });

  test('完了フィルターで完了したTodoのみ表示されること', async ({ page }) => {
    // 完了フィルターボタンをクリック
    await page.getByRole('button', { name: /^完了.*\d/ }).click();

    // 完了タスクのみ表示されることを確認
    await expect(page.getByRole('heading', { name: '未完了タスク', exact: true })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: '対応中タスク', exact: true })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: '完了タスク', exact: true })).toBeVisible();
  });

  test('フィルターボタンにTodo数が表示されること', async ({ page }) => {
    // 各フィルターのカウントを確認（正規表現で柔軟に）
    await expect(page.getByRole('button', { name: /全て.*3/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /未完了.*\(1\)/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /対応中.*\(1\)/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /^完了.*\(1\)/ })).toBeVisible();
  });
});
