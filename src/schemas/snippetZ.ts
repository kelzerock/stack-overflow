import z from 'zod';
import { UserFullZ } from './userFullZ';

export const SnippetZ = z.object({
  id: z.string(),
  language: z.string(),
  code: z.string(),
  user: UserFullZ,
});
