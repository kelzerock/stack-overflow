import { Snippet } from '@components';
import { useAppSelector } from '@hooks';
import { useNavigate, useParams } from 'react-router';

export const PostPage = () => {
  const { postID } = useParams<{ postID: string }>();
  const navigate = useNavigate();
  const snippets = useAppSelector((state) => state.snippetsData.data);
  const snippet = snippets.find((item) => item.id === postID);

  if (snippet) {
    return (
      <div>
        <h1 className=" font-bold text-2xl">Snippet from user: {snippet.user.username}</h1>
        <Snippet snippet={snippet} isSinglePost={true} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sorry, this post absent!</h1>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }
};
