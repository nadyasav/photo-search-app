import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import formSliceReducer from './formSlice';
import formCardsSliceReducer from './formCardsSlice';
import cardsSliceReducer from './cardsSlice';
import cardSingleReducer from './cardSingleSlice';
import store, { RootState } from 'store/store';
import { ERROR_TEXT, FLICKR_SORT } from 'constants/constants';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      form: {
        form: {
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          country: '',
          gender: '',
          agree: '',
          file: '',
        },
        fileName: ERROR_TEXT.fileNotSelected,
        isformChanged: false,
        formErrors: false,
      },
      formCards: {
        formCards: [],
      },
      cards: {
        cards: [],
        cardsPerPage: 21,
        pageNumber: 1,
        total: 0,
        cardsSortType: FLICKR_SORT.relevance,
        loading: false,
        errorSearch: '',
      },
      cardSingle: {
        cardPosition: null,
      },
    },
    store = configureStore({
      reducer: {
        form: formSliceReducer,
        formCards: formCardsSliceReducer,
        cards: cardsSliceReducer,
        cardSingle: cardSingleReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
