export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;

export const ERROR_MESSAGES = {
  TITLE_REQUIRED: 'タイトルを入力してください',
  TITLE_TOO_LONG: `タイトルは${VALIDATION.TITLE_MAX_LENGTH}文字以内で入力してください`,
  DESCRIPTION_TOO_LONG: `説明は${VALIDATION.DESCRIPTION_MAX_LENGTH}文字以内で入力してください`,
  ADD_FAILED: '追加に失敗しました',
  UPDATE_FAILED: '更新に失敗しました',
} as const;
