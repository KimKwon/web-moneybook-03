const mysql = require('mysql2');
const config = require('../config');

let pool;

const getDB = () => {
  if (!pool) {
    throw new Error('Must call after initDatabase()');
  }
  return pool.promise();
};

const initDatabase = () => {
  if (pool) {
    throw new Error('Database already initialized');
  }
  console.log('Database is Connected.');
  pool = mysql.createPool({
    ...config.mysql,
  });
};

module.exports = { getDB, initDatabase };
