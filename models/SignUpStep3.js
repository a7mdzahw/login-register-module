const joi = require("joi");
const local = require("../public/assets/Localization.json");

const validateStep3 = (step3, lang) => {
  const schema = joi.object({
    companyName: joi.string().required().messages({ "string.empty": local.accountInfoErrCompanyName[lang] }),
    workField: joi.number().required().messages({ "number.base": local.accountInfoErrField[lang] }),
    companySize: joi.number().required().messages({ "number.base": local.accountInfoErrCompanySize[lang] }),
    subDomain: joi.string().required().messages({ "string.empty": local.accountInfoErrSubDomin[lang] }),
    email: joi
      .string()
      .required()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .messages({
        "string.empty": local.accountInfoErrEmail[lang],
        "string.pattern.base": local.accountInfoErrEmail[lang],
      }),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        "string.empty": local.accountInfoErrPassword[lang],
        "string.pattern.base": local.accountInfoErrPassword[lang],
      }),
    confirmpassword: joi
      .any()
      .equal(joi.ref("password"))
      .required()
      .messages({ "any.only": local.accountInfoErrConfirmPassword[lang] }),
  });
  return schema.validate(step3, { abortEarly: false });
};

module.exports = validateStep3;
