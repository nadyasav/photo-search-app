import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import {
  ERROR_FETCH_TEXT,
  ERROR_SEARCH_TEXT,
  FLICKR_PHOTO_DEFAULT_FORMAT,
  FLICKR_SERVER_PHOTOS_URL,
} from 'constants/constants';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from 'store/store';
import Main from './Main';

const resJson = {
  photos: {
    photo: [
      {
        id: '0',
        ownername: '<ownername>',
        title: '<title>',
        views: 14,
        dateTaken: '2022-01-01',
        description: {
          _content: '<description>',
        },
        url_z: '<imgUrl_z>',
        url_l: '<imgUrl_l>',
      },
    ],
  },
};

const resJsonWithoutImgUrl = {
  photos: {
    photo: [
      {
        id: '0',
        server: '123',
        secret: '456',
        ownername: '<ownername>',
        title: '<title>',
        views: 14,
        dateTaken: '2022-01-01',
        description: {
          _content: '<description>',
        },
      },
    ],
  },
};

const resJsonEmpty = {
  photos: {
    photo: [],
  },
};

describe('Testing main page', () => {
  it('renders main page', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
    const mainPage = screen.queryByTestId('mainPage');
    expect(mainPage).toBeInTheDocument();
  });

  describe('Mock localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });

    it('localStorage getItem', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing api request', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('Display cards after fetch api data', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(resJson),
          ok: true,
          status: 200,
          statusText: '',
        } as Response)
      );

      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </MemoryRouter>
      );
      const searchInput = screen.getByTestId('searchInput') as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      await userEvent.type(searchInput, 'city');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      await waitFor(() => {
        expect(screen.queryByTestId('card-0')).toBeInTheDocument();
        expect(screen.getByText(resJson.photos.photo[0].ownername)).toBeInTheDocument();
        expect(screen.getByText(resJson.photos.photo[0].title)).toBeInTheDocument();
        const imgCard0 = screen.queryByTestId('card-0')?.getElementsByTagName('img');
        expect(imgCard0).not.toBeNull();
        if (imgCard0) {
          for (let i = 0; i < imgCard0.length; i++) {
            expect(imgCard0[i]).toHaveAttribute('src', resJson.photos.photo[0].url_z);
          }
        }
      });
    });

    it('Display card after fetch response without img url and originalformat', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(resJsonWithoutImgUrl),
          ok: true,
          status: 200,
          statusText: '',
        } as Response)
      );

      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </MemoryRouter>
      );
      const searchInput = screen.queryByTestId('searchInput') as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      await userEvent.type(searchInput, 'city');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      await waitFor(() => {
        expect(screen.queryByText(/Free stock photos/i)).toBeInTheDocument();
        const card0 = screen.queryByTestId('card-0');
        expect(card0).toBeInTheDocument();
        expect(
          screen.getByText(resJsonWithoutImgUrl.photos.photo[0].ownername)
        ).toBeInTheDocument();
        expect(screen.getByText(resJsonWithoutImgUrl.photos.photo[0].title)).toBeInTheDocument();
        const imgCard0 = card0?.getElementsByTagName('img');
        expect(imgCard0).not.toBeNull();
        if (imgCard0) {
          for (let i = 0; i < imgCard0.length; i++) {
            expect(imgCard0[i]).toHaveAttribute(
              'src',
              `${FLICKR_SERVER_PHOTOS_URL}/${resJsonWithoutImgUrl.photos.photo[0].server}/${resJsonWithoutImgUrl.photos.photo[0].id}_${resJsonWithoutImgUrl.photos.photo[0].secret}.${FLICKR_PHOTO_DEFAULT_FORMAT}`
            );
          }
        }
      });
    });

    it('Display search error', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(resJsonEmpty),
          ok: true,
          status: 200,
          statusText: '',
        } as Response)
      );

      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </MemoryRouter>
      );
      const searchInput = screen.queryByTestId('searchInput') as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      await userEvent.type(searchInput, '!!!!!');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      await waitFor(() =>
        expect(screen.queryByText(new RegExp(ERROR_SEARCH_TEXT, 'i'))).toBeInTheDocument()
      );
    });

    it('Display default error text', async () => {
      global.fetch = jest.fn(() => Promise.resolve({} as Response));

      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </MemoryRouter>
      );
      const searchInput = screen.queryByTestId('searchInput') as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      await userEvent.type(searchInput, 'city');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      await waitFor(() =>
        expect(screen.getByText(new RegExp(ERROR_FETCH_TEXT, 'i'))).toBeInTheDocument()
      );
    });

    it('Display response error text', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve(
          new Response(null, {
            status: 500,
            statusText: 'Internal Server Error',
          })
        )
      );

      render(
        <MemoryRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </MemoryRouter>
      );
      const searchInput = screen.queryByTestId('searchInput') as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      await userEvent.type(searchInput, 'city');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      await waitFor(() => expect(screen.getByText(/500/i)).toBeInTheDocument());
      expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
    });
  });
});
