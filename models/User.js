const joi = require("joi");

const validate = (user) => {
  const schema = joi.object({
    userName: joi.string().email().required().label("Email"),
    password: joi
      .string()
      .label("Password")
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .rule({
        message: "Password must be at least 8 charachter, Captial ,special character",
      }),
    stayloggedin: joi.string(),
  });
  return schema.validate(user, { abortEarly: false });
};

module.exports = validate;
