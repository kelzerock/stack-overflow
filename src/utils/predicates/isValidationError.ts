import { ValidationError } from 'models/types/APIErrorResponse';

export const isValidationError = (error: unknown): error is ValidationError => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'field' in error &&
    'failures' in error &&
    Array.isArray(error.failures)
  ) {
    return error.failures.every((e: unknown) => typeof e === 'string');
  }

  return false;
};
