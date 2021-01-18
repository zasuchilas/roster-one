const {
  ARCHIVE,
  EVENTS_PROGRAM,
  MONTH_PRETTY_TEMPLATE,
  EVENTS_FOLDER_NAME,
} = require('./const');
const { getPrettyMonth } = require('./date-helpers');
const { getRegion, getRegionName } = require('./props-helpers');
const getExtEventPath = pathKey => `/${ARCHIVE}${pathKey}`;
const getMonthRegionPath = pathSlug => `/${ARCHIVE}${pathSlug}`;
const getProgramPath = programItem => {
  const { month, slug } = programItem;
  return `/${ARCHIVE}/${EVENTS_PROGRAM}/${month}/${slug}/`;
};

const getProgramNavData = programList =>
  programList.map(programItem => {
    const { month, text, slug } = programItem;
    const prettyMonth = getPrettyMonth(month, MONTH_PRETTY_TEMPLATE);
    return {
      monthSlug: month,
      monthName: prettyMonth,
      program: slug,
      programName: text,
      type: text,
      src: getProgramPath(programItem),
    };
  });

const getRegionNavData = (regionList, ymlDataBundle) => {
  const { regions } = ymlDataBundle;
  return regionList.map(regionItem => {
    const { pathSlug, month, region } = regionItem;
    const text = getRegionName(region, regions);
    const prettyMonth = getPrettyMonth(month, MONTH_PRETTY_TEMPLATE);
    return {
      monthSlug: month,
      monthName: prettyMonth,
      region,
      regionName: text,
      type: text,
      src: getMonthRegionPath(pathSlug),
    };
  });
};

const getEventTagSet = (eventList, eventSections) => {
  const uniqTags = new Set();
  eventList.forEach(event => {
    event.tags.forEach(tag => {
      uniqTags.add(tag);
    });
  });
  const uniqTagDetails = [];
  uniqTags.forEach(slug => {
    const text = eventSections.find(eventEl => eventEl.node.slug === slug);
    uniqTagDetails.push({
      text: (text && text.node.text) || slug,
      slug,
      type: 'tags',
    });
  });
  uniqTagDetails.sort((a, b) => (a.text > b.text ? 1 : -1));
  return uniqTagDetails;
};

const getEventRegionSet = (eventList, regions) => {
  const uniqRegions = new Set();
  eventList.forEach(event => {
    uniqRegions.add(event.region);
  });
  const uniqRegionsDetails = [];
  uniqRegions.forEach(slug => {
    const text = getRegion(slug, regions);
    uniqRegionsDetails.push({
      text: (text && text.node.text) || slug,
      slug,
      type: 'region',
    });
  });
  uniqRegionsDetails.sort((a, b) => (a.text > b.text ? 1 : -1));
  return uniqRegionsDetails;
};

const getPeriodRegionPath = (periodSlug, regionSlug) =>
  periodSlug
    ? `/${EVENTS_FOLDER_NAME}/${periodSlug}/${regionSlug}/`
    : `/${regionSlug}-${EVENTS_FOLDER_NAME}/`;

const getPeriodProgramPath = (periodSlug, programSlug) =>
  periodSlug
    ? `/${EVENTS_FOLDER_NAME}/${periodSlug}/${programSlug}/`
    : programSlug === 'index'
    ? '/'
    : `/${programSlug}-${EVENTS_FOLDER_NAME}/`;

module.exports = {
  getExtEventPath,
  getMonthRegionPath,
  getProgramPath,
  getProgramNavData,
  getRegionNavData,
  getEventTagSet,
  getEventRegionSet,
  getPeriodRegionPath,
  getPeriodProgramPath,
};
