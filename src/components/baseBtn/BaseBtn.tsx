import React, { RefObject } from 'react';
import styles from './BaseBtn.module.css';

interface IBaseBtnProps {
  btnRef?: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  [x: string]: string | React.ReactNode;
}

function BaseBtn(props: IBaseBtnProps) {
  const { btnRef, children, ...btnProps } = props;
  return (
    <button className={styles.base_btn} ref={btnRef ? btnRef : null} {...btnProps}>
      {children}
    </button>
  );
}

export default BaseBtn;
