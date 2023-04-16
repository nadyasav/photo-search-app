import { render } from '@testing-library/react';
import React from 'react';
import Error from './Error';

const props = {
  error: 'error',
  styled: 'color: #ffffff;',
};

describe('Testing Error ', () => {
  it('Renders Error', () => {
    const error = render(<Error>{''}</Error>);
    expect(error).toMatchSnapshot();
  });
  it('Renders Error with props', () => {
    const error = render(<Error styled={props.styled}>{props.error}</Error>);
    expect(error).toMatchSnapshot();
  });
});
