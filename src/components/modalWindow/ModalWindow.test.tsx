import { render, screen } from '@testing-library/react';
import { MODALWINDOW_ANIMTYPE } from 'constants/constants';
import React from 'react';
import styled from 'styled-components';
import ModalWindow from './ModalWindow';

const setWindowState = jest.fn();

const styledWindow = styled.div`
  width: 100%;
`;

const props = {
  active: true,
  activeAnimation: MODALWINDOW_ANIMTYPE.animScale,
  setWindowState: setWindowState,
  styled: styledWindow,
};

describe('Testing ModalWindow ', () => {
  it('Renders ModalWindow', () => {
    const modalWindow = render(
      <ModalWindow {...props}>
        <div>children</div>
      </ModalWindow>
    );
    expect(modalWindow).toMatchSnapshot();
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
});
