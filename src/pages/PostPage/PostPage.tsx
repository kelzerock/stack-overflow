import { AddComment, CommentList, Snippet } from '@components';
import { useAppSelector } from '@hooks';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router';
import { ResponseGetSnippetZ } from 'schemas/responseGetSnippetZ';
import { updateSingleSnippet } from 'store/snippetsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const PostPage = () => {
  const loadedSnippet = useLoaderData<z.infer<typeof ResponseGetSnippetZ> | null>();
  const dispatch = useDispatch();
  const snippet = useAppSelector((state) => state.snippetsData.singleSnippet);
  const [openComment, setOpenComment] = useState(false);
  const handleOpenComment = () => setOpenComment(true);
  const handleCloseComment = () => setOpenComment(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadedSnippet) {
      dispatch(updateSingleSnippet(loadedSnippet));
    } else {
      dispatch(updateSingleSnippet(null));
    }
  }, []);

  const updatePost = async () => {
    if (snippet) {
      const res = await rootRequest.getSnippet(snippet.id);
      dispatch(updateSingleSnippet(res));
    }
  };

  if (!snippet)
    return (
      <div>
        <h1 className=" text-2xl">Sorry, this post absent!</h1>
        <Button onClick={() => navigate(-1)} size="small" variant="contained" color="primary">
          Go back
        </Button>
      </div>
    );

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
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <Snippet snippet={snippet} isSinglePost={true} updatePost={updatePost} />
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
        <AddComment
          snippetId={id}
          handleClose={handleCloseComment}
          open={openComment}
          updatePost={updatePost}
        />
      )}
      <CommentList comments={comments} updatePost={updatePost} />
    </div>
  );
};
