import { ResponseGetUsers } from '@schemas';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const fetchAllUsers = async (): Promise<z.infer<typeof ResponseGetUsers>> => {
  return await rootRequest.getUsers();
};
