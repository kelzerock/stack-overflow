import z from 'zod';
import { UserFullZ } from './userFullZ';

export const QuestionZ = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  attachedCode: z.string().optional(),
  user: UserFullZ,
  answers: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      isCorrect: z.boolean(),
    })
  ),
  isResolved: z.boolean(),
});
