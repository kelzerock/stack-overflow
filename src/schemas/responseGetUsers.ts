import { z } from 'zod';
import { PageLinksZ } from './pageLinksZ';
import { UserFullZ } from './userFullZ';
import { PaginationMetadataZ } from './paginationMetaDataZ';

export const ResponseGetUsers = z.object({
  data: z.array(UserFullZ),
  meta: PaginationMetadataZ,
  links: PageLinksZ,
});
