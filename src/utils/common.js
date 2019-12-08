const TIME_FORMAT_NUMBER = 10;
const HOUR_NUMBER = 12;
const PM_AM = 11;


const castTimeFormat = (value) => {
  return value < TIME_FORMAT_NUMBER ? `0${value}` : String(value);
};


export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % HOUR_NUMBER);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > PM_AM ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};
