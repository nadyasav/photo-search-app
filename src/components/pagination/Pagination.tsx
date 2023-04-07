import React, { memo, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setPageNumber } from 'store/cardsSlice';

import styles from './Pagination.module.css';

function Pagination(props: { handlePageClick: () => void }) {
  const dispatch = useAppDispatch();
  const { pageNumber, total, cardsPerPage } = useAppSelector((state) => state.cards);
  const visiblePageNumbers = 5;
  const visiblePageNumbersLeft = 2;
  const firstPageNumber = 1;
  const maxCountUniquePhoto = 4000;
  const [pageNumbersArr, setPageNumbersArr] = useState<Array<number>>([]);
  const totalPages =
    total <= maxCountUniquePhoto
      ? Math.ceil(total / cardsPerPage)
      : Math.ceil(maxCountUniquePhoto / cardsPerPage);

  useEffect(() => {
    const arr = [];
    let count = 1;
    let start;
    if (pageNumber >= visiblePageNumbers) {
      if (totalPages - pageNumber < visiblePageNumbers - 1) {
        start = totalPages - (visiblePageNumbers - 1);
      } else {
        start = pageNumber - visiblePageNumbersLeft;
      }
    } else {
      start = firstPageNumber;
    }

    for (let i = start; i <= totalPages; i++) {
      if (count <= visiblePageNumbers) {
        arr.push(i);
      } else {
        break;
      }
      count++;
    }
    setPageNumbersArr(arr);
  }, [pageNumber, totalPages]);

  const handlePageClick = (e: React.MouseEvent<HTMLLIElement>) => {
    dispatch(setPageNumber(Number(e.currentTarget.innerText)));
    props.handlePageClick();
  };

  return (
    <ul className={styles.paginaation}>
      {firstPageNumber !== pageNumbersArr[0] && (
        <li className={`${styles.paginaation__item} ${styles.first}`} onClick={handlePageClick}>
          {firstPageNumber}
        </li>
      )}
      {pageNumbersArr.length > 0 &&
        pageNumbersArr.map((currentNumber, index) => (
          <li
            key={index}
            onClick={handlePageClick}
            className={`${styles.paginaation__item} ${
              pageNumber === currentNumber ? styles.active : ''
            }`}
          >
            {currentNumber}
          </li>
        ))}
      {totalPages !== pageNumbersArr[pageNumbersArr.length - 1] && (
        <li className={`${styles.paginaation__item} ${styles.last}`} onClick={handlePageClick}>
          {totalPages}
        </li>
      )}
    </ul>
  );
}

export default memo(Pagination);
