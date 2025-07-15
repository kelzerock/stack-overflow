import { useToastErrorHandler } from '@hooks';
import { Button } from '@mui/material';
import { requestAuth } from '@utils';

export const HomePage = () => {
  const handleError = useToastErrorHandler();
  const handleClick = async () => {
    try {
      const res = await requestAuth();
      console.log({ res });
      if (res.ok) {
        const data = await res.json();
        console.log({ data });
      }
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
