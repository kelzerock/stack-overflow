import { z } from 'zod';
import { UserRole } from './responseGetUsers';
import { StatisticDto } from './statisticDto';

export const UserStatisticDto = z.object({
  id: z.string(),
  username: z.string(),
  role: UserRole,
  statistic: StatisticDto,
});
