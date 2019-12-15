import moment from 'moment';

export const formatTime = (date) => {
  return moment(date).format(`h:m A`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};
