import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import styles from './CardSingle.module.css';
import Preloader from 'components/preloader/Preloader';
import { IDataCard } from 'types/customTypes';
import { preloaderCircle } from 'constants/styledComponents.styled';
import BaseBtn from 'components/baseBtn/BaseBtn';
import { ROUTES } from 'constants/constants';
import { removeCardPosition, setCardPosition } from 'store/cardSingleSlice';

function CardSingle() {
  const { index } = useParams();
  const { cards } = useAppSelector((state) => state.cards);
  const [card] = useState<IDataCard | null>(cards[Number(index)] ? cards[Number(index)] : null);
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCardPosition(Number(index)));
    if (card === null) {
      navigate(ROUTES.main);
    }
    return () => {
      dispatch(removeCardPosition());
    };
  }, [card, dispatch, index, navigate]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      handleImgOnLoad();
    }
  }, []);

  const handleImgOnLoad = () => {
    setImgLoaded(true);
  };

  const getDateFormatted = (date: Date) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div data-testid="cardSinglePage">
      <div className={styles.back_btn}>
        <BaseBtn onClick={handleBackClick}>Back</BaseBtn>
      </div>
      <div className={styles.cardSingle__wrapper}>
        <div className={styles.img__box}>
          <img
            ref={imgRef}
            className={styles.img}
            onLoad={handleImgOnLoad}
            src={card?.imgUrl.url_l}
            alt=""
          />
          {!imgLoaded && (
            <Preloader
              styled={{
                circle1: preloaderCircle,
                circle2: preloaderCircle,
                circle3: preloaderCircle,
              }}
            />
          )}
        </div>
        <div className={styles.description}>
          <ul className={styles.description__list}>
            {card?.title && (
              <li className={styles.description__item}>
                <p className={styles.title}>Owner: </p>
                <p className={styles.owner}>{card?.owner}</p>
              </li>
            )}
            {card?.title && (
              <li className={styles.description__item}>
                <p className={styles.title}>Title: </p>
                <p className={styles.value}>{card?.title}</p>
              </li>
            )}
            {card?.description && (
              <li className={styles.description__item}>
                <p className={styles.title}>Description: </p>
                <p
                  className={styles.description__text}
                  dangerouslySetInnerHTML={{ __html: card?.description }}
                />
              </li>
            )}
          </ul>
          <ul className={`${styles.description__list} ${styles.description__right}`}>
            <li className={styles.description__item}>
              <p className={styles.title}>Views: </p>
              <p className={styles.value}>{card?.views}</p>
            </li>
            <li className={styles.description__item}>
              <p className={styles.title}>Date Taken: </p>
              <p className={styles.value}>{card && getDateFormatted(new Date(card.dateTaken))}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardSingle;
