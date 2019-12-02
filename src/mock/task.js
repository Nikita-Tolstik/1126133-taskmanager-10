import {colors} from '../const.js';

const descriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const MIN_NUMBER = 0;
const ONE = 1;
const ONE_MINUS = -1;
const RANDOM_NUMBER = 0.5;
const MAX_DAY_NUMBER = 7;
const HASHTAG_MAX = 3;


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(MIN_NUMBER, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + ONE - min));
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > RANDOM_NUMBER ? ONE : ONE_MINUS;
  const diffValue = sign * getRandomIntegerNumber(MIN_NUMBER, MAX_DAY_NUMBER);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': Math.random() > RANDOM_NUMBER,
  });
};

const generateTags = (allTags) => {
  return allTags
    .filter(() => Math.random() > RANDOM_NUMBER)
    .slice(MIN_NUMBER, HASHTAG_MAX);
};

const generateTask = () => {
  const dueDate = Math.random() > RANDOM_NUMBER ? null : getRandomDate();

  return {
    description: getRandomArrayItem(descriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(tags)),
    color: getRandomArrayItem(colors),
    isFavorite: Math.random() > RANDOM_NUMBER,
    isArchive: Math.random() > RANDOM_NUMBER,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};


export {generateTask, generateTasks};
