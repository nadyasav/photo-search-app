import React from 'react';
import { Link } from 'react-router-dom';

import { ICardProps } from '../../../../../types/customTypes';
import styles from './Card.module.css';
import { ROUTES } from 'constants/constants';

function Card(props: ICardProps) {
  return (
    <Link
      to={`${ROUTES.cards}/${props.index}/${props.data.id}`}
      className={styles.card}
      data-testid={'card-' + props.index}
    >
      <div className={styles.card_img__box}>
        <img
          data-testid={`card-${props.index}Img`}
          className={styles.card_img}
          onLoad={props.handleCardLoading}
          src={props.data.imgUrl.url_z}
          alt=""
        />
      </div>
      <div className={styles.card_description}>
        <h3 className={styles.card_title}>{props.data.title}</h3>
        <p className={styles.card_owner}>{props.data.owner}</p>
      </div>
    </Link>
  );
}

export default React.memo(Card);
