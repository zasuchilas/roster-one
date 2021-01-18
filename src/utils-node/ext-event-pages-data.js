const { isExpired } = require('./date-helpers');
const { getEventContext } = require('./context-helpers');
const { getExtEventPath } = require('./navigation-helpers');

const getNotExpiredExt = event => !isExpired(event.node['extExp']);

const getExtEventList = ymlDataBundle => {
  const { events } = ymlDataBundle;
  return events.filter(getNotExpiredExt);
};

const getExtEventPagesData = (extEventPage, ymlDataBundle) => {
  const { places, eventSections } = ymlDataBundle;
  const { node } = extEventPage;
  const context = getEventContext({ node, places, eventSections });
  const { pathKey } = context;
  const pagePath = getExtEventPath(pathKey);
  return { ...context, pagePath };
};

module.exports = {
  getExtEventList,
  getExtEventPagesData,
};
