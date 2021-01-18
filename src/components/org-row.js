import React from 'react';

const OrgRow = ({ node }) => {
  const { title, coords, link, place, city, org } = node;
  return (
    <p className="org-row">
      <span>{title} </span> - <span> {link} </span>
      <span> {place} </span>
      <span> {city} </span>
      <span> {org} </span>
      <span> {coords} </span>
    </p>
  );
};

export default OrgRow;
