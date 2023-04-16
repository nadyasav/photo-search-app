import { createSlice } from '@reduxjs/toolkit';
import { IFormData } from 'types/customTypes';

interface IFormCards {
  formCards: Array<IFormData>;
}

const initialState: IFormCards = {
  formCards: [],
};

const formCardsSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    sendFormData: (state, action) => {
      state.formCards.push(action.payload);
    },
  },
});

export const { sendFormData } = formCardsSlice.actions;
export default formCardsSlice.reducer;
