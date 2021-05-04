const joi = require("joi");
const local = require("../public/assets/Localization.json");

module.exports = function validatePassword(passwords, lang) {
  const schema = joi.object({
    password: joi
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.empty": local.changePasswordErrPassword[lang],
        "string.pattern.base": local.changePasswordErrPassword[lang],
      }),
    confirmPassword: joi
      .any()
      .equal(joi.ref("password"))
      .required()
      .messages({ "any.only": local.changePasswordErrConfirmPassword[lang] }),
  });

  return schema.validate(passwords, { abortEarly: false });
};
