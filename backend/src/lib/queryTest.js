const { create, updateOne, deleteOne } = require('./query');

const dbTest = async () => {
  //createTest();
  updateTest();
  //deleteTest();
};

//완료
const deleteTest = async () => {
  const condition = { id: 6 };
  const deleteTestResult = await deleteOne('payment_method', condition);
  console.log('deleteTestResult', deleteTestResult);
};

//완료
const updateTest = async () => {
  const condition = { id: 5 };
  const updateMap = { name: 'update-test', is_delete: true };
  const updateTestResult = await updateOne('payment_method', condition, updateMap);
  console.log('updateTestResult', updateTestResult);
};

//완료
const createTest = async () => {
  const createMap = { user_id: 'star', name: 'kakao-card2', is_delete: true };
  const createTestResult = await create('payment_method', createMap);
  console.log('createTestResult', createTestResult);
};

module.exports = { dbTest };
