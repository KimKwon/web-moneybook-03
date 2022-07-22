export const updateDate = (currentDate, nextMonth) => {
  const nextDate = { ...currentDate };
  if (nextMonth === 0) {
    nextDate.month = 12;
    nextDate.year -= 1;
  } else if (nextMonth === 13) {
    nextDate.month = 1;
    nextDate.year += 1;
  } else {
    nextDate.month = nextMonth;
  }
  return nextDate;
};
