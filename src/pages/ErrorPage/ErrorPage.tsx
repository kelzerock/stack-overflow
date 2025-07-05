import { UrlPath } from '@enums';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from 'react-router';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  let status = '404';
  let message = 'Page Not Found';

  if (isRouteErrorResponse(error)) {
    status = error.status.toString();
    message = String(error.data);
  } else if (error instanceof Error) {
    status = 'Error';
    message = `Something went wrong: ${error.message}`;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: '2',
      }}
    >
      <Typography variant="h3" textAlign="center">
        {status}
      </Typography>
      <Typography variant="h3" textAlign="center">
        {message}
      </Typography>
      <div className="flex items-center justify-center gap-x-4">
        <Button variant="outlined" onClick={() => void navigate(-1)}>
          Go Back
        </Button>
        <Button variant="contained" component={Link} to={UrlPath.HOME}>
          Take Me Home
        </Button>
      </div>
    </Container>
  );
};
