const { getWeekSeoData } = require('./seo-helpers');
const { EVENTS_FOLDER_NAME } = require('./const');
const { getWeekRangeData } = require('./date-helpers');
const { getPrettyWeek } = require('./date-helpers');
const { getEventList } = require('./context-helpers');
const { getListLead } = require('./simple-helpers');
const { getEventTagSet, getEventRegionSet } = require('./navigation-helpers');

const getWeekPeriods = today => {
  const {
    thisWeekStart,
    thisWeekEnd,
    nextWeekStart,
    nextWeekEnd,
    prevWeekStart,
    prevWeekEnd,
  } = getWeekRangeData(today);
  return [
    {
      start: prevWeekStart,
      end: prevWeekEnd,
      path: `/${EVENTS_FOLDER_NAME}/prev-week/`,
      title: 'Предыдущая неделя',
      nav: 'Предыдущая',
      leadTemplate: 'на прошлой неделе (все что есть по всем регионам)',
    },
    {
      start: thisWeekStart,
      end: thisWeekEnd,
      path: '/',
      title: 'Текущая неделя',
      nav: 'Текущая неделя',
      leadTemplate: 'на этой неделе (все что есть по всем регионам)',
    },
    {
      start: nextWeekStart,
      end: nextWeekEnd,
      path: `/${EVENTS_FOLDER_NAME}/next-week/`,
      title: 'Следующая неделя',
      nav: 'Следующая',
      leadTemplate: 'на будущей неделе (все что есть по всем регионам)',
    },
  ];
};

const getWeekPeriodPageData = (weekPeriod, ymlDataBundle) => {
  const { events, places, eventSections, regions } = ymlDataBundle;
  const { start, end, title, leadTemplate, path: pagePath } = weekPeriod;
  const subtitle = getPrettyWeek(start, end);
  const list = getEventList(events, start, end, places, eventSections);
  const lead = getListLead(list.length, `${leadTemplate}.`);
  const uniqTags = [
    getEventTagSet(list, eventSections),
    getEventRegionSet(list, regions),
  ];
  const seoData = getWeekSeoData(title, leadTemplate, uniqTags);
  return { list, title, subtitle, lead, uniqTags, pagePath, seoData };
};

module.exports = {
  getWeekPeriods,
  getWeekPeriodPageData,
};
