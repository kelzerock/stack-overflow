import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import usersDataReducer from './usersDataSlice';
import snippetsDataReducer from './snippetsDataSlice';
import questionsDataReducer from './questionsDataSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    usersData: usersDataReducer,
    snippetsData: snippetsDataReducer,
    questionsData: questionsDataReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
