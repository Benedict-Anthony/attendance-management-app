const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sartuday",
];

export const getCurrentDay = (day) => {
  const currentDayIndex = weekDays.findIndex(
    (foundDay) => foundDay.toLowerCase() === day.toLowerCase()
  );
  const currentWeekDay = weekDays[currentDayIndex];

  const dayIndex = new Date().getDay();

  if (dayIndex === currentDayIndex) {
    return currentWeekDay;
  }

  return null;
};
