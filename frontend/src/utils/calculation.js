export const calcGroupedDateInfo = (accountHistoryByDate) => {
  const length = accountHistoryByDate.reduce((acc, timeGroup) => acc + timeGroup.data.length, 0);

  const [totalIncome, totalExpenditure] = accountHistoryByDate.reduce(
    (acc, timeGroup) => [acc[0] + timeGroup.income, acc[1] + timeGroup.expenditure],
    [0, 0],
  );

  return { length, totalIncome, totalExpenditure };
};
