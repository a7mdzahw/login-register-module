const joi = require("joi");

const validateStep2 = (step2) => {
  const schema = joi.object({
    verifyCode: joi.string().required().min(4),
  });
  return schema.validate(step2, { abortEarly: false });
};

module.exports = validateStep2;
