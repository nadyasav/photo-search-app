import React, { useState } from 'react';
import styles from './FormPage.module.css';
import { IFormData } from '../../../types/customTypes';
import Form from './form/Form';
import FormCard from './formCard/FormCard';
import ModalWindow from '../../modalWindow/ModalWindow';
import MainTitle from 'components/mainTitle/MainTitle';
import { formSubmitedWindow } from 'constants/styledComponents.styled';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { sendFormData } from 'store/formCardsSlice';

function FormPage() {
  const dispatch = useAppDispatch();
  const { formCards } = useAppSelector((state) => state.formCards);
  const [windowActive, setWindowActive] = useState(false);

  const getData = (data: IFormData) => {
    setWindowActive(true);
    dispatch(sendFormData(data));
  };

  const setWindowState = (value: boolean) => {
    setWindowActive(value);
  };

  return (
    <div data-testid="formPage" className={styles.form_page}>
      <div className="wrapper">
        <div className={styles.page__inner}>
          <MainTitle>Form</MainTitle>
          <div className={styles.page__content}>
            <div className={styles.form__box}>
              <Form sendData={getData} />
            </div>
            {formCards.length > 0 && (
              <div className={styles.cards__box}>
                {formCards.map((cardItem, index) => (
                  <FormCard key={'formCard' + index} data={cardItem} index={index} />
                ))}
              </div>
            )}
          </div>
          <ModalWindow
            active={windowActive}
            setWindowState={setWindowState}
            styled={formSubmitedWindow}
          >
            <div className={styles.window__content}>
              <p className={styles.window__title}>Thank You</p>
              <p className={styles.window__text}>Form has been successfully submitted.</p>
            </div>
          </ModalWindow>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
