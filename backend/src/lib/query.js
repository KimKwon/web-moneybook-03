const { getDB } = require('./database');

const dbtest = async () => {
  query = `SELECT * FROM users `;
  const users = await getDB().execute(query);
  console.log(users);
};

// prettier-ignore
const find = (table, condition, order) => {
 
};

const findOne = async (table, condition) => {
  try {
    const conditionTemplate = createEqualsTemplate(condition);
    const seleteQuery = `SELECT * FROM ${table} WHERE ${conditionTemplate}`;
    const [rows] = await getDB().query(seleteQuery);
    return rows.length === 0 ? null : rows[0];
  } catch (err) {
    console.err(err);
    return null;
  }
};

const updateOne = async (table, condition, updateMap) => {
  try {
    const beforeUpdateData = await findOne(table, condition);
    if (!beforeUpdateData) return null;
    const conditionTemplate = createEqualsTemplate(condition);
    const updateTemplate = createEqualsTemplate(updateMap);
    const updateQuery = ` UPDATE ${table} SET ${updateTemplate} WHERE ${conditionTemplate}`;
    const [row] = await getDB().query(updateQuery);
    return row.affectedRows === 1 ? beforeUpdateData : null;
  } catch (err) {
    console.err(err);
    return null;
  }
};

const updateAll = (table, condition, updateMap) => {};

const deleteOne = async (table, condition) => {
  try {
    const beforeDeleteData = await findOne(table, condition);
    if (!beforeDeleteData) return null;
    const conditionTemplate = createEqualsTemplate(condition);
    const deleteQuery = `DELETE FROM ${table} WHERE ${conditionTemplate};`;
    const [row] = await getDB().query(deleteQuery);
    return row.affectedRows === 1 ? beforeDeleteData : null;
  } catch (err) {
    console.err(err);
    return null;
  }
};

const deleteAll = (table, condition) => {};

const create = async (table, createMap) => {
  try {
    const keys = [],
      values = [];
    Object.entries(createMap).forEach((item) => {
      const [key, value] = item;
      keys.push(key);
      values.push(convertType(value));
    });
    const createQuery = `INSERT INTO ${table} ( ${keys.join(',')} ) values ( ${values.join(',')} )`;
    const [row] = await getDB().execute(createQuery);
    if (row.affectedRows !== 1) return null;
    const createData = await findOne(table, { id: row.insertId });
    return createData;
  } catch (err) {
    console.err(err);
    return null;
  }
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
  deleteOne,
  create,
};
