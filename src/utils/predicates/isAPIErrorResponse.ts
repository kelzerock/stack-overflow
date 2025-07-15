import { APIErrorResponse } from 'models/types/APIErrorResponse';

export const isAPIErrorResponse = (error: unknown): error is APIErrorResponse => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'endpoint' in error &&
    'message' in error
  ) {
    return true;
  }

  return false;
};
