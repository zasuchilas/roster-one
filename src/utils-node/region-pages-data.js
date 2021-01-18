const { ARCHIVE_COMMENT, COLLECTED_BY } = require('./const');
const { getArchiveSeoData } = require('./seo-helpers');
const { getSeoData } = require('./seo-helpers');
const {
  includeMonth,
  getPrettyMonth,
  isActualEvent,
} = require('./date-helpers');
const {
  getEventContext,
  getEventPathSlug,
  getEventFields,
} = require('./context-helpers');
const { getRegionName, getRegionDesc } = require('./props-helpers');
const { getListLead, getCollectedDeclination } = require('./simple-helpers');
const {
  getEventTagSet,
  getMonthRegionPath,
  getPeriodRegionPath,
} = require('./navigation-helpers');

const getMonthsRegionEvents = (events, month, region) => {
  return events.filter(
    yml =>
      yml.node.fields['subFolder'] === month &&
      yml.node.fields.filename === region,
  );
};

const getPeriodRegionEvents = (events, region, periodStart, periodEnd) => {
  return events.filter(
    yml =>
      yml.node.fields.filename === region &&
      isActualEvent(periodStart, yml.node.date),
  );
};

const getMonthsRegionPageData = (regionItem, ymlDataBundle) => {
  const { pathSlug, month, region } = regionItem;
  const { events, places, eventSections, regions } = ymlDataBundle;
  const list = getMonthsRegionEvents(events, month, region).map(({ node }) =>
    getEventContext({ node, places, eventSections }),
  );
  const title = getRegionName(region, regions);
  const prettyMonth = getPrettyMonth(month);
  const subtitle = `${prettyMonth} ${ARCHIVE_COMMENT}`;
  const desc = getRegionDesc(region, regions);
  const lead = `${getListLead(list.length, desc)}.`;
  const uniqTags = [getEventTagSet(list, eventSections)];
  const pagePath = getMonthRegionPath(pathSlug);
  const seoData = getArchiveSeoData(title, desc, prettyMonth, uniqTags);
  return { list, title, subtitle, lead, uniqTags, pagePath, seoData };
};

const getPeriodRegionPageData = (periodItem, regionItem, ymlDataBundle) => {
  const { events, places, eventSections, regions } = ymlDataBundle;
  const {
    start,
    end,
    subtitle,
    leadAttach,
    path: standardPeriodSlug,
  } = periodItem;
  const regionSlug = regionItem.node.slug;
  const pagePath = getPeriodRegionPath(standardPeriodSlug, regionSlug);
  const list = getPeriodRegionEvents(
    events,
    regionSlug,
    start,
    end,
  ).map(({ node }) => getEventContext({ node, places, eventSections }));
  const title = getRegionName(regionSlug, regions);
  const desc = getRegionDesc(regionSlug, regions);
  const collected = getCollectedDeclination(list.length);
  const lead = getListLead(list.length, `${desc}${collected}`);
  const uniqTags = [getEventTagSet(list, eventSections)];
  const seoData = getSeoData(leadAttach, title, desc, uniqTags);
  return { list, title, subtitle, lead, uniqTags, pagePath, seoData };
};

const getRegionList = ymlDataBundle => {
  const { events } = ymlDataBundle;
  return events.reduce((acc, { node }) => {
    const pathSlug = getEventPathSlug(node);
    const isAlready = acc.find(a => a.pathSlug === pathSlug);
    if (!isAlready) {
      const { month, region } = getEventFields(node);
      acc.push({
        pathSlug,
        month,
        region,
      });
    }
    return acc;
  }, []);
};

module.exports = {
  getMonthsRegionEvents,
  getPeriodRegionEvents,
  getRegionList,
  getMonthsRegionPageData,
  getPeriodRegionPageData,
};
