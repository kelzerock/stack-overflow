import z from 'zod';

export const CommentZ = z.object({
  id: z.string(),
  content: z.string(),
});
