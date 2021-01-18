const getProgramProps = program => {
  const { slug, text, desc, items } = program.node;
  return { slug, text, desc, items };
};

const getIdeaProps = idea => {
  const {
    date,
    text,
    desc,
    fields: { subFolder: region, filename: slug },
    items,
  } = idea.node;
  return { date, text, desc, region, slug, items };
};

const getRegion = (regionSlug, regions) => {
  return regions.find(region => region.node.slug === regionSlug);
};

const getRegionName = (regionSlug, regions) => {
  const region = getRegion(regionSlug, regions);
  return region.node.text;
};

const getRegionDesc = (regionSlug, regions) => {
  const region = getRegion(regionSlug, regions);
  return region.node.desc;
};

module.exports = {
  getProgramProps,
  getIdeaProps,
  getRegion,
  getRegionName,
  getRegionDesc,
};
