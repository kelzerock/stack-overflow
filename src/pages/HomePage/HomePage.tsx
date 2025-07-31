import { useToastErrorHandler } from '@hooks';
import { Button } from '@mui/material';
import { rootRequest } from 'utils/request/rootRequest';

export const HomePage = () => {
  const handleError = useToastErrorHandler();
  const handleClick = async () => {
    try {
      const res = await rootRequest.getSnippets();
      console.log({ res });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <h2>HomePage</h2>
      <Button variant="outlined" onClick={handleClick}>
        Click
      </Button>
    </div>
  );
};
