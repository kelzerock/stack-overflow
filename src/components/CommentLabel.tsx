import { UrlPath } from '@enums';
import { SnippetZ } from '@schemas';
import { MdOutlineInsertComment } from 'react-icons/md';
import { MdOutlineModeComment } from 'react-icons/md';
import { useNavigate } from 'react-router';
import z from 'zod';

export const CommentLabel = ({ snippet }: { snippet: z.infer<typeof SnippetZ> }) => {
  const navigate = useNavigate();
  const { comments, id } = snippet;
  const commentsCount = comments.length;

  const handleClick = () => {
    navigate(`${UrlPath.POST}/${id}`);
  };
  return (
    <button
      className="flex px-4 items-center gap-2 hover:cursor-pointer hover:bg-stone-300 rounded-sm"
      onClick={handleClick}
    >
      {commentsCount === 0 ? (
        <>
          <MdOutlineModeComment /> 0
        </>
      ) : (
        <>
          <MdOutlineInsertComment /> {commentsCount}
        </>
      )}
    </button>
  );
};
