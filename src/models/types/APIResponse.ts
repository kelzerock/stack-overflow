import { UserFull } from './userFull';

export type APIResponse = {
  message: string;
};

export type APIResponseFullUser = APIResponse & {
  data: UserFull;
};
