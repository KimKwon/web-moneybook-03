const monthToString = (month) => {
  month = String(month);
  return month.length === 1 ? '0' + month : month;
};
const calculateVaildDate = (month, year, period) => {
  period = parseInt(period);
  month = parseInt(month);
  year = parseInt(year);
  /* db에서 사이값 읽어오려면 month +1 해줘야 한다,  */
  if (month === 12) {
    year = year + 1;
    month = 1;
  } else {
    month = month + 1;
  }

  const endDate = `${year}-${monthToString(month)}`;
  if (month - period < 1) {
    year = +year - 1;
    month = period - (12 - month);
  } else {
    month = month - period;
  }

  const startDate = `${year}-${monthToString(month)}`;

  return { startDate, endDate };
};
module.exports = { monthToString, calculateVaildDate };
