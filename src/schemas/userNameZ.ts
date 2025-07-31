import z from 'zod';

export const UserNameZ = z.object({ userName: z.string() });
