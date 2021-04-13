const joi = require("joi");

const validateStep1 = (step1) => {
  const schema = joi.object({
    fullName: joi.string().required().min(3).label("Full Name"),
    countryCode: joi.string().required().label("Country Code"),
    phone: joi.string().required(),
  });
  return schema.validate(step1, { abortEarly: false });
};

module.exports = validateStep1;
