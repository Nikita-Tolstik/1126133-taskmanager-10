const TIME_FORMAT_NUMBER = 10;

const castTimeFormat = (value) => {
  return value < TIME_FORMAT_NUMBER ? `0${value}` : String(value);
};

const MONTH_NUMBER = 12;
const HOUR_NUMBER = 11;

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % MONTH_NUMBER);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > HOUR_NUMBER ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};
