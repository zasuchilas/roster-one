const groups = {
  // monthly rosters
  run: 'Беговые виды спорта',
  wr: 'Борьба',
  kick: 'Ударные виды единоборств',
  race: 'Авто и мотоспорт', // самолеты, лодки
  weight: 'Силовые виды спорта',
  distance: 'Преодоление расстояний',
};

const tags_ = {
  // -> yearly rosters
  orienteering: {
    group: 'run',
    name: 'Спортивное ориентирование',
  },
  bodybuilding: {
    group: 'power',
    name: 'Бодибилдинг, культуризм',
  },
};

const powerTags = {
  bodybuilding: 'Бодибилдинг, культуризм',
  powerlifting: 'Пауэрлифтинг',
  weightlifting: 'Тяжелая атлетика',
};

const joinTags = (tags, groupKey, groupName) => {
  const groupItem = groups[groupName];
  return Object.keys(group);
};

const joinGroups = groups => {
  const tags = {};
  return Object.entries(groups).map(([groupKey, groupName]) => {
    return joinTags(tags, groupKey, groupName);
  });
};

const tags = joinGroups(groups);

export default tags;
