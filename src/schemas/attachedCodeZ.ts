import z from 'zod';

export const AttachedCodeZ = z.object({
  id: z.string(),
  content: z.string(),
  isCorrect: z.boolean(),
});
