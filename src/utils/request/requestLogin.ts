import { User } from '@types';
import { requestBase } from './requestBase';
import { Methods } from '@enums';
import { API } from 'models/enums/api';

export const requestLogin = async (user: User): Promise<Response> => {
  return await requestBase(API.login, Methods.POST, user);
};
