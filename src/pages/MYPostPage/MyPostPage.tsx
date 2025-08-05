import { UrlPath } from '@enums';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Typography } from '@mui/material';
import { ResponseGetSnippetsZ } from '@schemas';
import { PaginationBlock } from 'components/PaginationBlock';
import { Snippet } from 'components/Snippet';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { setSnippetsData } from 'store/snippetsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const MyPostPage = () => {
  const navigate = useNavigate();
  const loadedPosts = useLoaderData<null | z.infer<typeof ResponseGetSnippetsZ>>();
  console.log({ loadedPosts });
  const snippetsData = useAppSelector((state) => state.snippetsData);
  const { data } = snippetsData;

  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  console.log({ isAuth });
  const pagination = useAppSelector((state) => state.snippetsData.links);
  const meta = useAppSelector((state) => state.snippetsData.meta);
  const dispatch = useAppDispatch();
  const errorHandler = useToastErrorHandler();

  const loadPage = async (url: string) => {
    setIsLoading(true);
    const queryString = url.split('?')[1];
    const query = new URLSearchParams(queryString);
    try {
      dispatch(setSnippetsData(await rootRequest.getSnippets(query)));
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) navigate(UrlPath.HOME);
    if (loadedPosts) {
      dispatch(setSnippetsData(loadedPosts));
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 items-center">
        <Typography
          component="h1"
          sx={{ fontSize: 32, textTransform: 'uppercase', fontWeight: 500 }}
        >
          Your own snippets
        </Typography>
        <PaginationBlock
          pagination={pagination}
          title="snippets"
          meta={meta}
          isLoading={isLoading}
          loadPage={loadPage}
        />
        <div className="flex flex-col gap-0.5 p-2 w-full">
          {data.length === 0 && <h2>Snippets absent</h2>}
          {data.length > 0 && data.map((snippet) => <Snippet key={snippet.id} snippet={snippet} />)}
        </div>
      </div>
    </div>
  );
};
