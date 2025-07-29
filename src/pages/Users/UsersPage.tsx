import { useEffect } from 'react';
import { rootRequest } from 'utils/request/rootRequest';

export const UsersPage = () => {
  useEffect(() => {
    const startFetch = async () => {
      const response = await rootRequest.getUsers();
      if (response.ok) {
        const data = await response.json();
        console.log({ users: data });
      }
    };
    startFetch();
  }, []);
  return <div>UsersPage</div>;
};
