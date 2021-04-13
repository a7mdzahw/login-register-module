module.exports = function (apiErrors, field) {
  if (!apiErrors) return;
  return apiErrors.filter((err) => err.fields.includes(field));
};
