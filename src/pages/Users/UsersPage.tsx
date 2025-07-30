import { useAppDispatch, useAppSelector } from '@hooks';
import { Typography } from '@mui/material';
import { UserItem } from 'components/UserItem';
import { UsersPagination } from 'components/UsersPagination';
import { useEffect } from 'react';
import { setUsersData } from 'store/usersDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((state) => state.usersData);
  const { data } = usersData;

  useEffect(() => {
    if (!usersData.meta?.currentPage)
      rootRequest
        .getUsers()
        .then((result) => dispatch(setUsersData(result)))
        .catch((error) => {
          if (error instanceof z.ZodError) {
            console.log('Cannot parse data:', error.message);
          } else {
            throw Error('unexpected error, while get users');
          }
        });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <Typography component="h1" sx={{ fontSize: 32, textTransform: 'uppercase', fontWeight: 500 }}>
        Information about users
      </Typography>
      <UsersPagination />
      <div className="flex flex-col gap-0.5 p-2 w-full">
        {data.length === 0 && <h2>Users absent</h2>}
        {data.length > 0 && data.map((user) => <UserItem user={user} key={user.id} />)}
      </div>
    </div>
  );
};
