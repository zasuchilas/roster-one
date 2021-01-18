const { ARCHIVE_COMMENT } = require('./const');
const { getArchiveSeoData } = require('./seo-helpers');
const { getSeoData } = require('./seo-helpers');
const { isIntersect, getCollectedDeclination } = require('./simple-helpers');
const { getProgramProps } = require('./props-helpers');
const { getEventContext } = require('./context-helpers');
const { getProgramPath } = require('./navigation-helpers');
const {
  getPrettyMonth,
  includeMonth,
  isActualEvent,
} = require('./date-helpers');
const { getListLead } = require('./simple-helpers');
const {
  getEventTagSet,
  getEventRegionSet,
  getPeriodProgramPath,
} = require('./navigation-helpers');

const getProgramEvents = (events, programItems) => {
  return events.filter(yml => isIntersect(yml.node.tags, programItems));
};

const getEventMonth = event => {
  return event.node.fields['subFolder'];
};

const getPeriodProgramEvents = (
  events,
  programItems,
  periodStart,
  periodEnd,
) => {
  return events.filter(
    yml =>
      isActualEvent(periodStart, yml.node.date) &&
      isIntersect(yml.node.tags, programItems),
    // yml =>
    //   includeMonth(periodStart, periodEnd, yml.node.fields['subFolder']) &&
    //   isIntersect(yml.node.tags, programItems),
  );
};

const groupEventsByMonths = (eventArr, program) => {
  const programProps = getProgramProps(program);
  return eventArr.reduce((acc, event) => {
    const month = getEventMonth(event);
    const monthItem = acc.find(a => a.month === month);
    if (!monthItem) {
      acc.push({
        month,
        ...programProps,
        events: [event],
      });
    } else {
      monthItem.events.push(event);
    }
    return acc;
  }, []);
};

const getProgramList = (events, programs) => {
  return programs.reduce((acc, program) => {
    const { items } = program.node;
    const programEvents = getProgramEvents(events, items);
    const programMonthEvents = groupEventsByMonths(programEvents, program);
    acc = acc.concat(programMonthEvents);
    return acc;
  }, []);
};

const getMonthsProgramPageData = (programItem, ymlDataBundle) => {
  const { places, eventSections, regions } = ymlDataBundle;
  const list = programItem.events.map(({ node }) =>
    getEventContext({ node, places, eventSections }),
  );
  const { month, text: title, desc } = programItem;
  const prettyMonth = getPrettyMonth(month);
  const subtitle = `${prettyMonth} ${ARCHIVE_COMMENT}`;
  const lead = `${getListLead(list.length, desc)}.`;
  const pagePath = getProgramPath(programItem);
  const uniqTags = [
    getEventTagSet(list, eventSections),
    getEventRegionSet(list, regions),
  ];
  const seoData = getArchiveSeoData(title, desc, prettyMonth, uniqTags);
  return { list, title, subtitle, lead, uniqTags, pagePath, seoData };
};

const getPeriodProgramPageData = (periodItem, programItem, ymlDataBundle) => {
  const { events, places, eventSections, regions } = ymlDataBundle;
  const { start, end, subtitle, leadAttach, path: periodSlug } = periodItem;
  const {
    slug: programSlug,
    items: programItems,
    text: title,
    desc,
  } = programItem.node;
  const pagePath = getPeriodProgramPath(periodSlug, programSlug);
  const list = getPeriodProgramEvents(
    events,
    programItems,
    start,
    end,
  ).map(({ node }) => getEventContext({ node, places, eventSections }));
  const collected = getCollectedDeclination(list.length);
  const lead = getListLead(list.length, `${desc}${collected}`);
  const uniqTags = [
    getEventTagSet(list, eventSections),
    getEventRegionSet(list, regions),
  ];
  const seoData = getSeoData(leadAttach, title, desc, uniqTags);
  return { list, title, subtitle, lead, uniqTags, pagePath, seoData };
};

module.exports = {
  getProgramList,
  getMonthsProgramPageData,
  getPeriodProgramPageData,
};
