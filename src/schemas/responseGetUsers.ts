import { z } from 'zod';

export const UserRole = z.enum(['user', 'admin']);

export const ResponseUserFull = z.object({
  id: z.number(),
  username: z.string(),
  role: UserRole,
});

export const PaginationMetadata = z.object({
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

export const PageLinks = z.object({
  first: z.string().optional(),
  previous: z.string().optional(),
  current: z.string().optional(),
  next: z.string().optional(),
  last: z.string().optional(),
});

export const ResponseGetUsers = z.object({
  data: z.array(ResponseUserFull),
  meta: PaginationMetadata,
  links: PageLinks,
});
