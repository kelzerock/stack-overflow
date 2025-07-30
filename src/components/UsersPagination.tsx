import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { setUsersData } from 'store/usersDataSlice';
import { rootRequest } from 'utils/request/rootRequest';

export const UsersPagination = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pagination = useAppSelector((state) => state.usersData.links);
  const meta = useAppSelector((state) => state.usersData.meta);
  const dispatch = useAppDispatch();
  const errorHandler = useToastErrorHandler();

  const loadPage = async (url: string) => {
    setIsLoading(true);
    const queryString = url.split('?')[1];
    const query = new URLSearchParams(queryString);
    try {
      dispatch(setUsersData(await rootRequest.getUsers(query)));
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-5/6 bg-stone-100 rounded-md p-2 gap-1 flex-col flex items-center">
      <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
        <Button
          disabled={!pagination?.first}
          loading={isLoading}
          onClick={() => loadPage(pagination?.first || '')}
        >
          First
        </Button>
        <Button
          disabled={!pagination?.previous}
          loading={isLoading}
          onClick={() => loadPage(pagination?.previous || '')}
        >
          Prev
        </Button>
        <Button
          disabled={isLoading}
          color="info"
          sx={{
            pointerEvents: 'none',
          }}
        >
          Current: {meta?.currentPage}
        </Button>
        <Button
          disabled={!pagination?.next}
          loading={isLoading}
          onClick={() => loadPage(pagination?.next || '')}
        >
          Next
        </Button>
        <Button
          disabled={!pagination?.last}
          loading={isLoading}
          onClick={() => loadPage(pagination?.last || '')}
        >
          Last
        </Button>
      </ButtonGroup>
      <Typography component="span" sx={{ fontSize: '.6rem' }}>
        Total users: {meta?.totalItems}
      </Typography>
      <Typography component="span" sx={{ fontSize: '.6rem' }}>
        Total pages: {meta?.totalPages}
      </Typography>
    </div>
  );
};
