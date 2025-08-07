import { ResponseGetQuestionsZ } from '@schemas';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const fetchAllQuestions = async (): Promise<z.infer<typeof ResponseGetQuestionsZ>> => {
  return await rootRequest.getQuestions();
};
