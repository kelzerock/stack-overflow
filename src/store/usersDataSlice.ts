import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseGetUsers } from '@schemas';
import z from 'zod';

type UsersState = {
  data: z.infer<typeof ResponseGetUsers>['data'];
  meta: z.infer<typeof ResponseGetUsers>['meta'] | null;
  links: z.infer<typeof ResponseGetUsers>['links'] | null;
};

const initialState: UsersState = { data: [], meta: null, links: null };

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<z.infer<typeof ResponseGetUsers>>) => {
      return { ...action.payload };
    },
    deleteUsersData: () => Object.assign({}, initialState),
  },
});

export const { setUsersData, deleteUsersData } = usersDataSlice.actions;

export default usersDataSlice.reducer;
