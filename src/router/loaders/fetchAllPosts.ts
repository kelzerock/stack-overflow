import { ResponseGetSnippetsZ } from '@schemas';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const fetchAllPosts = async (): Promise<z.infer<typeof ResponseGetSnippetsZ>> => {
  return await rootRequest.getSnippets();
};
