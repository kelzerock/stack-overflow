import z from 'zod';

export const UserRole = z.enum(['user', 'admin']);
export const UserFullZ = z.object({
  id: z.string(),
  username: z.string(),
  role: UserRole,
});
