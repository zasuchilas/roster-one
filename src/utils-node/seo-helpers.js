const { ALL_EVENTS_TEXT, COLLECTED_BY } = require('./const');

const getSeoDesc = (periodText, programOrRegionDesc) => {
  return `${ALL_EVENTS_TEXT} ${programOrRegionDesc}${COLLECTED_BY}`;
};

const getSeoTitle = (programOrRegionTitle, periodText) => {
  return `${programOrRegionTitle}`;
};

const getSeoKeywords = uniqTags => {
  return uniqTags
    .reduce((acc, tagSet) => {
      const tagSetArr = tagSet.map(tag => tag.text.toLowerCase());
      acc = acc.concat(tagSetArr);
      return acc;
    }, [])
    .join(', ');
};

const getSeoData = (
  periodText,
  programOrRegionTitle,
  programOrRegionDesc,
  uniqTags,
) => {
  const title = getSeoTitle(programOrRegionTitle, periodText);
  const description = getSeoDesc(periodText, programOrRegionDesc);
  const keywords = getSeoKeywords(uniqTags);
  return { title, description, keywords };
};

module.exports = {
  getSeoData,
};
