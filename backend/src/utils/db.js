const getValidDbMap = (model, requestData) => {
  const validMap = Object.entries(requestData).reduce((acc, [key, value]) => {
    if (!key in model) return acc;
    const dbKey = model[key];
    acc[dbKey] = value;
    return acc;
  }, {});
  return validMap;
};

module.exports = { getValidDbMap };
