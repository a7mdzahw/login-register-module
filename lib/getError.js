module.exports = function getError(error, field) {
  if (!error) return null;
  const currentErr = error.details.find((err) => err.path[0] === field);
  return (currentErr && currentErr.message) || null;
};
