import React, { memo } from 'react';
import { CustomCheckboxProps } from 'types/customTypes';
import Error from '../error/Error';
import styles from './CustomCheckbox.module.css';

const CustomCheckbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>((props, ref) => {
  const { error = '', handleChange, styled, onBlur, ...inputProps } = props;

  return (
    <>
      <label className={styles.label}>
        <input ref={ref} onChange={handleChange} onBlur={onBlur} {...inputProps} type="checkbox" />
        <div className={styles.checkbox}></div>
      </label>
      <Error styled={styled?.error}>{error}</Error>
    </>
  );
});

export default memo(CustomCheckbox);
