const monthToString = (month) => {
  month = String(month);
  return month.length === 1 ? '0' + month : month;
};
module.exports = { monthToString };
