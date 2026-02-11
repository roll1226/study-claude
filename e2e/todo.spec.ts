import { test, expect } from '@playwright/test';

test.describe('Todo List機能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // LocalStorageをクリア
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('タイトルが表示されること', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /📝 Todo リスト/ })).toBeVisible();
    await expect(page.getByText('タスクを追加・編集・管理しましょう')).toBeVisible();
  });

  test('初期状態で空のメッセージが表示されること', async ({ page }) => {
    await expect(page.getByText('タスクがありません')).toBeVisible();
    await expect(page.getByText('上のフォームから新しいタスクを追加してください')).toBeVisible();
  });

  test('Todoを追加できること', async ({ page }) => {
    // タイトルを入力
    const titleInput = page.getByPlaceholder('タスクを入力...');
    await titleInput.fill('テストタスク1');

    // 追加ボタンをクリック
    await page.getByRole('button', { name: '追加' }).click();

    // Todoが表示されることを確認
    await expect(page.getByRole('heading', { name: 'テストタスク1' })).toBeVisible();
    // ステータスバッジが表示されることを確認（spanタグ内のテキスト）
    await expect(page.locator('span').filter({ hasText: '未完了' }).first()).toBeVisible();
  });

  test('説明付きのTodoを追加できること', async ({ page }) => {
    // タイトルと説明を入力
    await page.getByPlaceholder('タスクを入力...').fill('詳細タスク');
    await page.getByPlaceholder('説明（任意）').fill('これは説明文です');

    // 追加ボタンをクリック
    await page.getByRole('button', { name: '追加' }).click();

    // Todoと説明が表示されることを確認
    await expect(page.getByText('詳細タスク')).toBeVisible();
    await expect(page.getByText('これは説明文です')).toBeVisible();
  });

  test('Todoのステータスを変更できること', async ({ page }) => {
    // Todoを追加
    await page.getByPlaceholder('タスクを入力...').fill('ステータステスト');
    await page.getByRole('button', { name: '追加' }).click();

    // ステータスセレクトボックスを取得
    const statusSelect = page.locator('select').first();

    // ステータスを「対応中」に変更
    await statusSelect.selectOption('in_progress');
    await expect(page.locator('span').filter({ hasText: /^対応中$/ }).first()).toBeVisible();

    // ステータスを「完了」に変更
    await statusSelect.selectOption('completed');
    await expect(page.locator('span').filter({ hasText: /^完了$/ }).first()).toBeVisible();
  });

  test('Todoを編集できること', async ({ page }) => {
    // Todoを追加
    await page.getByPlaceholder('タスクを入力...').fill('編集前タスク');
    await page.getByRole('button', { name: '追加' }).click();

    // 編集ボタンをクリック
    await page.getByRole('button', { name: '編集' }).click();

    // タイトルを編集
    const editTitleInput = page.getByPlaceholder('タスクを入力...').last();
    await editTitleInput.clear();
    await editTitleInput.fill('編集後タスク');

    // 保存ボタンをクリック
    await page.getByRole('button', { name: '保存' }).click();

    // 編集後のタイトルが表示されることを確認
    await expect(page.getByText('編集後タスク')).toBeVisible();
    await expect(page.getByText('編集前タスク')).not.toBeVisible();
  });

  test('Todoを削除できること', async ({ page }) => {
    // Todoを追加
    await page.getByPlaceholder('タスクを入力...').fill('削除テスト');
    await page.getByRole('button', { name: '追加' }).click();

    // Todoが表示されることを確認
    await expect(page.getByRole('heading', { name: '削除テスト', exact: true })).toBeVisible();

    // 確認ダイアログを自動的に受け入れる
    page.on('dialog', dialog => dialog.accept());

    // 削除ボタンをクリック
    await page.getByRole('button', { name: '削除' }).click();

    // Todoが削除されることを確認（heading要素が非表示になることを確認）
    await expect(page.getByRole('heading', { name: '削除テスト', exact: true })).not.toBeVisible();
    await expect(page.getByText('タスクがありません')).toBeVisible();
  });

  test('複数のTodoを追加できること', async ({ page }) => {
    // 3つのTodoを追加
    for (let i = 1; i <= 3; i++) {
      await page.getByPlaceholder('タスクを入力...').fill(`タスク${i}`);
      await page.getByRole('button', { name: '追加' }).click();
    }

    // すべてのTodoが表示されることを確認
    await expect(page.getByText('タスク1')).toBeVisible();
    await expect(page.getByText('タスク2')).toBeVisible();
    await expect(page.getByText('タスク3')).toBeVisible();
  });
});
