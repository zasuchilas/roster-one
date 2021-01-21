import React from 'react';
import Links from './links';

const Navigation = props => {
  const { navigationLinks: links, eventCountText } = props;
  return (
    <div className="navigation mt-4 mb-4">
      <Links linkList={links} inner={true} />
      <div className="comment-block mt-1">
        <div className="mr-1">**</div>
        <div>
          <div>События по регионам и программы событий</div>
          <div>{eventCountText}</div>
          <div>Обратная связь: telegram</div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
