import React from 'react';
import { IDataCard } from '../../../../types/customTypes';
import Card from './card/Card';
import styles from './Cards.module.css';

function Cards(props: { dataCards: IDataCard[]; handleCardsLoading: () => void }) {
  let numberCards = props.dataCards.length;

  const handleCardLoading = () => {
    numberCards--;
    if (numberCards <= 0) {
      props.handleCardsLoading();
    }
  };

  return (
    <div className={styles.cards}>
      <h2 className={styles.cards__title}>Free stock photos</h2>
      {props.dataCards && (
        <div className={styles.cards__list}>
          {props.dataCards.map(
            (cardItem, index) =>
              cardItem.imgUrl && (
                <Card
                  key={cardItem.id}
                  data={cardItem}
                  index={index}
                  handleCardLoading={handleCardLoading}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(Cards);
