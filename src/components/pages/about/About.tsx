import MainTitle from 'components/mainTitle/MainTitle';
import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div data-testid="aboutPage">
      <div className="wrapper">
        <div className={styles.page__inner}>
          <MainTitle>About Us</MainTitle>
        </div>
      </div>
    </div>
  );
}

export default About;
