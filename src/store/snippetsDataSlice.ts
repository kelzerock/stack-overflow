import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseGetSnippetsZ } from '@schemas';
import { ResponseGetSnippetZ } from 'schemas/responseGetSnippetZ';
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
    updateSnippetData: (state, action: PayloadAction<z.infer<typeof ResponseGetSnippetZ>>) => {
      return {
        ...state,
        data: state.data.map((snippet) => {
          if (snippet.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return snippet;
          }
        }),
      };
    },
    deleteSnippetsData: () => Object.assign({}, initialState),
  },
});

export const { setSnippetsData, deleteSnippetsData, updateSnippetData } = snippetsDataSlice.actions;

export default snippetsDataSlice.reducer;
