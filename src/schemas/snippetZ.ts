import z from 'zod';
import { UserFullZ } from './userFullZ';
import { CommentZ } from './commentZ';

export const SnippetZ = z.object({
  id: z.string(),
  language: z.string(),
  code: z.string(),
  user: UserFullZ,
  comments: z.array(CommentZ),
});
