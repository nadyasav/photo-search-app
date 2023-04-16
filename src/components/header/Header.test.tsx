import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import * as hooks from '../../hooks/hooks';

const linksUrl = Object.values(ROUTES);

it('Testing header url links', () => {
  jest.spyOn(hooks, 'useAppSelector').mockReturnValueOnce([]).mockReturnValueOnce(1);

  const header = render(
    <MemoryRouter>
      <Header />;
    </MemoryRouter>
  );

  const linksArray = header.queryAllByRole('link');

  linksArray.map((linkItem) => expect(linkItem).toHaveAttribute('href', findUrl(linkItem)));

  function findUrl(linkItem: HTMLElement): string | void {
    let url = '';

    linksUrl.map((linkUrl) => {
      if (linkUrl === linkItem.getAttribute('href')) {
        url = linkUrl;
      }
    });

    return url;
  }
});
