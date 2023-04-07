import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import { testDataCards } from '../../testDataCards';
import { MemoryRouter } from 'react-router-dom';

const handleCardLoading = jest.fn();

describe('Testing card', () => {
  it('renders card', () => {
    render(
      <MemoryRouter>
        <Card
          key={testDataCards[0].id}
          data={testDataCards[0]}
          index={0}
          handleCardLoading={handleCardLoading}
        />
      </MemoryRouter>
    );
    const title = screen.getByText(testDataCards[0].title);
    const owner = screen.getByText(testDataCards[0].owner);
    const card = screen.queryByTestId('card-0');
    expect(card).toBeInTheDocument();
    const imgCollection = card?.getElementsByTagName('img');
    if (imgCollection) {
      for (let i = 0; i < imgCollection.length; i++) {
        expect(imgCollection[i]).toHaveAttribute('src', testDataCards[0].imgUrl.url_z);
      }
    }
    expect(title).toBeInTheDocument();
    expect(owner).toBeInTheDocument();
  });
  it('Img loaded', () => {
    render(
      <MemoryRouter>
        <Card
          key={testDataCards[0].id}
          data={testDataCards[0]}
          index={0}
          handleCardLoading={handleCardLoading}
        />
      </MemoryRouter>
    );
    const img = screen.getByTestId('card-0Img');
    expect(img).toBeInTheDocument();
    fireEvent.load(img);
    expect(handleCardLoading).toHaveBeenCalledTimes(1);
  });
});
