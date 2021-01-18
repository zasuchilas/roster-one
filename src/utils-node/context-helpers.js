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

const getEventContext = ({ node, places, eventSections }) => {
  const { fields, ...props } = node;
  const contextFields = { ...props, ...fields };
  const {
    // extExp,
    folder: part,
    subFolder: month,
    filename: region,
    date: dateAsString,
    slug,
    tags,
    place,
  } = contextFields;

  const date = formatDateStr(dateAsString);

  contextFields.eventSlug = createEventSlug(date, slug, tags);
  contextFields.pathSlug = getEventPathSlug(node);
  contextFields.pathKey = `${contextFields.pathSlug}${contextFields.eventSlug}/`;
  contextFields.place = getPlaceData(places, place, region);
  contextFields.month = month;
  contextFields.region = region;
  contextFields.part = part;
  contextFields.dateFormated = getDateFormated(dateAsString);
  contextFields.tagsDetails = tags.map(tag => {
    const tagDetails = eventSections.find(eventEl => eventEl.node.slug === tag);
    return tagDetails ? tagDetails.node.text : tag;
  });

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
