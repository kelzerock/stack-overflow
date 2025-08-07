import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Typography } from '@mui/material';
import { UserItem } from 'components/UserItem';
import { PaginationBlock } from 'components/PaginationBlock';
import { useEffect, useState } from 'react';
import { setUsersData } from 'store/usersDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';
import { useLoaderData } from 'react-router';
import { ResponseGetUsers } from '@schemas';

export const UsersPage = () => {
  const loadedUsers = useLoaderData<z.infer<typeof ResponseGetUsers>>();
  console.log({ loadedUsers });
  const usersData = useAppSelector((state) => state.usersData);
  const { data } = usersData;

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

  useEffect(() => {
    if (loadedUsers) dispatch(setUsersData(loadedUsers));
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <Typography component="h1" sx={{ fontSize: 32, textTransform: 'uppercase', fontWeight: 500 }}>
        Information about users
      </Typography>
      <PaginationBlock
        pagination={pagination}
        title="users"
        meta={meta}
        isLoading={isLoading}
        loadPage={loadPage}
      />
      <div className="flex justify-center gap-2 p-2 w-full flex-wrap">
        {data.length === 0 && <h2>Users absent</h2>}
        {data.length > 0 && data.map((user) => <UserItem user={user} key={user.id} />)}
      </div>
    </div>
  );
};
