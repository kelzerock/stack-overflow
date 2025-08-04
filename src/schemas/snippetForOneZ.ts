import z from 'zod';
import { UserFullZ } from './userFullZ';
import { MarkZ } from './markZ';
import { CommentForOneSnippetZ } from './commentForOneSnippetZ';

export const SnippetForOneZ = z.object({
  id: z.string(),
  language: z.string(),
  code: z.string(),
  user: UserFullZ,
  comments: z.array(CommentForOneSnippetZ),
  marks: z.array(MarkZ),
});
