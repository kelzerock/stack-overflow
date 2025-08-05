import { CommentForOneSnippetZ } from 'schemas/commentForOneSnippetZ';
import z from 'zod';
import { SingleComment } from './SingleComment';

export const CommentList = ({
  comments,
  updatePost,
}: {
  comments: z.infer<typeof CommentForOneSnippetZ>[];
  updatePost: () => Promise<void>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((item) => {
        return <SingleComment comment={item} key={item.id} updatePost={updatePost} />;
      })}
    </div>
  );
};
