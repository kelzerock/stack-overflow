import z from 'zod';
import { UserFullZ } from './userFullZ';

export const MarkZ = z.object({
  id: z.string(),
  type: z.enum(['like', 'dislike', 'none']),
  user: UserFullZ,
});
