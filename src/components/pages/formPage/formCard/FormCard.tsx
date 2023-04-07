import React from 'react';
import { IFormData } from '../../../../types/customTypes';
import styles from './FormCard.module.css';

function FormCard(props: { data: IFormData; index: number }) {
  return (
    <div className={styles.card} data-testid={'formCard' + props.index}>
      <ul>
        <li className={styles.card__item}>
          <span className={styles.card__title}>Profile picture:</span>
          <div className={styles.card_img__box}>
            <img src={props.data.file} className={styles.card_img} />
          </div>
        </li>
        <li className={styles.card__item}>
          <span className={styles.card__title}>First Name:</span>
          <span>{props.data.firstName}</span>
        </li>
        <li className={styles.card__item}>
          <span className={styles.card__title}>Last Name:</span>
          <span>{props.data.lastName}</span>
        </li>
        <li className={styles.card__item}>
          <span className={styles.card__title}>Date Of Birth:</span>
          <span>{props.data.dateOfBirth}</span>
        </li>
        <li className={styles.card__item}>
          <span className={styles.card__title}>Country:</span>
          <span>{props.data.country}</span>
        </li>
        <li className={styles.card__item}>
          <span className={styles.card__title}>Gender:</span>
          <span>{props.data.gender}</span>
        </li>
        <li className={styles.card__item}>
          <span className={styles.card__title}>Processing personal data:</span>
          <span>{props.data.agree ? 'Yes' : 'No'}</span>
        </li>
      </ul>
    </div>
  );
}

export default FormCard;
