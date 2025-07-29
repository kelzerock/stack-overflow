import { z } from 'zod';

export const StatisticDto = z.object({
  snippetsCount: z.number(),
  rating: z.number(),
  commentsCount: z.number(),
  likesCount: z.number(),
  dislikesCount: z.number(),
  questionsCount: z.number(),
  correctAnswersCount: z.number(),
  regularAnswersCount: z.number(),
});
