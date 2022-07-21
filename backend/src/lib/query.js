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

const findOne = async (table, condition) => {
  const conditionTemplate = createEqualsTemplate(condition);
  const seleteQuery = `SELECT * FROM ${table} WHERE ${conditionTemplate}`;
  const [row] = await getDB().query(seleteQuery);
  return row.length === 0 ? null : row[0];
};

//delete 는 지운놈 , create 만든 놈 , update는 반영전 null 주면 무조건 실패
const updateOne = async (table, condition, updateMap) => {
  const beforeUpdateData = await findOne(table, condition);
  if (!beforeUpdateData) return null;
  const conditionTemplate = createEqualsTemplate(condition);
  const updateTemplate = createEqualsTemplate(updateMap);
  const updateQuery = ` UPDATE ${table} SET ${updateTemplate} WHERE ${conditionTemplate}`;
  const [rows] = await getDB().query(updateQuery);
  return rows.affectedRows === 1 ? beforeUpdateData : null;
};

const updateAll = (table, condition, updateMap) => {};

const deleteOne = async (table, condition) => {
  const seleteQuery = `SELECT * FROM ${table}`;
  const row = await getDB().execute(seleteQuery);

  const conditionTemplate = createEqualsTemplate(condition);
  const deleteQuery = `DELETE FROM ${table} WHERE ${conditionTemplate};`;
  const result = await getDB().execute(deleteQuery);

  if (result) console.log(result);
  return result;
};

const deleteAll = (table, condition) => {};

const create = async (table, createMap) => {
  const keys = [],
    values = [];
  Object.entries(createMap).forEach((item) => {
    const [key, value] = item;
    keys.push(key);
    values.push(convertType(value));
  });
  const createQuery = `INSERT INTO ${table} ( ${keys.join(',')} ) values ( ${values.join(',')} )`;
  return await getDB().execute(createQuery);
};

const createEqualsTemplate = (condition) => {
  const equalsTemplate = Object.entries(condition)
    .map((item) => {
      const [key, value] = item;
      return `${key} = ${convertType(value)}`;
    })
    .join(',');
  return equalsTemplate;
};

const convertType = (value) => {
  return typeof value === 'string' ? `'${value}'` : value;
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
