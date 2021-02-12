const { getEventTagSet, getEventRegionSet } = require('./navigation-helpers');
const { getEventContext } = require('./context-helpers');
const { getSeoKeywords } = require('./seo-helpers');

const getWeeklyEvents = (events, periodStart, periodEnd) => {
  return events.filter(ev => true);
  // return events.filter(
  //   yml =>
  //     yml.node.fields.filename === region &&
  //     isActualEvent(periodStart, yml.node.date),
  // );
};

const getWeeklyPageData = (today, ymlDataBundle) => {
  const { events, places, eventSections, regions } = ymlDataBundle;
  const pagePath = '/';
  const title = 'Еженедельник';
  const description =
    'Каждую пятницу в 9:30 мы публикуем подборку событий и источников, которую собрали за прошедшую неделю.';
  const lead = `${description} Сегодня в выпуске 22 события и 15 источников.`;
  const subtitle = 'еженедельная подборка';
  const list = getWeeklyEvents(
    events,
    // start,
    // end,
  ).map(({ node }) => getEventContext({ node, places, eventSections }));
  const uniqTags = [
    getEventTagSet(list, eventSections),
    getEventRegionSet(list, regions),
  ];
  const keywords = getSeoKeywords(uniqTags);
  const seoData = { title, description, keywords };
  return {
    list,
    title,
    subtitle,
    lead,
    uniqTags,
    pagePath,
    seoData,
    color: 'brown',
  };
};

module.exports = {
  getWeeklyPageData,
};
