import { Header } from '@components';
import { Box, Container } from '@mui/material';
import { isFullUserData } from '@utils';
import { Footer } from 'components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { AppDispatch } from 'store/store';
import { deleteUser, setUser } from 'store/userSlice';
import { rootRequest } from 'utils/request/rootRequest';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function initialApp() {
      const response = await rootRequest.authGet();
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        console.log({ test: isFullUserData(data) });
        if (isFullUserData(data)) {
          dispatch(setUser(data.data));
        } else {
          dispatch(deleteUser());
        }
      }
    }
    initialApp();
  }, []);

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          gap: 3,
        }}
        disableGutters
      >
        <Header />
        <Box sx={{ flexGrow: '1', paddingInline: 2 }}>
          <Outlet />
        </Box>
        <Footer />
      </Container>
    </>
  );
}

export default App;
