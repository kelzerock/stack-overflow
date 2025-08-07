import { ResponseGetSnippetsZ } from '@schemas';
import { store } from 'store/store';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const fetchMyPosts = async (): Promise<null | z.infer<typeof ResponseGetSnippetsZ>> => {
  const state = store.getState();
  const userId = state?.user?.user?.id;

  if (!userId) return null;

  const searchParams = new URLSearchParams();
  searchParams.set('userId', userId);
  return await rootRequest.getSnippets(searchParams);
};
