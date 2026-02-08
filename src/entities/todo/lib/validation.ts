import type { TodoInput } from '../model/types';
import { VALIDATION, ERROR_MESSAGES } from '@/shared/constants/validation';

export function validateTodoInput(input: Partial<TodoInput>): string[] {
  const errors: string[] = [];

  if (!input.title || input.title.trim() === '') {
    errors.push(ERROR_MESSAGES.TITLE_REQUIRED);
  }

  if (input.title && input.title.length > VALIDATION.TITLE_MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.TITLE_TOO_LONG);
  }

  if (input.description && input.description.length > VALIDATION.DESCRIPTION_MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.DESCRIPTION_TOO_LONG);
  }

  return errors;
}
