import { Response } from '@types';

export const isResponse = (data: unknown): data is Response => {
  return typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
    ? true
    : false;
};
