import { UpdateUser } from '@components';
import { ToastContext } from '@context';
import { UrlPath } from '@enums';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserStatisticDto } from 'schemas/userStatisticDto';
import { deleteUser } from 'store/userSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const AccountPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [statistics, setStatistics] = useState<z.infer<typeof UserStatisticDto> | null>(null);
  const { pushToast } = useContext(ToastContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleError = useToastErrorHandler();

  useEffect(() => {
    if (user.id) rootRequest.getUserStatistic(user.id).then((result) => setStatistics(result));
  }, [user.id]);

  let statEntries = null;
  if (statistics) {
    statEntries = Object.entries(statistics.statistic);
  }

  const handleClick = async () => {
    try {
      await rootRequest.deleteMe();
      dispatch(deleteUser());
      pushToast({ type: 'info', message: "You've logged out successfully. See you soon!" });
      navigate(UrlPath.HOME);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <Typography component="h1">Hello, {user.username}</Typography>
      <Box component="div" className=" flex flex-col gap-3 p-3 bg-stone-100 rounded-md">
        <Typography component="span">Name: {user.username}</Typography>
        <Typography component="span">Role: {user.role}</Typography>
        <Typography component="span">ID: {user.id}</Typography>
        <Button size="medium" variant="contained" color="warning" onClick={handleClick}>
          Delete account
        </Button>
      </Box>
      <Box className="grid grid-cols-2 gap-2 p-2 bg-stone-100 rounded-md">
        {statEntries &&
          statEntries.map(([key, value]) => (
            <Typography key={key} component="span" sx={{ textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1')}: {value}
            </Typography>
          ))}
      </Box>
      <UpdateUser />
    </div>
  );
};
