import { z } from 'zod';
import { PageLinksZ } from './pageLinksZ';
import { PaginationMetadataZ } from './paginationMetaDataZ';
import { QuestionZ } from './questionZ';

export const ResponseGetQuestionsZ = z.object({
  data: z.array(QuestionZ),
  meta: PaginationMetadataZ,
  links: PageLinksZ,
});
