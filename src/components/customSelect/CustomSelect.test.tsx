import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CustomSelect from './CustomSelect';

const options = [
  { value: 'relevant', text: 'Relevant' },
  { value: 'interesting', text: `Interesting` },
];

const handleChange = jest.fn();

const props = {
  selectRef: React.createRef<HTMLSelectElement>(),
  error: 'error',
  handleChange: handleChange,
  options: options,
  styled: { select: 'color: #ffffff;', error: 'color: #ffffff;' },
};

describe('Testing CustomSelect ', () => {
  it('Renders CustomSelect', () => {
    const customSelect = render(<CustomSelect options={options} />);
    expect(customSelect).toMatchSnapshot();
  });
  it('Renders CustomSelect with props', () => {
    const customSelect = render(<CustomSelect {...props} name="customSelect" />);
    expect(customSelect).toMatchSnapshot();
  });
  it('Call onChange event handler', () => {
    render(<CustomSelect {...props} name="customSelect" />);
    const customSelect = screen.queryByTestId('customSelect') as HTMLSelectElement;
    expect(customSelect).toBeInTheDocument();
    fireEvent.change(customSelect, { target: { value: 'relevant' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
