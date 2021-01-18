import React from 'react';

const NewsRow = ({ node }) => {
  const { title, date, link, place, city, month } = node;
  return (
    <p className="news-row">
      <span className="news-date">{date} </span> - <span> {title} </span>
      <span> {link} </span>
      <span> {place} </span>
      <span> {city} </span>
      <span> {month} </span>
    </p>
  );
};

export default NewsRow;
