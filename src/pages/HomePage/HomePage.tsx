import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Button, Typography } from '@mui/material';
import { PaginationBlock } from 'components/PaginationBlock';
import { useEffect, useState } from 'react';
import { setSnippetsData } from 'store/snippetsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const HomePage = () => {
  const handleError = useToastErrorHandler();
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
    if (!snippetsData.meta?.currentPage)
      rootRequest
        .getSnippets()
        .then((result) => dispatch(setSnippetsData(result)))
        .catch((error) => {
          if (error instanceof z.ZodError) {
            console.log('Cannot parse data:', error.message);
          } else {
            throw Error('unexpected error, while get users');
          }
        });
  }, []);

  const handleClick = async () => {
    try {
      const res = await rootRequest.getSnippets();
      // const res1 = await res.json();
      console.log({ res });
    } catch (error) {
      handleError(error);
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
          {data.length > 0 &&
            data.map((snippet) => (
              <div key={snippet.id} className="p-2 bg-stone-100 flex justify-start gap3">
                <span>lang: {snippet.language}</span>
                <span>code: {snippet.code}</span>
                <span>user: {snippet.user.username}</span>
                <span>comments:</span>
                <div className=" flex flex-col gap-1 border-2 border-red-950 bg-stone-100 rounded-md">
                  {snippet.comments.map((comment) => (
                    <span>{comment.content}</span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
