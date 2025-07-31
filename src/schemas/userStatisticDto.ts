import { z } from 'zod';
import { StatisticDto } from './statisticDto';
import { UserRole } from '@schemas';

export const UserStatisticDto = z.object({
  id: z.string(),
  username: z.string(),
  role: UserRole,
  statistic: StatisticDto,
});
