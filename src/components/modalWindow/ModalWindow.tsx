import React from 'react';
import styles from './ModalWindow.module.css';
import styled from 'styled-components';

type ModalWindowAnimType = 'animScale';
interface IModalWindowProps {
  active: boolean;
  activeAnimation?: ModalWindowAnimType;
  setWindowState: (value: boolean) => void;
  children: React.ReactNode;
  styled?: React.ElementType | keyof JSX.IntrinsicElements;
}

function ModalWindow(props: IModalWindowProps) {
  const Window = props.styled || styled.div``;

  function handleWindowClick(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
  }

  function closeWindow() {
    props.setWindowState(false);
  }

  return (
    <div
      data-testid="modalWindow"
      className={`${styles.window__overlay} ${props.active ? styles.active : ''} ${
        props.activeAnimation ? styles[props.activeAnimation] : ''
      }`}
      onClick={closeWindow}
    >
      <div className={styles.window__outer}>
        <div className={styles.window__box}>
          <Window
            data-testid="modalWindowChild"
            className={`${styles.window}`}
            onClick={handleWindowClick}
          >
            {props.children}
            <button
              data-testid="modalWindowCloseBtn"
              type="button"
              className={styles.close_btn}
              onClick={closeWindow}
            ></button>
          </Window>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
