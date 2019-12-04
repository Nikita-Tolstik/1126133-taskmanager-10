export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

