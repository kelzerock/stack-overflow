import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseGetSnippetsZ } from '@schemas';
import z from 'zod';

type SnippetsState = {
  data: z.infer<typeof ResponseGetSnippetsZ>['data'];
  meta: z.infer<typeof ResponseGetSnippetsZ>['meta'] | null;
  links: z.infer<typeof ResponseGetSnippetsZ>['links'] | null;
};

const initialState: SnippetsState = { data: [], meta: null, links: null };

export const snippetsDataSlice = createSlice({
  name: 'snippetsData',
  initialState,
  reducers: {
    setSnippetsData: (state, action: PayloadAction<z.infer<typeof ResponseGetSnippetsZ>>) => {
      return { ...action.payload };
    },
    deleteSnippetsData: () => Object.assign({}, initialState),
  },
});

export const { setSnippetsData, deleteSnippetsData } = snippetsDataSlice.actions;

export default snippetsDataSlice.reducer;
