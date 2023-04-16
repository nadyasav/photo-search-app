import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ERROR_FETCH_TEXT,
  FLICKR_API_KEY,
  FLICKR_SEARCH_PARAMS,
  FLICKR_SEARCH_URL,
  FLICKR_SORT,
} from 'constants/constants';
import { IDataCard, IFlickrPhoto } from 'types/customTypes';

interface ICards {
  cards: Array<IDataCard>;
  cardsPerPage: number;
  pageNumber: number;
  total: number;
  cardsSortType: string;
  loading: boolean;
  errorSearch: string;
}

const initialState: ICards = {
  cards: [],
  cardsPerPage: 21,
  pageNumber: 1,
  total: 0,
  cardsSortType: FLICKR_SORT.relevance,
  loading: false,
  errorSearch: '',
};

export const fetchCards = createAsyncThunk<
  Array<IFlickrPhoto>,
  string,
  { rejectValue: string; state: { cards: ICards } }
>('cards/fetchCards', async function (searchValue, { rejectWithValue, dispatch, getState }) {
  dispatch(setCards([]));
  dispatch(setErrorSearch(''));
  const url = `${FLICKR_SEARCH_URL}&${FLICKR_API_KEY}&text=${encodeURIComponent(
    searchValue
  )}&per_page=${getState().cards.cardsPerPage}&page=${getState().cards.pageNumber}&sort=${
    getState().cards.cardsSortType
  }&${FLICKR_SEARCH_PARAMS}`;
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then((response) => {
      dispatch(setTotal(response.photos.total));
      return response.photos.photo;
    })
    .catch((error) => {
      if (error instanceof Response) {
        return rejectWithValue(
          `Something went wrong! Error status code: ${error.status}, error status text: ${error.statusText}`
        );
      } else {
        return rejectWithValue(`${ERROR_FETCH_TEXT} ${error.message}`);
      }
    });
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setErrorSearch: (state, action) => {
      state.errorSearch = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSortType: (state, action) => {
      state.cardsSortType = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setCardsPerPage: (state, action) => {
      state.cardsPerPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorSearch = action.payload;
      }
    });
  },
});

export const {
  setCards,
  setErrorSearch,
  setLoading,
  setSortType,
  setTotal,
  setPageNumber,
  setCardsPerPage,
} = cardsSlice.actions;
export default cardsSlice.reducer;
