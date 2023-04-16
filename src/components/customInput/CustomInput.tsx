import React, { memo } from 'react';
import styled from 'styled-components';
import { CustomInputProps } from 'types/customTypes';
import Error from '../error/Error';

const Input = styled.input<{ input?: string }>`
  ${(props) =>
    props.input ||
    `margin: 0;
    height: 35px;
    display: block;
    width: 100%;
    padding: 0 10px;
    border-radius: 7px;
    background: var(--light-gray);
    border: 1px solid transparent;
    font-size: 16px;
    transition: border-color 0.1s ease-in-out;`}

  &.invalid {
    border-color: var(--form-errors);
  }
`;

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { error = '', handleChange, styled, onBlur, ...inputProps } = props;

  return (
    <>
      <Input
        ref={ref}
        onChange={handleChange}
        onBlur={onBlur}
        className={error ? 'invalid' : ''}
        {...inputProps}
        {...styled}
      />
      <Error styled={styled?.error}>{error}</Error>
    </>
  );
});

export default memo(CustomInput);
