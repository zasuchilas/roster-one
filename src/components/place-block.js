import React, { Fragment } from 'react';
import Links from './links';
import ToggleBtn from './toggle-btn';

const PlaceBlock = ({ place, ext }) => {
  if (!place) {
    return null;
  }

  const { text, desc, address, links } = place;
  const details = (
    <Fragment>
      <span className="mr-1">
        {desc} {address}
      </span>
      <Links linkList={links} />
    </Fragment>
  );

  const toggleBlock = ext ? (
    <Fragment>
      <span className="mr-1">{text}</span>
      {details}
    </Fragment>
  ) : (
    <ToggleBtn btnText={text} extText={details} opened={Boolean(ext)} />
  );

  return <span className="place-block">{toggleBlock}</span>;
};

export default PlaceBlock;
