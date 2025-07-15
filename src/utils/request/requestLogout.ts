import { requestBase } from './requestBase';
import { Methods } from '@enums';
import { API } from 'models/enums/api';

export const requestLogout = async (): Promise<Response> => {
  return await requestBase(API.logout, Methods.POST);
};
