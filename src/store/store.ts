import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import usersDataReducer from './usersDataSlice';
import snippetsDataReducer from './snippetsDataSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    usersData: usersDataReducer,
    snippetsData: snippetsDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
