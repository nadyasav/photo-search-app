import { render } from '@testing-library/react';
import React from 'react';
import Preloader from './Preloader';

const styled = {
  preloaderDiv: {
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    position: 'sticky',
  },
  circle1: 'border-color: #ffffff;',
  circle2: 'border-color: #ffffff;',
  circle3: 'border-color: #ffffff;',
};

describe('Testing Preloader ', () => {
  it('Renders Preloader', () => {
    const preloader = render(<Preloader />);
    expect(preloader).toMatchSnapshot();
  });
  it('Renders Preloader with props', () => {
    const preloader = render(<Preloader styled={styled} />);
    expect(preloader).toMatchSnapshot();
  });
});
