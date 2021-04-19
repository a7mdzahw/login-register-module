module.exports = async function (validationFn, path, req, res, next) {
  const { error } = validationFn(req.body, req.cookies.lang);

  if (error) {
    next.render(req, res, path, { error, body: req.body });
    return true;
  }
  return false;
};
