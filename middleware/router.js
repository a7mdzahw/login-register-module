module.exports = function (req, res, next) {
  switch (req.path) {
    case "/signup/verify_code":
      if (req.session.validatePhoneToken) return next();
      res.redirect("/signup");
      break;
    case "/signup/finish":
      if (req.cookies.phoneValidationToken) return next();
      res.redirect("/signup");
    default:
      next();
  }
};
