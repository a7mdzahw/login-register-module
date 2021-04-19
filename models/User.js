const joi = require("joi");
const local = require("../public/assets/Localization.json");

const validate = (user, lang) => {
  const schema = joi.object({
    userName: joi
      .string()
      .required()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .messages({ "string.empty": local.loginErrEmail[lang], "string.pattern.base": local.loginErrEmail[lang] }),
    password: joi
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({ "string.empty": local.loginErrPassword[lang], "string.pattern.base": local.loginErrPassword[lang] }),
    stayloggedin: joi.string(),
  });
  return schema.validate(user, { abortEarly: false });
};

module.exports = validate;
