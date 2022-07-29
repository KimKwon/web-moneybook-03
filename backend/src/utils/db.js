const getValidDbMap = (model, requestData) => {
  const validMap = Object.entries(requestData).reduce((acc, [key, value]) => {
    if (!(key in model)) return acc;
    const dbKey = model[key];
    acc[dbKey] = value;
    return acc;
  }, {});
  return validMap;
};

const getDbFields = (model) => {
  const fields = Object.entries(model).reduce((acc, [key, dbKey]) => {
    acc.push(`${dbKey} as ${key}`);
    return acc;
  }, []);
  return fields;
};
module.exports = { getValidDbMap, getDbFields };
