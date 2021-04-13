const joi = require("joi");

const validateStep3 = (step3) => {
  const schema = joi.object({
    companyName: joi.string().required().min(3),
    workField: joi.number().required(),
    companySize: joi.number().required(),
    subDomain: joi.string().required(),
    email: joi.string().email(),
    password: joi
      .string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .rule({
        message: "Password must be at least 8 charachter with one Captial and one special character",
      }),
    confirmpassword: joi.any().equal(joi.ref("password")).required().messages({ "any.only": "passwords didn't match" }),
  });
  return schema.validate(step3, { abortEarly: false });
};

module.exports = validateStep3;
