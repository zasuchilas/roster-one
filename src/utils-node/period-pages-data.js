const { getMonthRangeData, getPrettyPeriod } = require('./date-helpers');
const { getPeriodRegionPageData } = require('./region-pages-data');
const { getPeriodProgramPageData } = require('./program-pages-data');

const getActualPeriod = today => {
  return {
    start: today,
    end: null,
    path: null,
    leadAttach: '',
    subtitle: 'актуальные события',
  };
};

const getStandardPeriods = today => {
  const {
    thisMonthStart,
    thisMonthEnd,
    prevMonthStart,
    prevMonthEnd,
    nextMonthStart,
    nextMonthEnd,
    afterMonthStart,
    afterMonthEnd,
    after24MonthStart,
    after24MonthEnd,
    after5MonthStart,
  } = getMonthRangeData(today);
  const standardPeriods = [
    {
      start: prevMonthStart,
      end: prevMonthEnd,
      path: `prev-month`,
      // periodName: 'Предыдущий месяц',
      leadAttach: 'в прошлом месяце',
    },
    {
      start: thisMonthStart,
      end: thisMonthEnd,
      path: `current-month`,
      // periodName: 'Текущий месяц',
      leadAttach: 'в этом месяце',
    },
    {
      start: nextMonthStart,
      end: nextMonthEnd,
      path: `next-month`,
      // periodName: 'Следующий месяц',
      leadAttach: 'в следующем месяце',
    },
    {
      start: afterMonthStart,
      end: afterMonthEnd,
      path: `after-month`,
      // periodName: 'Через месяц',
      leadAttach: 'через месяц',
    },
    {
      start: after24MonthStart,
      end: after24MonthEnd,
      path: `after-2-4-month`,
      // periodName: 'Через 2-4 месяца',
      leadAttach: 'через 2-4 месяца',
    },
    {
      start: after5MonthStart,
      end: null,
      path: `after-5-more-month`,
      // periodName: 'Через 5 и более месяцев',
      leadAttach: 'через 5 и более месяцев',
    },
  ];
  return standardPeriods.map(standardPeriod => {
    const { start, end } = standardPeriod;
    const subtitle = getPrettyPeriod(start, end);
    return {
      ...standardPeriod,
      subtitle,
    };
  });
};

const getStandardPeriodPagesData = (today, ymlDataBundle) => {
  const { regions, programs } = ymlDataBundle;
  const standardPeriods = getStandardPeriods(today);
  return standardPeriods.reduce((acc, periodItem) => {
    const periodRegionData = regions.map(regionItem =>
      getPeriodRegionPageData(periodItem, regionItem, ymlDataBundle),
    );
    const periodProgramData = programs.map(programItem =>
      getPeriodProgramPageData(periodItem, programItem, ymlDataBundle),
    );
    acc = acc.concat(periodRegionData);
    acc = acc.concat(periodProgramData);
    return acc;
  }, []);
};

const getActualPeriodPagesData = (today, ymlDataBundle) => {
  const { regions, programs } = ymlDataBundle;
  const actualPeriod = getActualPeriod(today);
  const actualRegionData = regions.map(regionItem =>
    getPeriodRegionPageData(actualPeriod, regionItem, ymlDataBundle),
  );
  const actualProgramData = programs.map(programItem =>
    getPeriodProgramPageData(actualPeriod, programItem, ymlDataBundle),
  );
  return [...actualProgramData, ...actualRegionData];
};

module.exports = {
  getStandardPeriods,
  getStandardPeriodPagesData,
  getActualPeriodPagesData,
};
