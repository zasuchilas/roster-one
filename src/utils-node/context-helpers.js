const { SOURCE_TAG_COLOR } = require('./const');
const { getRegionName } = require('./props-helpers');
const { SOURCE_TAG_SLUG } = require('./const');
const { SOURCES_FOLDER_NAME } = require('./const');
const { SOURCE_TAG_NAME } = require('./const');
const { EVENTS_FOLDER_NAME } = require('./const');
const { EVENT_TAG_SLUG } = require('./const');
const { EVENT_TAG_NAME } = require('./const');
const { formatDateStr, getDateFormated } = require('./date-helpers');

const { createBaseString, createEventSlug } = require('./simple-helpers');

const { getPlaceData, getPeriodEvents } = require('./data-helpers');

const getEventFields = node => {
  const {
    fields: { folder: part, subFolder: month, filename: region },
  } = node;
  return { part, month, region };
};

const getEventPathSlug = node => {
  const { part, month, region } = getEventFields(node);
  return createBaseString([part, month, region]);
};

const getTagDetails = (tags, eventSections) => {
  const tagsDetails = tags.map(tag => {
    const tagDetails = eventSections.find(eventEl => eventEl.node.slug === tag);
    return tagDetails ? tagDetails.node.text : tag;
  });
  return tagsDetails;
};

const isEvent = part => {
  return part === EVENTS_FOLDER_NAME;
};

const isSource = part => {
  // есть 2 варианта: event || source
  // не будем усложнять и проверять part === SOURCES_FOLDER_NAME
  return !isEvent(part);
};

const getEventContext = ({ node, places, eventSections, regions }) => {
  const { fields, ...props } = node;
  const contextFields = { ...props, ...fields };

  const {
    // extExp,
    folder: part,
    subFolder,
    filename,
    date: dateAsString,
    slug,
    tags,
    place,
  } = contextFields;
  const month = isEvent(part) && subFolder;
  const region = isEvent(part) ? filename : subFolder;
  const regionName = getRegionName(region, regions);
  const partName = isEvent(part) ? EVENT_TAG_NAME : SOURCE_TAG_NAME;
  const partSlug = isEvent(part) ? EVENT_TAG_SLUG : SOURCE_TAG_SLUG;
  const partColor = isSource(part) ? SOURCE_TAG_COLOR : null;

  const date = isEvent(part) && formatDateStr(dateAsString);
  const eventSlug = isEvent(part) ? createEventSlug(date, slug, tags) : slug;
  const pathSlug = isEvent(part)
    ? getEventPathSlug(node)
    : `/sources/${region}/`;
  const dateFormated = isEvent(part) && getDateFormated(dateAsString);

  contextFields.eventSlug = eventSlug;
  contextFields.pathSlug = pathSlug;
  contextFields.pathKey = `${contextFields.pathSlug}${contextFields.eventSlug}/`;
  contextFields.place = getPlaceData(places, place, region); // расширенная форма описания места события
  contextFields.month = month;
  contextFields.region = region;
  contextFields.regionName = regionName;
  contextFields.part = part;
  contextFields.partName = partName;
  contextFields.partSlug = partSlug;
  contextFields.partColor = partColor;
  contextFields.dateFormated = dateFormated;
  contextFields.tagsDetails = getTagDetails(tags, eventSections);

  return contextFields;
};

const getEventList = (
  events,
  periodStart,
  periodEnd,
  places,
  eventSections,
) => {
  return getPeriodEvents(events, periodStart, periodEnd).map(({ node }) =>
    getEventContext({ node, places, eventSections }),
  );
};

module.exports = {
  getEventContext,
  getEventList,
  getEventPathSlug,
  getEventFields,
};
