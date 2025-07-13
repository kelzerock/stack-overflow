import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="p-3 font-semibold uppercase bg-blue-500 text-white">
      <Typography variant="h6">
        Created by:{' '}
        <a href="https://github.com/kelzerock" target="_blank">
          Aleksei Zhuchkov
        </a>
      </Typography>
    </Box>
  );
};
