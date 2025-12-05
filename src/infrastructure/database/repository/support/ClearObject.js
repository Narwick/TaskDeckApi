module.exports = (object) => {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined) delete object[key];
  });
  return object;
};
