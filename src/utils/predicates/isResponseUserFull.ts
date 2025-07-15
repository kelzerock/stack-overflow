import { APIResponseFullUser } from '@types';
import { isResponse } from './isResponse';

export const isResponseUserFull = (data: unknown): data is APIResponseFullUser => {
  return isResponse(data) &&
    'data' in data &&
    typeof data.data === 'object' &&
    data.data !== null &&
    'id' in data.data &&
    'username' in data.data &&
    'role' in data.data &&
    typeof data.data.id === 'string' &&
    typeof data.data.username === 'string' &&
    typeof data.data.role === 'string'
    ? true
    : false;
};
