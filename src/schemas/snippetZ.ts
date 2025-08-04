import z from 'zod';
import { UserFullZ } from './userFullZ';
import { CommentZ } from './commentZ';
import { MarkZ } from './markZ';

export const SnippetZ = z.object({
  id: z.string(),
  language: z.string(),
  code: z.string(),
  user: UserFullZ,
  comments: z.array(CommentZ),
  marks: z.array(MarkZ),
});
