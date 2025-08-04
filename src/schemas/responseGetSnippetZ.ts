import { z } from 'zod';
import { SnippetForOneZ } from './snippetForOneZ';

export const ResponseGetSnippetZ = z.object({
  data: SnippetForOneZ,
});
