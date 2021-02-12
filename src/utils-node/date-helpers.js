const { MONTH_PRETTY_TEMPLATE } = require('./const');
const parseISO = require('date-fns/parseISO');
const format = require('date-fns/format');
const ru = require('date-fns/locale/ru');
const endOfDay = require('date-fns/endOfDay');
const startOfWeek = require('date-fns/startOfWeek');
const endOfWeek = require('date-fns/endOfWeek');
const addHours = require('date-fns/addHours');
const addDays = require('date-fns/addDays');
const subDays = require('date-fns/subDays');
const startOfMonth = require('date-fns/startOfMonth');
const endOfMonth = require('date-fns/endOfMonth');
const addMonths = require('date-fns/addMonths');
const subMonths = require('date-fns/subMonths');
const isSameMonth = require('date-fns/isSameMonth');
const startOfDay = require('date-fns/startOfDay');

const getToday = now => {
  return startOfDay(now);
};

const getMskNow = now => {
  return addHours(now, 3);
};

const formatDate = date => format(date, 'yyyy-MM-dd');

const formatBuildDate = now =>
  format(now, 'EEEE, dd MMMM yyyy', { locale: ru });

const formatBuildTime = now => format(now, 'HH:mm мск');

const formatDateStr = dateAsString => formatDate(parseISO(dateAsString));

const getDateFormated = dateAsString =>
  format(parseISO(dateAsString), 'EEEEEE dd.MM.yyyy', {
    locale: ru,
  });

const getMonthStr = monthSlug => `${monthSlug}-01`;

const getCurrentWeekStartStr = today => {
  const weekStartDate = startOfWeek(today);
  return formatDate(weekStartDate);
};

const getDateString = dateTimeAsString => dateTimeAsString.substr(0, 10);

const getPrettyMonth = monthSlug => {
  const date = parseISO(getMonthStr(monthSlug));
  return format(date, MONTH_PRETTY_TEMPLATE, { locale: ru });
};

const getPrettyWeek = (weekStart, weekEnd) => {
  const start = format(parseISO(weekStart), 'dd MMMM', { locale: ru });
  const end = format(parseISO(weekEnd), 'dd MMMM', { locale: ru });
  const year = format(parseISO(weekEnd), 'yyyy');
  return `${start} - ${end} ${year} г.`;
};

const getPrettyPeriod = (periodStart, periodEnd, periodName) => {
  const startDate = parseISO(periodStart);
  const endDate = periodEnd && parseISO(periodEnd);
  let period;
  if (!endDate || isSameMonth(startDate, endDate)) {
    period = format(startDate, 'LLLL yyyy г.', { locale: ru });
    if (!endDate) {
      period += ' и позднее';
    }
  } else {
    const start = format(parseISO(periodStart), 'LLLL', { locale: ru });
    const end = format(parseISO(periodEnd), 'LLLL yyyy г.', { locale: ru });
    period = `${start} - ${end}`;
  }
  return periodName ? `${period} / ${periodName}` : period;
};

const isActualEvent = (today, dateStr) => {
  const eventDate = parseISO(dateStr);
  return today <= eventDate;
};

const includeMonth = (periodStart, periodEnd, monthSlug) => {
  const firstMonthDay = getMonthStr(monthSlug);
  if (!periodEnd) {
    return periodStart <= firstMonthDay;
  }
  return periodStart <= firstMonthDay && firstMonthDay <= periodEnd;
};

const isExpired = checkingDate => {
  if (!checkingDate) {
    return true;
  }
  const checkingAsDate = parseISO(checkingDate);
  return new Date() > endOfDay(checkingAsDate);
};

const getWeekRangeData = today => {
  const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const nextWeekStart = addDays(thisWeekStart, 7);
  const nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 1 });
  const prevWeekStart = subDays(thisWeekStart, 7);
  const prevWeekEnd = subDays(thisWeekEnd, 7);
  return {
    thisWeekStart: formatDate(thisWeekStart),
    thisWeekEnd: formatDate(thisWeekEnd),
    nextWeekStart: formatDate(nextWeekStart),
    nextWeekEnd: formatDate(nextWeekEnd),
    prevWeekStart: formatDate(prevWeekStart),
    prevWeekEnd: formatDate(prevWeekEnd),
  };
};

const getMonthRangeData = today => {
  const thisMonthStart = startOfMonth(today);
  const thisMonthEnd = endOfMonth(today);
  const prevMonthStart = subMonths(thisMonthStart, 1);
  const prevMonthEnd = subMonths(thisMonthEnd, 1);
  const nextMonthStart = addMonths(thisMonthStart, 1);
  const nextMonthEnd = addMonths(thisMonthEnd, 1);
  const afterMonthStart = addMonths(thisMonthStart, 2); // через месяц
  const afterMonthEnd = addMonths(thisMonthEnd, 2);
  const after24MonthStart = addMonths(thisMonthStart, 3);
  const after24MonthEnd = addMonths(thisMonthEnd, 5);
  const after5MonthStart = addMonths(thisMonthStart, 6);
  return {
    thisMonthStart: formatDate(thisMonthStart),
    thisMonthEnd: formatDate(thisMonthEnd),
    prevMonthStart: formatDate(prevMonthStart),
    prevMonthEnd: formatDate(prevMonthEnd),
    nextMonthStart: formatDate(nextMonthStart),
    nextMonthEnd: formatDate(nextMonthEnd),
    afterMonthStart: formatDate(afterMonthStart),
    afterMonthEnd: formatDate(afterMonthEnd),
    after24MonthStart: formatDate(after24MonthStart),
    after24MonthEnd: formatDate(after24MonthEnd),
    after5MonthStart: formatDate(after5MonthStart),
  };
};

const getWeeklyPeriod = today => {};

module.exports = {
  getToday,
  getMskNow,
  formatDate,
  formatBuildDate,
  formatBuildTime,
  getPrettyMonth,
  isActualEvent,
  isExpired,
  getPrettyWeek,
  getPrettyPeriod,
  getWeekRangeData,
  getDateFormated,
  formatDateStr,
  getMonthRangeData,
  includeMonth,
  getMonthStr,
  getCurrentWeekStartStr,
  getDateString,
};
