import React, { memo } from 'react';
import { CustomRadioBtnProps } from 'types/customTypes';
import Error from '../error/Error';
import styles from './CustomRadioBtn.module.css';

const CustomRadioBtn = React.forwardRef<HTMLInputElement, CustomRadioBtnProps>((props, ref) => {
  const { error = '', buttons, name, handleChange, styled, onBlur, ...inputProps } = props;

  return (
    <>
      <div className={styles.switcher}>
        {buttons.map((button, index) => (
          <label className={styles.label} key={`${name}-${index}`}>
            <input
              ref={ref}
              value={button.value}
              defaultChecked={button.defaultChecked ? true : false}
              data-testid={`${name}-${index}`}
              onChange={handleChange}
              onBlur={onBlur}
              {...inputProps}
              type="radio"
              name={name}
            />
            <p>{button.value}</p>
          </label>
        ))}
      </div>
      <Error styled={styled?.error}>{error}</Error>
    </>
  );
});

export default memo(CustomRadioBtn);
