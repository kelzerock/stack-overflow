import { store } from 'store/store';
import { rootRequest } from 'utils/request/rootRequest';

let wasInitialized = false;

export const rootLoader = async () => {
  if (wasInitialized) {
    return null;
  }
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
