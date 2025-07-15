import { requestBase } from './requestBase';
import { Methods } from '@enums';
import { API } from 'models/enums/api';

export const requestAuth = async (): Promise<Response> => {
  return await requestBase(API.auth, Methods.GET);
};
