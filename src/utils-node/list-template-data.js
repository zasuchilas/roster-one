const { getActualPeriodPagesData } = require('./period-pages-data');

const getListTemplateData = (ymlDataBundle, today) => {
  const actualPeriodData = getActualPeriodPagesData(today, ymlDataBundle);
  return [...actualPeriodData];
};

module.exports = {
  getListTemplateData,
};
