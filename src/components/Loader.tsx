import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress className="w-2/5" />
    </Box>
  );
};
