import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <h1>Header</h1>
      <Outlet />
      <h2>footer</h2>
    </>
  );
}

export default App;
