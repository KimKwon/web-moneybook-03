const { getDB } = require('./database');

const dbtest = async () => {
  query = `SELECT * FROM users `;
  const users = await getDB().execute(query);
};

const join = (table, joinInfo, fields) => {
  let selected = fields ? fields.map((field) => `${field}`) : '*';

  return `
    SELECT ${selected}
    FROM ${table} ${joinInfo
    .map(
      ([joinTable, joinFk]) =>
        `
          INNER JOIN ${joinTable} 
          ON ${table}.${joinFk} = ${joinTable}.id
        `,
    )
    .join(' ')}
  `;
};

/**
 * @param  { string } table // 쿼리 연산을 수행할 테이블의 이름을 문자열로 명시함.
 * @param  {
 *  joinOptions?: {
 *    table: [[테이블 이름, 해당 테이블의 FK]],
 *  },
 * where?: {
 *   string(바꿀 속성의 속성명): [연산자, 피연산자]
 * } | string,
 * fields: [SELECT할 속성들]
 * } options // find 할 때의 옵션을 제공함.
 */

const findAll = async (table, options = {}) => {
  // join 고려해서 맡아서 짜오기 시간 조건도 고려해야합니다. ;

  let query = '';

  const { joinOptions, fields, where, order } = options;

  try {
    if (typeof table !== 'string') throw Error('테이블 형식이 잘못됨.');

    if (joinOptions) query += join(table, joinOptions.table, fields);
    else
      query = `
      SELECT ${fields ? fields.join(', ') : '*'}
      FROM ${table}
    `;

    if (where) {
      query += `WHERE ${createWhereTemplate(where)}`;
    }

    if (order) {
      // target: 기준 필드, type: asc or desc
      const { target, type = 'ASC' } = order;
      query += `ORDER BY ${target} ${type}`;
    }

    return await getDB().query(query);
  } catch (error) {
    console.error(error);
  }
};

const findOne = async (table, options = {}) => {
  const { condition, fields } = options;

  try {
    const whereTemplate = createWhereTemplate(condition);
    const seleteQuery = `SELECT ${
      fields ? fields.join(', ') : '*'
    } FROM ${table} WHERE ${whereTemplate}`;
    const [rows] = await getDB().query(seleteQuery);
    return rows.length === 0 ? null : rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateOne = async (table, options = {}) => {
  const { condition, updateMap, fields } = options;

  try {
    const beforeUpdateData = await findOne(table, { condition, fields });
    if (!beforeUpdateData) return null;
    const whereTemplate = createWhereTemplate(condition);
    const setTemplate = createSetTemplate(updateMap);
    const updateQuery = ` UPDATE ${table} SET ${setTemplate} WHERE ${whereTemplate}`;
    const [row] = await getDB().query(updateQuery);
    return row.affectedRows === 1 ? beforeUpdateData : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateAll = (table, condition, updateMap) => {};

const deleteOne = async (table, options = {}) => {
  const { condition, fields } = options;
  try {
    const beforeDeleteData = await findOne(table, { condition, fields });
    if (!beforeDeleteData) return null;
    const whereTemplate = createWhereTemplate(condition);
    const deleteQuery = `DELETE FROM ${table} WHERE ${whereTemplate};`;
    const [row] = await getDB().query(deleteQuery);
    return row.affectedRows === 1 ? beforeDeleteData : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteAll = (table, condition) => {};

const create = async (table, options = {}) => {
  const { createMap, fields } = options;
  try {
    const keys = [],
      values = [];
    Object.entries(createMap).forEach((item) => {
      const [key, value] = item;
      keys.push(key);
      values.push(convertType(value));
    });
    const createQuery = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${values.join(',')})`;
    const [row] = await getDB().query(createQuery);

    if (row.affectedRows !== 1) return null;
    const createData = await findOne(table, { condition: { id: row.insertId }, fields });
    return createData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const createSetTemplate = (condition) => {
  const setTemplate = Object.entries(condition)
    .map((item) => {
      const [key, value] = item;
      return `${key} = ${convertType(value)}`;
    })
    .join(',');
  return setTemplate;
};

const createWhereTemplate = (condition) => {
  const whereTemplate = Object.entries(condition)
    .map(([field, target]) => {
      if (typeof target !== 'object') {
        return `${field} = ${target}`;
      }

      const [operator, operand] = target;
      if (typeof operand === 'string') return `${field} ${operator} ${convertType(operand)}`;

      return `${field} ${operator} '${operand[0]}' AND '${operand[1]}' `;
    })
    .join(' AND ');

  return whereTemplate;
};

const convertType = (value) => {
  return typeof value === 'string' ? `'${value}'` : value;
};

module.exports = {
  dbtest,
  findAll,
  updateOne,
  deleteOne,
  create,
};
