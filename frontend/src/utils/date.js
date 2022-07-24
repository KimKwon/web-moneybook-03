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

export const dayToString = (day) => {
  const dayMap = {
    0: '월',
    1: '화',
    2: '수',
    3: '목',
    4: '금',
    5: '토',
    6: '일',
  };
  return dayMap[day];
};
