import { AddComment, CommentList, Snippet } from '@components';
import { UrlPath } from '@enums';
import { useAppSelector } from '@hooks';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateSingleSnippet } from 'store/snippetsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';

export const PostPage = () => {
  const { postID } = useParams<{ postID: string }>();
  const dispatch = useDispatch();
  const snippet = useAppSelector((state) => state.snippetsData.singleSnippet);
  const [openComment, setOpenComment] = useState(false);
  const handleOpenComment = () => setOpenComment(true);
  const handleCloseComment = () => setOpenComment(false);
  const navigate = useNavigate();

  useEffect(() => {
    rootRequest.getSnippet(postID || '').then((result) => dispatch(updateSingleSnippet(result)));
  }, []);

  if (snippet) {
    const {
      comments,
      user: { username },
      id,
    } = snippet;
    return (
      <div className="flex flex-col gap-2 ">
        <h1 className=" font-bold text-2xl">Snippet from user: {username}</h1>
        <button
          className="p-2 rounded-md bg-stone-300 hover:cursor-pointer hover:bg-stone-400 self-start"
          onClick={() => navigate(UrlPath.HOME)}
        >
          View All Snippets
        </button>
        <Snippet snippet={snippet} isSinglePost={true} />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="self-start"
          onClick={handleOpenComment}
        >
          Add comment
        </Button>
        {openComment && (
          <AddComment snippetId={id} handleClose={handleCloseComment} open={openComment} />
        )}
        <CommentList comments={comments} />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className=" text-2xl">Sorry, this post absent!</h1>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }
};
