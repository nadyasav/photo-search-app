import React from 'react';
import styles from './MainTitle.module.css';

function MainTitle(props: { children: React.ReactNode }) {
  return <h1 className={styles.main_title}>{props.children}</h1>;
}

export default MainTitle;
