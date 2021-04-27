const joi = require("joi");
const local = require("../public/assets/Localization.json");

const validate_pre_register = (pre_register_data, lang) => {
  const schema = joi.object({
    fullName: joi.string().required().messages({ "string.empty": local.signupErrFullName[lang] }),
    countryCode: joi.string().required().messages({ "string.empty": local.signupErrCountry[lang] }),
    phone: joi.string(),
  });
  return schema.validate(pre_register_data, { abortEarly: false });
};

const validate_verify_code = (verify_code) => {
  const schema = joi.object({
    verifyCode: joi.string().required().min(5),
  });
  return schema.validate(verify_code, { abortEarly: false });
};

const validate_account_info = (account_info, lang) => {
  const schema = joi.object({
    companyName: joi.string().required().messages({ "string.empty": local.accountInfoErrCompanyName[lang] }),
    workField: joi
      .number()
      .required()
      .messages({ "number.base": local.accountInfoErrField[lang], "any.required": local.accountInfoErrField[lang] }),
    companySize: joi.number().required().messages({
      "number.base": local.accountInfoErrCompanySize[lang],
      "any.required": local.accountInfoErrCompanySize[lang],
    }),
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
  return schema.validate(account_info, { abortEarly: false });
};

module.exports = { validate_pre_register, validate_verify_code, validate_account_info };
