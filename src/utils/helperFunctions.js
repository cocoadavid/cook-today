export function convertToHoursAndMinutes(num) {
  if (num <= 60) {
    return `${num} minutes`;
  }
  let hours = num / 60;
  let rHours = Math.floor(hours);
  let minutes = (hours - rHours) * 60;
  let rMinutes = Math.round(minutes);
  return `${rHours} hour${rHours > 1 ? "s" : ""} ${rMinutes} minutes`;
}
