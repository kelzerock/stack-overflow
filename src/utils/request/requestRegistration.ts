import { User } from '@types';
import { requestBase } from './requestBase';
import { Methods } from '@enums';

export const requestRegistration = async (user: User): Promise<Response> => {
  const response = await requestBase('api/register', Methods.POST, user);
  return response;
};
