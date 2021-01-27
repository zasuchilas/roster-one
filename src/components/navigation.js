import React from 'react';
import Links from './links';

const Navigation = props => {
  const { navigationLinks: links, eventCountText } = props;
  return (
    <div className="navigation mt-4 mb-4">
      <Links linkList={links} inner={true} />
    </div>
  );
};

export default Navigation;
