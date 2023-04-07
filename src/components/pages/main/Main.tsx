import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Cards from './cards/Cards';
import SearchField from './searchField/SearchField';
import styles from './Main.module.css';
import MainTitle from 'components/mainTitle/MainTitle';
import {
  ERROR_SEARCH_TEXT,
  FLICKR_SORT,
  FLICKR_SERVER_PHOTOS_URL,
  FLICKR_PHOTO_DEFAULT_FORMAT,
  CARDSBOX_MIN_HEIGHT,
} from 'constants/constants';
import { IFlickrPhoto, IDataCard } from 'types/customTypes';
import Preloader from 'components/preloader/Preloader';
import CustomSelect from 'components/customSelect/CustomSelect';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import {
  fetchCards,
  setCards,
  setCardsPerPage,
  setErrorSearch,
  setLoading,
  setPageNumber,
  setSortType,
  setTotal,
} from 'store/cardsSlice';
import Pagination from 'components/pagination/Pagination';

function getLocalStorage(): string {
  const searchFieldValue = localStorage.getItem('searchFieldValue');
  return searchFieldValue ? searchFieldValue : '';
}
function Main() {
  const dispatch = useAppDispatch();
  const { cards, errorSearch, loading, cardsSortType, total, cardsPerPage } = useAppSelector(
    (state) => state.cards
  );
  const initialSearchValue = useMemo(() => getLocalStorage(), []);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const cardsBoxRef = useRef<HTMLDivElement>(null);

  const fillDataCards = useCallback(
    (photos: Array<IFlickrPhoto>) => {
      const cards: Array<IDataCard> = [];
      photos.map((photoItem: IFlickrPhoto) => {
        const card: IDataCard = {
          id: Number(photoItem.id),
          imgUrl: {
            url_z: photoItem.url_z ? photoItem.url_z : createImgUrl(photoItem),
            url_l: photoItem.url_l ? photoItem.url_l : createImgUrl(photoItem),
          },
          title: photoItem.title ? photoItem.title : '',
          owner: photoItem.ownername ? photoItem.ownername : '',
          views: photoItem.views ? photoItem.views : 0,
          dateTaken: photoItem.datetaken ? photoItem.datetaken : '',
          description: photoItem.description._content ? photoItem.description._content : '',
        };
        cards.push(card);
      });
      dispatch(setCards(cards));
    },
    [dispatch]
  );

  const sendRequest = useCallback(
    async (value = searchValue) => {
      if (value !== '') {
        const result = await dispatch(fetchCards(value));
        if (result.meta.requestStatus === 'fulfilled') {
          if (result.payload?.length) {
            fillDataCards(result.payload as IFlickrPhoto[]);
          } else {
            dispatch(setErrorSearch(`${ERROR_SEARCH_TEXT} "${value}".`));
            dispatch(setLoading(false));
          }
        }
      } else {
        dispatch(setCards([]));
        dispatch(setErrorSearch(''));
      }
    },
    [fillDataCards, dispatch, searchValue]
  );

  const handleInputValue = useCallback(
    (value: string) => {
      setSearchValue(value.trim());
      dispatch(setPageNumber(1));
      dispatch(setTotal(0));
      sendRequest(value.trim());
    },
    [sendRequest, dispatch]
  );

  useEffect(() => {
    if (!cards.length && !errorSearch.length) {
      sendRequest();
    }
  }, []);

  const handlePageClick = useCallback(() => {
    sendRequest();
  }, [sendRequest]);

  const createImgUrl = (photoItem: IFlickrPhoto) => {
    return `${FLICKR_SERVER_PHOTOS_URL}/${photoItem.server}/${photoItem.id}_${photoItem.secret}.${
      photoItem.originalformat ? photoItem.originalformat : FLICKR_PHOTO_DEFAULT_FORMAT
    }`;
  };

  const handleCardsLoading = () => {
    dispatch(setLoading(false));
  };

  const getPreloaderMargin = () => {
    const cardsBox = cardsBoxRef.current;
    if (cardsBox) {
      if (cardsBox.offsetParent) {
        return cardsBox.offsetParent.clientHeight - cardsBox.offsetTop <= CARDSBOX_MIN_HEIGHT
          ? `${CARDSBOX_MIN_HEIGHT / 2}px`
          : `calc((100vh - ${cardsBox.offsetTop}px) / 2)`;
      }
    }
  };

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSortType(e.target.value));
      if (searchValue !== '') {
        sendRequest();
      }
    },
    [dispatch, sendRequest, searchValue]
  );

  const handlePageResult = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (searchValue !== '') {
        dispatch(setCardsPerPage(e.target.value));
        dispatch(setPageNumber(1));
        sendRequest();
      }
    },
    [dispatch, searchValue, sendRequest]
  );

  return (
    <div data-testid="mainPage" className={styles.main_page}>
      <div className="wrapper">
        <div className={styles.page__inner}>
          <MainTitle>Search Photos</MainTitle>
          <div className={styles.search_feald__box}>
            <SearchField searchValue={searchValue} sendInputValue={handleInputValue} />
          </div>
          <div className={styles.select__box}>
            <CustomSelect
              defaultValue={cardsSortType}
              handleChange={handleSortChange}
              options={[
                { value: FLICKR_SORT.relevance, text: 'Relevant' },
                { value: FLICKR_SORT.interestingnessAsc, text: `Interesting (asc)` },
                { value: FLICKR_SORT.interestingnessDesc, text: 'Interesting (desc)' },
                { value: FLICKR_SORT.datePostedAsc, text: 'Date uploaded (asc)' },
                { value: FLICKR_SORT.datePostedDesc, text: 'Date uploaded (desc)' },
                { value: FLICKR_SORT.dateTakenAsc, text: 'Date taken (asc)' },
                { value: FLICKR_SORT.dateTakenDesc, text: 'Date taken (desc)' },
              ]}
            />
          </div>
          {total > 0 && (
            <div className={styles.main__pagination_box}>
              <div className={styles.main__pagination_select}>
                <CustomSelect
                  defaultValue={cardsPerPage}
                  handleChange={handlePageResult}
                  options={[
                    { value: 21, text: '21' },
                    { value: 51, text: `51` },
                    { value: 100, text: '100' },
                  ]}
                />
              </div>
              <Pagination handlePageClick={handlePageClick} />
            </div>
          )}
          <div className={styles.cards__box} ref={cardsBoxRef}>
            {loading && (
              <div className={styles.preloader__box}>
                <Preloader
                  styled={{
                    preloaderDiv: {
                      margin: { top: getPreloaderMargin() },
                      position: 'sticky',
                    },
                  }}
                />
              </div>
            )}
            {cards.length > 0 && (
              <Cards dataCards={cards} handleCardsLoading={handleCardsLoading} />
            )}
            {errorSearch && <div className={styles.error}>{errorSearch}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
