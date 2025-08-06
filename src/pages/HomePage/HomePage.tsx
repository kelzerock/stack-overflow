import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Button, Typography } from '@mui/material';
import { ResponseGetSnippetsZ } from '@schemas';
import { PaginationBlock } from 'components/PaginationBlock';
import { Snippet } from 'components/Snippet';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { setSnippetsData } from 'store/snippetsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const HomePage = () => {
  const loadedPosts = useLoaderData<z.infer<typeof ResponseGetSnippetsZ>>();
  console.log({ allPosts: loadedPosts });
  const snippetsData = useAppSelector((state) => state.snippetsData);
  const { data } = snippetsData;

  const [isLoading, setIsLoading] = useState(false);
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
    if (loadedPosts) {
      dispatch(setSnippetsData(loadedPosts));
    }
  }, []);

  const handleClick = async () => {
    try {
      const res = await rootRequest.getAnswers();
      const res1 = await res.json();
      console.log({ res1 });
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      <Button variant="outlined" onClick={handleClick}>
        Click
      </Button>

      <div className="flex flex-col gap-2 items-center">
        <Typography
          component="h1"
          sx={{ fontSize: 32, textTransform: 'uppercase', fontWeight: 500 }}
        >
          Snippets from users
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
