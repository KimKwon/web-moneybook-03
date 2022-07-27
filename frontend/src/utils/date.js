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

const formatStringTo = (_originString, limit) => {
  if (typeof _originString !== 'string' && typeof _originString !== 'number') return;

  let originString = _originString;
  if (typeof originString === 'number') originString = _originString.toString();

  return originString.padStart(limit, '0');
};

/**
 *
 * @date 2022-07-25
 * @param { Date } _date
 * @returns { startDate: string, endDate: string }
 */
export const getStartAndEndDate = (_date) => {
  const date = new Date(_date);
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
    .toString()
    .getParsedDatestring('YYYY-MM-DD');
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    .toString()
    .getParsedDatestring('YYYY-MM-DD');

  return {
    startDate,
    endDate,
  };
};

function getParsedDatestring(dateType) {
  if (typeof this !== 'string') throw Error('target is not string');
  try {
    const date = new Date(this);
    switch (dateType) {
      case 'YYYY-MM-DD':
        return `${date.getFullYear()}-${formatStringTo(date.getMonth() + 1, 2)}-${formatStringTo(
          date.getDate(),
          2,
        )}`;
      case 'YYYYMMDD':
        return `${date.getFullYear()}${formatStringTo(date.getMonth() + 1, 2)}${formatStringTo(
          date.getDate(),
        )}`;
      default:
        return this;
    }
  } catch (error) {
    console.log(error);
    return this;
  }
}

export const definePrototypeMethod = () => {
  String.prototype.getParsedDatestring = getParsedDatestring;
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
