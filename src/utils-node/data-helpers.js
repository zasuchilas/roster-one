const {
  COMMON_FOLDER,
  EVENTS_FOLDER_NAME,
  PLACES_FOLDER_NAME,
} = require('./const');
const { getIdeaProps } = require('./props-helpers');
const { getYamlBlock, getYamlSubFolder } = require('./yaml-helpers');

const getYmlDataBundle = mainQueryResult => {
  const siteMetadata = mainQueryResult.data['site'].siteMetadata;
  const yamlData = mainQueryResult.data['allYaml'].edges;
  const events = getYamlBlock(yamlData, EVENTS_FOLDER_NAME);
  const places = getYamlBlock(yamlData, PLACES_FOLDER_NAME);
  const eventSections = getYamlSubFolder(
    yamlData,
    COMMON_FOLDER,
    'event-sections',
  );
  const regions = getYamlSubFolder(yamlData, COMMON_FOLDER, 'regions');
  const programs = getYamlSubFolder(yamlData, COMMON_FOLDER, 'event-programs');
  return {
    siteMetadata,
    events,
    places,
    eventSections,
    regions,
    programs,
  };
};

const getPlaceData = (places, placeSlug, region) => {
  const place = places.find(
    yml =>
      yml.node.fields['subFolder'] === region && yml.node.slug === placeSlug,
  );
  return place ? place.node : null;
};

const getPeriodEvents = (events, fromDate, toDate) => {
  return events.filter(
    yml => yml.node.date >= fromDate && yml.node.date <= toDate,
  );
};

const getIdeaPlaces = (places, ideaProps) => {
  return places.filter(
    yml =>
      yml.node.fields['subFolder'] === ideaProps.region &&
      ideaProps.items.includes(yml.node.slug),
  );
};

const getIdeaList = (places, ideas) => {
  return ideas.reduce((acc, idea) => {
    const ideaProps = getIdeaProps(idea);
    const ideaPlaces = getIdeaPlaces(places, ideaProps);
    acc.push({
      ...ideaProps,
      places: ideaPlaces,
    });
    return acc;
  }, []);
};

module.exports = {
  getYmlDataBundle,
  getPlaceData,
  getPeriodEvents,
  getIdeaList,
};
