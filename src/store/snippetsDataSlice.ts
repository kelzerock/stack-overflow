import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseGetSnippetsZ } from '@schemas';
import { ResponseGetSnippetZ } from 'schemas/responseGetSnippetZ';
import z from 'zod';

type SnippetsState = {
  data: z.infer<typeof ResponseGetSnippetsZ>['data'];
  meta: z.infer<typeof ResponseGetSnippetsZ>['meta'] | null;
  links: z.infer<typeof ResponseGetSnippetsZ>['links'] | null;
  singleSnippet: z.infer<typeof ResponseGetSnippetZ>['data'] | null;
};

const initialState: SnippetsState = { data: [], meta: null, links: null, singleSnippet: null };

export const snippetsDataSlice = createSlice({
  name: 'snippetsData',
  initialState,
  reducers: {
    setSnippetsData: (state, action: PayloadAction<z.infer<typeof ResponseGetSnippetsZ>>) => {
      return { ...state, ...action.payload };
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
    updateSingleSnippet: (state, action: PayloadAction<z.infer<typeof ResponseGetSnippetZ>>) => {
      return { ...state, singleSnippet: action.payload.data };
    },
    deleteSnippetsData: () => Object.assign({}, initialState),
  },
});

export const { setSnippetsData, deleteSnippetsData, updateSnippetData, updateSingleSnippet } =
  snippetsDataSlice.actions;

export default snippetsDataSlice.reducer;
