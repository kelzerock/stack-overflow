import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StateUser, UserFull } from '@types';

const emptyUser: UserFull = { id: '', username: '', role: '' };
const initialState: StateUser = { isAuth: false, user: emptyUser };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserFull>) => {
      return { isAuth: true, user: action.payload };
    },
    deleteUser: () => ({ isAuth: false, user: Object.assign({}, emptyUser) }),
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
