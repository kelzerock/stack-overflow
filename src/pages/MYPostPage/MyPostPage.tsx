import { UrlPath } from '@enums';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Typography } from '@mui/material';
import { ResponseGetSnippetsZ } from '@schemas';
import { getURLSearchParams } from '@utils';
import { AddSnippet } from 'components/AddSnippet';
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
  const snippetsData = useAppSelector((state) => state.snippetsData);
  const { data } = snippetsData;

  const [isLoading, setIsLoading] = useState(false);
  const userAuth = useAppSelector((state) => state.user);
  const pagination = useAppSelector((state) => state.snippetsData.links);
  const meta = useAppSelector((state) => state.snippetsData.meta);
  const dispatch = useAppDispatch();
  const errorHandler = useToastErrorHandler();
  console.log({ pagination });

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

  const updateData = async () => {
    if (pagination?.current) {
      const searchParams = new URLSearchParams();
      searchParams.set('userId', userAuth.user.id);
      const query = getURLSearchParams(pagination.current);
      const mergedString = searchParams.toString() + '&' + query.toString();
      const mergedParams = new URLSearchParams(mergedString);
      rootRequest
        .getSnippets(mergedParams)
        .then((res) => dispatch(setSnippetsData(res)))
        .catch(errorHandler);
    }
  };

  useEffect(() => {
    if (!userAuth.isAuth) navigate(UrlPath.HOME);
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
          <AddSnippet updatePost={updateData} />
          {data.length === 0 && <h2>Snippets absent</h2>}
          {data.length > 0 &&
            data.map((snippet) => (
              <Snippet key={snippet.id} snippet={snippet} updatePost={updateData} />
            ))}
        </div>
      </div>
    </div>
  );
};
