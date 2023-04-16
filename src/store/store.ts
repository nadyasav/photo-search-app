import { configureStore } from '@reduxjs/toolkit';
import formSliceReducer from './formSlice';
import formCardsSliceReducer from './formCardsSlice';
import cardsSliceReducer from './cardsSlice';
import cardSingleReducer from './cardSingleSlice';

const store = configureStore({
  reducer: {
    form: formSliceReducer,
    formCards: formCardsSliceReducer,
    cards: cardsSliceReducer,
    cardSingle: cardSingleReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
