import { ResponseGetSnippetZ } from 'schemas/responseGetSnippetZ';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';
import type { Params } from 'react-router';

export const fetchSinglePost = async (
  params: Params<string>
): Promise<z.infer<typeof ResponseGetSnippetZ> | null> => {
  const { postID } = params;
  if (!postID) return null;

  try {
    const result = await rootRequest.getSnippet(postID);
    return result;
  } catch {
    return null;
  }
};
