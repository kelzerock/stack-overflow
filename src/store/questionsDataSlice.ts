import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseGetQuestionsZ } from '@schemas';
import z from 'zod';

type QuestionsState = {
  data: z.infer<typeof ResponseGetQuestionsZ>['data'];
  meta: z.infer<typeof ResponseGetQuestionsZ>['meta'] | null;
  links: z.infer<typeof ResponseGetQuestionsZ>['links'] | null;
};

const initialState: QuestionsState = { data: [], meta: null, links: null };

export const questionsDataSlice = createSlice({
  name: 'questionsData',
  initialState,
  reducers: {
    setQuestionsData: (state, action: PayloadAction<z.infer<typeof ResponseGetQuestionsZ>>) => {
      return { ...action.payload };
    },
    deleteQuestionsData: () => Object.assign({}, initialState),
  },
});

export const { setQuestionsData, deleteQuestionsData } = questionsDataSlice.actions;

export default questionsDataSlice.reducer;
