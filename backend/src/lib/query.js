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

const updateOne = async (table, condition, updateMap) => {
  const conditionTemplate = createEqualsTemplate(condition);
  const updateTemplate = createEqualsTemplate(updateMap);
  const updateQuery = ` UPDATE ${table} SET ${updateTemplate} WHERE ${conditionTemplate}`;
  return await getDB().execute(updateQuery);
};

const updateAll = (table, condition, updateMap) => {};

const deleteOne = async (table, condition) => {
  const conditionTemplate = createEqualsTemplate(condition);
  const deleteQuery = `DELETE FROM ${table} WHERE ${conditionTemplate};`;
  return await getDB().execute(deleteQuery);
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
