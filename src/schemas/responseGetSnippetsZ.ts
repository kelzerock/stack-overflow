import { z } from 'zod';
import { PageLinksZ } from './pageLinksZ';
import { PaginationMetadataZ } from './paginationMetaDataZ';
import { SnippetZ } from './snippetZ';

export const ResponseGetSnippetsZ = z.object({
  data: z.array(SnippetZ),
  meta: PaginationMetadataZ,
  links: PageLinksZ,
});
