import z from 'zod';
import { UserFullZ } from './userFullZ';

export const CommentForOneSnippetZ = z.object({
  id: z.string(),
  content: z.string(),
  user: UserFullZ,
});
