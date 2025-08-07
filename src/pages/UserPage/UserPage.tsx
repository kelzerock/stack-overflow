import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { UserStatisticDto } from 'schemas/userStatisticDto';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const UserPage = () => {
  const { profileID } = useParams<{ profileID: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<z.infer<typeof UserStatisticDto> | null>(null);

  const statEntries = user ? Object.entries(user.statistic) : null;

  useEffect(() => {
    if (profileID)
      rootRequest
        .getUserStatistic(profileID || '')
        .then(setUser)
        .catch((err) => console.log(err));
  }, [profileID]);

  if (user) {
    return (
      <div className="p-2 flex flex-col gap-2">
        <Typography component="h1">Information about user: {user.username}</Typography>
        <Box component="div" className=" flex flex-col gap-3 p-3 bg-stone-100 rounded-md">
          <Typography component="span">Name: {user.username}</Typography>
          <Typography component="span">Role: {user.role}</Typography>
          <Typography component="span">ID: {user.id}</Typography>
        </Box>
        <Box className="grid grid-cols-2 gap-2 p-2 bg-stone-100 rounded-md">
          {statEntries &&
            statEntries.map(([key, value]) => (
              <Typography key={key} component="span" sx={{ textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1')}: {value}
              </Typography>
            ))}
        </Box>
        <Button variant="outlined" onClick={() => void navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sorry, this user absent!</h1>
        <Button variant="outlined" onClick={() => void navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }
};
