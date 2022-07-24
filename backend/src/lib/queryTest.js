const { create, updateOne, deleteOne, findAll } = require('./query');

const dbTest = async () => {
  createTest();
  updateTest();
  //deleteTest();
  //getMonthlyData();
  //getSomeData();
};

//완료
const deleteTest = async () => {
  const condition = { id: 35 };
  const deleteTestResult = await deleteOne('payment_method', condition);
  console.log('deleteTestResult', deleteTestResult);
};

//완료
const updateTest = async () => {
  const condition = { id: 36 };
  const updateMap = { name: 'update-test2', is_delete: true };
  const updateTestResult = await updateOne('payment_method', condition, updateMap);
  console.log('updateTestResult', updateTestResult);
};

//완료
const createTest = async () => {
  const createMap = { user_id: 'star', name: 'kakao-card2', is_delete: true };
  const createTestResult = await create('payment_method', createMap);
  // console.log('createTestResult', createTestResult);
};

const getMonthlyData = async () => {
  const result = await findAll('account_history', {
    joinOptions: {
      table: [
        ['payment_method', 'payment_method_id'],
        ['category', 'category_id'],
        ['users', 'user_id'],
      ],
    },
    where: {
      date: ['BETWEEN', ['2022-07-01', '2022-07-31']],
    },
    fields: [
      'account_history.id',
      'account_history.date',
      'account_history.content',
      'account_history.amount',
      'payment_method.name as methodName',
      'category.name as categoryName',
      'category.id as categoryId',
    ],
  });
};

const getSomeData = async () => {
  const result = await findAll('account_history', {
    joinOptions: {
      table: [
        ['payment_method', 'payment_method_id'],
        ['category', 'category_id'],
        ['users', 'user_id'],
      ],
    },
    where: {
      'DATE(date)': ['=', '2022-07-01'],
    },
    fields: [
      'account_history.id',
      'account_history.date',
      'account_history.content',
      'account_history.amount',
      'payment_method.name as methodName',
      'category.name as categoryName',
      'category.id as categoryId',
    ],
  });
};

module.exports = { dbTest };
