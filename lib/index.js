async function check(validationFn, path, req, res, next) {
  const { error } = validationFn(req.body, req.cookies.lang);
  if (error) {
    next.render(req, res, path, { error, body: req.body });
    return true;
  }
  return false;
}

async function validate_response(data, path, req, res, next) {
  const { code } = data.state;
  if (code === "Status-System-1013") return false;
  const errors = data.errors;
  if (!errors.length > 0) return false;
  next.render(req, res, path, { apiErrors: errors, body: req.body });
  return true;
}

function client_error(error, field) {
  if (!error) return null;
  const currentErr = error.details.find((err) => err.path[0] === field);
  return (currentErr && currentErr.message) || null;
}

function api_error(apiErrors, field) {
  if (!apiErrors) return;
  return apiErrors.filter((err) => err.fields.includes(field));
}

module.exports = {
  check,
  validate_response,
  client_error,
  api_error,
};
