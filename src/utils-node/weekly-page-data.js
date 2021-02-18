const { getDateFormated } = require('./date-helpers');
const { isInRange } = require('./date-helpers');
const { getWeeklyRange } = require('./date-helpers');
const { getEventTagSet, getEventRegionSet } = require('./navigation-helpers');
const { getEventContext } = require('./context-helpers');
const { getSeoKeywords } = require('./seo-helpers');

const getWeeklyEvents = (events, rangeStartDate, rangeEndDate) => {
  return events.filter(yml =>
    isInRange({
      rangeStartDate,
      rangeEndDate,
      checkingDateText: yml.node.written,
    }),
  );
};

const getWeeklyPageData = (today, ymlDataBundle) => {
  const { events, places, eventSections, regions } = ymlDataBundle;
  const pagePath = '/';
  const title = 'Еженедельник';
  const description =
    'Каждую пятницу в 9:30 мы публикуем подборку событий и источников, которую собрали за прошедшую неделю.';
  const lead = `${description} Сегодня в выпуске 22 события и 15 источников.`;

  const {
    startDateTime,
    endDateTime,
    startDateStr,
    endDateStr,
  } = getWeeklyRange(today);
  const list = getWeeklyEvents(
    events,
    startDateTime,
    endDateTime,
  ).map(({ node }) =>
    getEventContext({ node, places, eventSections, regions }),
  );

  const weeklyStart = getDateFormated(startDateStr);
  const weeklyEnd = getDateFormated(endDateStr);
  const subtitle = `${weeklyStart} - ${weeklyEnd} | ${list.length}`;

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
