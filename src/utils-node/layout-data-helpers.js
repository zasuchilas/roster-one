const { declinationNumerals } = require('./simple-helpers');
const { getWeekPeriods } = require('./week-pages-data');
const { getStandardPeriods } = require('./period-pages-data');
const { getRegionName } = require('./props-helpers');
const {
  getPeriodRegionPath,
  getPeriodProgramPath,
} = require('./navigation-helpers');
const {
  getCurrentWeekStartStr,
  formatBuildTime,
  formatBuildDate,
} = require('./date-helpers');

const linkBundleCountItems = [
  'weekPeriods',
  'periodRegionLinks',
  'periodProgramLinks',
];

const getRosterCount = linkBundle => {
  return Object.keys(linkBundle)
    .filter(key => linkBundleCountItems.includes(key))
    .reduce((acc, key) => {
      acc = acc + linkBundle[key].length;
      return acc;
    }, 0);
};

const getRosterCountText = linkBundle => {
  const rosterCount = getRosterCount(linkBundle);
  const unit = declinationNumerals(rosterCount, [
    'список',
    'списка',
    'списков',
  ]);
  return `${rosterCount} ${unit} + архив`;
};

const filterActual = (event, actualDateStr) => {
  const dateStr = event.node.date;
  return dateStr > actualDateStr;
};

const getEventCountText = (events, today) => {
  const actualDateStr = getCurrentWeekStartStr(today);
  const actualEvents = events.filter(event =>
    filterActual(event, actualDateStr),
  ).length;
  const actualUnit = declinationNumerals(actualEvents, [
    'событие',
    'события',
    'событий',
  ]);
  return `Всего в наличии ${actualEvents} ${actualUnit}.`;
};

const parseNavigationLinks = listTemplatePagesData => {
  return listTemplatePagesData.map(pageData => {
    const { title: type, pagePath: src, list } = pageData;
    const count = list.length;
    return { type, src, count };
  });
};

const getLayoutData = (now, today, ymlDataBundle, navigationLinks) => {
  const { siteMetadata, events } = ymlDataBundle;

  const eventCountText = getEventCountText(events, today);

  const buildDate = formatBuildDate(now);
  const buildTime = formatBuildTime(now);

  return {
    siteMetadata,
    navigationLinks,
    eventCountText,
    buildDate,
    buildTime,
  };
};

module.exports = {
  getLayoutData,
  parseNavigationLinks,
};
