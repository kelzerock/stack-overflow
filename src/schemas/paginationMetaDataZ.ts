import z from 'zod';

export const PaginationMetadataZ = z.object({
  itemsPerPage: z.number(),
  totalItems: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  sortBy: z.array(z.tuple([z.string(), z.enum(['ASC', 'DESC'])])).optional(),
  searchBy: z.array(z.string()).optional(),
  search: z.string().optional().optional(),
  select: z.array(z.string()).optional(),
  filter: z.unknown().optional(),
});
