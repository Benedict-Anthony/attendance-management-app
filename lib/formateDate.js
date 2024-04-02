import moment from "moment";

export const getToday = () => {
  const day = moment().format("MMMM Do YYYY");
  return day;
};

export const getDayOfTheWeek = () => {
  return moment().format("dddd");
};

export const currentTime = () => {
  let meridiem = "AM";
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();

  if (hour > 12) {
    hour = hour - 12;
  }

  if (hour >= 12) {
    meridiem = "PM";
  }

  return `${hour}:${minute}${meridiem}`;
};
