module.exports = async function (data, path, req, res, next) {
  const { code } = data.state;
  if (code === "Status-System-1013") return false;
  const errors = data.errors;
  console.log(errors);
  if (!errors.length > 0) return false;
  next.render(req, res, path, { apiErrors: errors, body: req.body });
  return true;
};
