import { fireEvent, render, screen } from '@testing-library/react';
import App from 'App';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from 'store/store';
import SearchField from './SearchField';

const searchValue = 'qwerty';
const handleInputValue = jest.fn();

describe('Testing SearchField', () => {
  it('renders searchField', () => {
    render(<SearchField searchValue={searchValue} sendInputValue={handleInputValue} />);
    const searchInput = screen.queryByTestId('searchInput');
    expect(searchInput).toBeInTheDocument();
  });
  it('testing input value', () => {
    render(<SearchField searchValue={searchValue} sendInputValue={handleInputValue} />);
    const searchInput = screen.queryByTestId('searchInput');
    expect(screen.getByDisplayValue(searchValue)).toBeInTheDocument();
    fireEvent.input(searchInput as HTMLElement, { target: { value: '123qwe' } });
    expect(screen.getByDisplayValue('123qwe')).toBeInTheDocument();
  });

  describe('Mock localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });

    it('localStorage setItem', () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );

      const searchInput = screen.queryByTestId('searchInput');
      fireEvent.input(searchInput as HTMLElement, { target: { value: 'city123' } });

      const aboutPageLink = screen.getByTestId('aboutPageLink');
      fireEvent.click(aboutPageLink);
      expect(screen.getByTestId('aboutPage')).toBeInTheDocument();

      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('searchFieldValue', 'city123');
    });
  });

  describe('Passing search value', () => {
    it('Click on "Search" button', () => {
      render(<SearchField searchValue={searchValue} sendInputValue={handleInputValue} />);
      const searchBtn = screen.queryByTestId('searchBtn') as HTMLElement;
      expect(searchBtn).toBeInTheDocument();
      fireEvent.click(searchBtn);
      expect(handleInputValue).toHaveBeenCalledTimes(1);
    });

    it('Click on "Enter" key', () => {
      render(<SearchField searchValue={searchValue} sendInputValue={handleInputValue} />);
      const searchInput = screen.queryByTestId('searchInput') as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      expect(handleInputValue).toHaveBeenCalledTimes(1);
    });
  });
});
