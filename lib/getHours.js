export function getStartHour() {
  let currentHour = new Date().getHours();
  let meridiem = "am";
  if (currentHour > 12) {
    currentHour = currentHour - 12;
  }
  if (currentHour >= 12) {
    meridiem = "pm";
  }

  return {
    currentHour,
    meridiem,
  };
}
