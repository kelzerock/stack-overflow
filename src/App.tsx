import { Header } from '@components';
import { useAppSelector } from '@hooks';
import { Box, Container, Modal } from '@mui/material';
import { UserFullZ } from '@schemas';
import { Footer } from 'components/Footer';
import { Loader } from 'components/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLoaderData } from 'react-router';
import { AppDispatch } from 'store/store';
import { deleteUser, setUser } from 'store/userSlice';
import z from 'zod';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const userFull = useLoaderData<null | z.infer<typeof UserFullZ>>();
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  useEffect(() => {
    if (userFull) {
      dispatch(setUser(userFull));
    } else {
      dispatch(deleteUser());
    }
  }, []);

  return (
    <Container
      component="div"
      maxWidth="xl"
      sx={{
        minHeight: '100vh',
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
      <Box sx={{ flexGrow: '1', paddingInline: 2 }} component="main" className=" relative">
        {isLoading && (
          <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Loader />
          </Modal>
        )}
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
}

export default App;
