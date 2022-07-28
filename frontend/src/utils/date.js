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

export const groupByDate = (targetData) => {
  const sortedTargetData = [...targetData];
  sortedTargetData.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const groupData = sortedTargetData.reduce((acc, cur) => {
    let len = acc.length;
    const currentDate = new Date(cur.date);
    if (len === 0 || acc[len - 1].date != currentDate.getDate()) {
      acc.push({});
      len = acc.length;
    }
    if (!acc[len - 1].date) {
      acc[len - 1] = {
        date: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        day: dayToString(currentDate.getDay()),
        data: [],
        income: 0,
        expenditure: 0,
      };
    }
    acc[len - 1].income += cur.isProfit ? cur.amount : 0;
    acc[len - 1].expenditure += cur.isProfit ? 0 : cur.amount;
    acc[len - 1].data.push(cur);
    return [...acc];
  }, []);
  return groupData;
};

export const fillEmptyDay = (data, year, month) => {
  const lastDate = new Date(year, month, 0).getDate();
  if (data.length === 0) data.push({ data: 1, income: 0, expenditure: 0 });
  const filledData = data.reduce((acc, cur, idx) => {
    while (acc.length + 1 !== cur.date) {
      acc.push({
        data: new Array(),
        date: acc.length + 1,
        income: 0,
        expenditure: 0,
      });
    }
    acc.push(cur);
    if (idx + 1 === data.length && acc.length !== lastDate) {
      while (acc.length < lastDate) {
        acc.push({
          date: acc.length + 1,
          income: 0,
          expenditure: 0,
        });
      }
    }
    return acc;
  }, []);
  return filledData;
};

export const monthToString = (month) => {
  month = String(month);
  return month.length === 1 ? '0' + month : month;
};
