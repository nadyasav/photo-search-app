import { createSlice } from '@reduxjs/toolkit';

interface ICardSingle {
  cardPosition: number | null;
}

const initialState: ICardSingle = {
  cardPosition: null,
};

const cardSingleSlice = createSlice({
  name: 'cardSingle',
  initialState,
  reducers: {
    setCardPosition: (state, action) => {
      state.cardPosition = action.payload;
    },
    removeCardPosition: (state) => {
      state.cardPosition = null;
    },
  },
});

export const { setCardPosition, removeCardPosition } = cardSingleSlice.actions;
export default cardSingleSlice.reducer;
