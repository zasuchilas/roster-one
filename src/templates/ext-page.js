import React from 'react';
import Layout from '../components/layout';
import PlaceBlock from '../components/place-block';
import showdown from 'showdown';

const converter = new showdown.Converter(); // TODO: не создавать каждый раз

const ExtPage = ({ pageContext }) => {
  const { date, text, place, desc, extText, layoutData } = pageContext;
  // TODO: добавить helmet, заголовок, лид

  const dateBlock = date ? <p>{date}</p> : null;
  const descBlock = desc ? (
    <p
      className="mb-1"
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(desc) }}
    />
  ) : null;
  const extBlock = extText ? (
    <p
      className="mb-1"
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(extText) }}
    />
  ) : null;

  return (
    <Layout layoutData={layoutData}>
      <div className="page-header">
        {dateBlock}
        <PlaceBlock place={place} ext={true} />
        <h1 className="mb-1">{text}</h1>
        {descBlock}
      </div>
      {extBlock}
    </Layout>
  );
};

export default ExtPage;
