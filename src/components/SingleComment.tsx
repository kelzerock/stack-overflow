import { useAppDispatch, useAppSelector } from '@hooks';
import { FaUserTie } from 'react-icons/fa';
import { CommentForOneSnippetZ } from 'schemas/commentForOneSnippetZ';
import z from 'zod';
import { CiSquareRemove } from 'react-icons/ci';
import { rootRequest } from 'utils/request/rootRequest';
import { updateSingleSnippet } from 'store/snippetsDataSlice';
import { EditComment } from './EditComment';

export const SingleComment = ({ comment }: { comment: z.infer<typeof CommentForOneSnippetZ> }) => {
  const authUserId = useAppSelector((state) => state.user.user.id);
  const snippetId = useAppSelector((state) => state.snippetsData.singleSnippet?.id);
  const dispatch = useAppDispatch();
  const {
    id,
    user: { username, id: userId },
    content,
  } = comment;
  const isAuthUserPost = authUserId === userId;

  const handleDeleteComment = () => {
    rootRequest.deleteComment(id).then((res) => {
      if (res.ok && snippetId) {
        rootRequest.getSnippet(snippetId).then((res) => dispatch(updateSingleSnippet(res)));
      }
    });
  };
  return (
    <div className={`flex bg-stone-100 border-4 border-stone-300 `}>
      <span className="flex gap-2 bg-stone-300 items-center basis-1/3 sm:basis-1/5 md:basis-1/8 shrink-0 p-2 justify-start">
        <FaUserTie /> {username}
      </span>
      <span
        className={`grow flex items-start justify-start p-2 ${isAuthUserPost ? 'bg-blue-200/75' : ''}`}
      >
        {content}
      </span>
      {isAuthUserPost && (
        <div className="flex bg-stone-300">
          <EditComment commentInfo={comment} />
          <button
            className="p-2 
          bg-stone-300 hover:cursor-pointer hover:bg-stone-400 text-red-600 hover:text-red-800 transition-colors duration-300 self-start"
            onClick={handleDeleteComment}
          >
            <CiSquareRemove size={30} className=" hover:scale-110" />
          </button>
        </div>
      )}
    </div>
  );
};
