const { getDB } = require('./database');

const dbtest = async () => {
  query = `SELECT * FROM users `;
  const users = await getDB().execute(query);
  console.log(users);
};

// prettier-ignore
const find = (table, condition, order) => {
  //join 고려해서 맡아서 짜오기 시간 조건도 고려해야합니다. ;
};

const updateOne = (table, condition, updateMap) => {
  //
};

const updateAll = (table, condition, updateMap) => {
  //join 고려해서 맡아서 짜오기
};

const deleteOne = (table, condition) => {
  //join 고려해서 맡아서 짜오기
};

const deleteAll = (table, condition) => {
  //join 고려해서 맡아서 짜오기
};

const create = (table, createMap) => {
  //join 고려해서 맡아서 짜오기
};

module.exports = {
  dbtest,
  find,
  updateOne,
  updateAll,
  deleteOne,
  deleteAll,
  create,
};
