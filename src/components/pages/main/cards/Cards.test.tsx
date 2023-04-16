import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { IDataCard } from '../../../../types/customTypes';
import Cards from './Cards';
import { testDataCards } from '../testDataCards';
import { MemoryRouter } from 'react-router-dom';

const dataCardsEmpty: IDataCard[] = [];
const handleCardsLoading = jest.fn();

describe('Testing cards', () => {
  it('renders cards', () => {
    render(
      <MemoryRouter>
        <Cards dataCards={testDataCards} handleCardsLoading={handleCardsLoading} />
      </MemoryRouter>
    );
    const card0 = screen.queryByTestId('card-0');
    const card1 = screen.queryByTestId('card-1');
    expect(card0).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
  });

  it('renders component cards with empty array', () => {
    render(
      <MemoryRouter>
        <Cards dataCards={dataCardsEmpty} handleCardsLoading={handleCardsLoading} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Free stock photos/i)).toBeInTheDocument();
  });

  it('not renders component card with empty array', () => {
    render(
      <MemoryRouter>
        <Cards dataCards={dataCardsEmpty} handleCardsLoading={handleCardsLoading} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('card-0')).toBeNull();
  });
  it('All images loaded', () => {
    render(
      <MemoryRouter>
        <Cards dataCards={testDataCards} handleCardsLoading={handleCardsLoading} />
      </MemoryRouter>
    );
    const img0 = screen.getByTestId('card-0Img');
    const img1 = screen.getByTestId('card-1Img');
    expect(img0).toBeInTheDocument();
    expect(img1).toBeInTheDocument();
    fireEvent.load(img0);
    fireEvent.load(img1);
    expect(handleCardsLoading).toHaveBeenCalledTimes(1);
  });
});
