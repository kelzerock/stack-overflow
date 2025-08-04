import { useAppSelector } from '@hooks';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { MarkZ } from 'schemas/markZ';
import z from 'zod';

export const ReactionsPanel = ({ marks }: { marks: z.infer<typeof MarkZ>[] }) => {
  const [like, dislike] = marks.reduce(
    (acc, mark) => {
      if (mark.type === 'like') return [acc[0] + 1, acc[1]];
      if (mark.type === 'dislike') return [acc[0], acc[1] + 1];
      return acc;
    },
    [0, 0]
  );

  const userAuthID = useAppSelector((state) => state.user.user.id);
  const userReaction = marks.find((mark) => mark.user.id === userAuthID);
  const isLikedPost = userReaction?.type === 'like';
  const isDislikedPost = userReaction?.type === 'dislike';
  return (
    <div className="flex gap-3">
      <span
        className={`flex gap-1 items-center border-2 rounded-md py-1 px-3 hover:cursor-pointer hover:bg-stone-400  ${isDislikedPost ? 'bg-yellow-400' : ''}`}
      >
        <AiOutlineDislike /> {dislike}
      </span>
      <span
        className={`flex gap-1 items-center border-2 rounded-md py-1 px-3 over:cursor-pointer hover:bg-stone-400 ${isLikedPost ? 'bg-yellow-400' : ''}`}
      >
        <AiOutlineLike /> {like}
      </span>
    </div>
  );
};
