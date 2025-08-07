import { APIResponseFullUser } from '@types';
import { isResponse } from './isResponse';
import { isFullUserData } from '@utils';

export const isResponseUserFull = (data: unknown): data is APIResponseFullUser => {
  return isResponse(data) && isFullUserData(data) ? true : false;
};
