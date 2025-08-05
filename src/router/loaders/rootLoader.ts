import { store } from 'store/store';
import { rootRequest } from 'utils/request/rootRequest';

let wasInitialized = false;

export const rootLoader = async () => {
  if (wasInitialized) {
    console.log('stop');
    return null;
  }
  console.log('next');
  wasInitialized = true;

  const state = store.getState();
  if (state.user.isAuth) return;
  try {
    const userFull = await rootRequest.authGet();
    return userFull;
  } catch {
    return null;
  }
};
