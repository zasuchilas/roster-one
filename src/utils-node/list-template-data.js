const { getWeeklyPageData } = require('./weekly-page-data');
const { getActualPeriodPagesData } = require('./period-pages-data');

const getListTemplateData = (ymlDataBundle, today) => {
  const weeklyPageDate = getWeeklyPageData(today, ymlDataBundle);
  const actualPeriodData = getActualPeriodPagesData(today, ymlDataBundle);
  return [weeklyPageDate, ...actualPeriodData];
};

module.exports = {
  getListTemplateData,
};
