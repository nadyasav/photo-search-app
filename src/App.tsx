import CardSingle from 'components/pages/main/cardSingle/CardSingle';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main, About, PageNotFound, FormPage, Header } from './components';
import { ROUTES } from './constants/constants';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={ROUTES.main} element={<Main />} />
        <Route path={`${ROUTES.cards}/:index/:id`} element={<CardSingle />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.form} element={<FormPage />} />
        <Route path={ROUTES.notFound} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
