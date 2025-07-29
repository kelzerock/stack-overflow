import { UserFull } from '@types';

export const isFullUserData = (
  data: unknown
): data is {
  data: UserFull;
} => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    typeof data.data === 'object' &&
    data.data !== null &&
    'id' in data.data &&
    'username' in data.data &&
    'role' in data.data &&
    typeof data.data.id === 'string' &&
    typeof data.data.username === 'string' &&
    typeof data.data.role === 'string'
  );
};
