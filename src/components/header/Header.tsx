import { useAppSelector } from 'hooks/hooks';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';

function Header() {
  const { cardsPerPage, pageNumber } = useAppSelector((state) => state.cards);
  const { cardPosition } = useAppSelector((state) => state.cardSingle);

  return (
    <header className="header">
      {cardPosition !== null && (
        <p className="header__cardPosition">
          Image position:{' '}
          {pageNumber > 1 ? cardsPerPage * (pageNumber - 1) + cardPosition + 1 : cardPosition + 1}
        </p>
      )}
      <div className="header__inner">
        <NavLink to={ROUTES.main} data-testid="mainPageLink">
          Main
        </NavLink>
        <NavLink to={ROUTES.about} data-testid="aboutPageLink">
          About Us
        </NavLink>
        <NavLink to={ROUTES.form} data-testid="formPageLink">
          Form
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
