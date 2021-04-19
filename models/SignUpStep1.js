const joi = require("joi");
const local = require("../public/assets/Localization.json");

const validateStep1 = (step1, lang) => {
  const schema = joi.object({
    fullName: joi.string().required().messages({ "string.empty": local.signupErrFullName[lang] }),
    countryCode: joi.string().required().messages({ "string.empty": local.signupErrCountry[lang] }),
    phone: joi.string(),
  });
  return schema.validate(step1, { abortEarly: false });
};

module.exports = validateStep1;
