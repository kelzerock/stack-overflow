import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = { isLoading: false };

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      return { isLoading: action.payload };
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
