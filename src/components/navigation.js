import React from 'react';
import Links from './links';

const Navigation = props => {
  const { navigationLinks: links } = props;
  return (
    <div className="navigation">
      <Links linkList={links} inner={true} />
    </div>
  );
};

export default Navigation;
