import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function NotFoundPage() {
  const pageTitle = `Страница не найдена на Roster.one`;
  return (
    <div className="layout">
      <Helmet htmlAttributes={{ lang: 'ru' }} title={pageTitle} />
      <h1>{pageTitle}</h1>
      <p>
        Вы попали на несуществующую страницу. Ищите подходящие списки на{' '}
        <Link to="/">Roster.one</Link>
      </p>
    </div>
  );
}
