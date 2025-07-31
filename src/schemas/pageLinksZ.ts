import z from 'zod';

export const PageLinksZ = z.object({
  first: z.string().optional(),
  previous: z.string().optional(),
  current: z.string().optional(),
  next: z.string().optional(),
  last: z.string().optional(),
});
