const joi = require("joi");

module.exports = function validatePassword(passwords) {
  const schema = joi.object({
    password: joi
      .string()
      .label("Password")
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .rule({
        message: "Password must be at least 8 charachter, Captial ,special character",
      }),
    confirmPassword: joi
      .any()
      .equal(joi.ref("password"))
      .required()
      .messages({ "any.only": "passwords didn't match" }),
  });

  return schema.validate(passwords, { abortEarly: false });
};
