import React from 'react';
import { IPreloaderDivStyled, IPreloaderProps } from '../../types/customTypes';
import styles from './Preloader.module.css';
import styled from 'styled-components';

const PreloaderDiv = styled.div<IPreloaderDivStyled>`
  margin-top: ${(props) => props?.margin?.top || '0'};
  margin-right: ${(props) => props?.margin?.right || '0'};
  margin-bottom: ${(props) => props?.margin?.bottom || '0'};
  margin-left: ${(props) => props?.margin?.left || '0'};
  position: ${(props) => props?.position || 'absolute'};
`;

const Circle1 = styled.div<{ circle1: string }>`
  ${(props) => props?.circle1 || ''}
`;

const Circle2 = styled.div<{ circle2: string }>`
  ${(props) => props?.circle2 || ''}
`;

const Circle3 = styled.div<{ circle3: string }>`
  ${(props) => props?.circle3 || ''}
`;

function Preloader(props?: IPreloaderProps) {
  return (
    <div data-testid="preloader" className={styles.preloader__box}>
      <PreloaderDiv className={styles.preloader} {...props?.styled?.preloaderDiv}>
        <Circle1 data-testid="circle1" className={styles.circle1} {...props?.styled}>
          <Circle2 data-testid="circle2" className={styles.circle2} {...props?.styled}></Circle2>
          <Circle3 data-testid="circle3" className={styles.circle3} {...props?.styled}></Circle3>
        </Circle1>
      </PreloaderDiv>
    </div>
  );
}

export default React.memo(Preloader);
