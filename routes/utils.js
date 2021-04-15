const express = require("express");
const router = express.Router();
const Joi = require("joi");

const http = require("../lib/serverHttp");
const check = require("../lib/check");
const checkValidaty = require("../lib/checkValidaty");
const validatePassword = require("../models/Password");

module.exports = function (next) {
  router.get("/ForgetPasswordRequest", (req, res) => res.redirect("/forget-password"));

  router.post("/ForgetPasswordRequest", async (req, res) => {
    const email = req.body.email || req.session.email;
    if (!req.session.email) {
      if (await checkEmail(email, req, res, next)) return;
    }
    await forget_password_request(email, req, res, next);
  });

  router.post("/ChangePassword/:token", async (req, res) => {
    const token = req.params.token;
    console.log(req.body);
    if (await check(validatePassword, `/changepassword/${token}`, req, res, next)) return;

    let reSetpasswordObj = {
      resetToken: token,
      newPassword: req.body.password,
    };

    const { data } = await http.post("/ForgetPassword", reSetpasswordObj);
    if (await checkValidaty(data, `/changepassword/${token}`, req, res, next)) return;
    res.redirect("/password_reset_success");
  });

  return router;
};

const checkEmail = async (email, req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate({ email });
  if (error) {
    next.render(req, res, "/forget-password", { error, body: { email } });
    return true;
  } else {
    return false;
  }
};

const forget_password_request = async (email, req, res, next) => {
  try {
    const { data } = await http.post("/ForgetPasswordRequest", { email });
    if (await checkValidaty(data, "/forget-password", req, res, next)) return;
    req.session.email = email;
    res.cookie("resetPassword_ID", data.response);
    res.redirect("/link-sent-password");
  } catch (err) {
    console.log(err.message);
    res.send({ err, status: "invalid_email" });
  }
};
