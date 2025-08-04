import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { useToastContext } from 'context/ToastContext';
import { Mark } from 'models/enums/mark';
import { useState } from 'react';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { MarkZ } from 'schemas/markZ';
import { updateSnippetData } from 'store/snippetsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

type MarkType = z.infer<typeof MarkZ>;
export const ReactionsPanel = ({ marks, snippetId }: { marks: MarkType[]; snippetId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { pushToast } = useToastContext();
  const dispatch = useAppDispatch();
  const handleError = useToastErrorHandler();

  const [like, dislike] = marks.reduce(
    (acc, mark) => {
      if (mark.type === 'like') return [acc[0] + 1, acc[1]];
      if (mark.type === 'dislike') return [acc[0], acc[1] + 1];
      return acc;
    },
    [0, 0]
  );

  const handleCLick = async (reaction: Mark) => {
    try {
      setIsLoading(true);
      const response = await rootRequest.markSnippet(snippetId, { mark: reaction });
      if (response.ok) {
        const newSnippet = await rootRequest.getSnippet(snippetId);
        dispatch(updateSnippetData(newSnippet));
        pushToast({ type: 'success', message: 'Your reaction sended!' });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const userAuthID = useAppSelector((state) => state.user.user.id);
  const userReaction = marks.find((mark) => mark.user.id === userAuthID);
  const isLikedPost = userReaction?.type === 'like';
  const isDislikedPost = userReaction?.type === 'dislike';
  return (
    <div className="flex gap-3">
      <button
        disabled={isLoading}
        className={`flex gap-1 items-center border-2 rounded-md py-1 px-3 hover:cursor-pointer hover:bg-stone-400  ${isDislikedPost ? 'bg-yellow-400 hover:bg-yellow-600' : ''} ${isLoading ? 'btn-disabled' : ''}`}
        onClick={() => handleCLick(isDislikedPost ? Mark.NONE : Mark.DISLIKE)}
      >
        <AiOutlineDislike /> {dislike}
      </button>
      <button
        disabled={isLoading}
        className={`flex gap-1 items-center border-2 rounded-md py-1 px-3 hover:cursor-pointer hover:bg-stone-400 ${isLikedPost ? 'bg-yellow-400 hover:bg-yellow-600' : ''} ${isLoading ? 'btn-disabled' : ''}`}
        onClick={() => handleCLick(isLikedPost ? Mark.NONE : Mark.LIKE)}
      >
        <AiOutlineLike /> {like}
      </button>
    </div>
  );
};
