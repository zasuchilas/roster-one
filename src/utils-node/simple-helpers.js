// const isItEvents = folder => folder === EVENTS_FOLDER_NAME;
// const isItNews = folder => folder === NEWS_FOLDER_NAME;
// const isItPlace = folder => folder === PLACES_FOLDER_NAME;
const createBaseString = arr => `/${arr.join('/')}/`;

const createEventSlug = (date, slug, tags) => {
  if (!date || !tags || !tags[0]) {
    throw new Error('wrong event record');
  }
  return slug ? `${date}-${slug}-${tags[0]}` : `${date}-${tags[0]}`;
};

const isIntersect = (arr1, arr2) => {
  if (!arr1 || !arr2) {
    return false;
  }
  return arr1.some(a1 => arr2.includes(a1));
};

/**
 * Склонение числительных
 * @param number
 * @param textForms напр., [год, года, лет]
 * @returns {*}
 */
const declinationNumerals = (number, textForms) => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
};

const getCollectedDeclination = eventCount => {
  const declination = declinationNumerals(eventCount, [
    'собранное',
    'собранные',
    'собранных',
  ]);
  return `, ${declination} Roster.one`;
};

const getListLead = (eventCount, template) => {
  if (!eventCount) {
    return `Нет событий ${template}`;
  }
  const declination = declinationNumerals(eventCount, [
    'событие',
    'события',
    'событий',
  ]);
  return `<span>${eventCount}</span> ${declination} ${template}`;
};

const getWeekLead = (eventCount, template) => {
  const declination = declinationNumerals(eventCount, [
    'запись',
    'записи',
    'записей',
  ]);
  return `${template} (<strong>${eventCount}</strong> ${declination})`;
};

module.exports = {
  createBaseString,
  createEventSlug,
  isIntersect,
  declinationNumerals,
  getListLead,
  getWeekLead,
  getCollectedDeclination,
};
