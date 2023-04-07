import React, { memo } from 'react';
import styled from 'styled-components';
import { CustomSelectProps } from 'types/customTypes';
import Error from '../error/Error';

const Select = styled.select<{ select?: string }>`
  ${(props) =>
    props.select ||
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

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>((props, ref) => {
  const { error = '', handleChange = () => {}, options, styled = {}, ...selectProps } = props;

  return (
    <>
      <Select
        data-testid="customSelect"
        ref={ref}
        onChange={handleChange}
        className={error ? 'invalid' : ''}
        {...selectProps}
        {...styled}
      >
        {options.map((option, index) => (
          <option
            key={'option' + '-' + index}
            value={option.value}
            hidden={option.hidden ? true : false}
          >
            {option.text}
          </option>
        ))}
      </Select>
      {error && <Error styled={styled?.error}>{error}</Error>}
    </>
  );
});

export default memo(CustomSelect);
