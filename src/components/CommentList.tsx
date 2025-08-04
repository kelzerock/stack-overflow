import { CommentForOneSnippetZ } from 'schemas/commentForOneSnippetZ';
import z from 'zod';
import { SingleComment } from './SingleComment';

export const CommentList = ({
  comments,
}: {
  comments: z.infer<typeof CommentForOneSnippetZ>[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((item) => {
        return <SingleComment comment={item} key={item.id} />;
      })}
    </div>
  );
};
