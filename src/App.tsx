import { Header } from '@components';
import { Box, Container } from '@mui/material';
import { Footer } from 'components/Footer';
import { Outlet } from 'react-router';

function App() {
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
