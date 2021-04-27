const express = require("express");
const router = express.Router();
const Joi = require("joi");
const local = require("../public/assets/Localization.json");

const http = require("../lib/http");
const { check } = require("../lib");
const validate_response = require("../lib");
const validatePassword = require("../models/Password");

module.exports = function (next) {
  router.get("/ForgetPasswordRequest", (req, res) => res.redirect("/forget-password"));

  router.get("/closeJSPopup", (req, res) => {
    const redirectPath = req.query.redirect;
    res.cookie("js", false);
    return res.redirect(redirectPath);
  });

  router.post("/changeLang", (req, res) => {
    const redirectPath = req.body.redirect;
    res.cookie("lang", req.body.language);
    res.redirect(redirectPath);
  });

  router.post("/ForgetPasswordRequest", async (req, res) => {
    const email = req.body.email || req.session.email;
    if (!req.session.email) {
      if (await checkEmail(email, req, res, next)) return;
    }
    await forget_password_request(email, req, res, next);
  });

  router.post("/ChangePassword/:token", async (req, res) => {
    const token = req.params.token;
    if (await check(validatePassword, `/changepassword/${token}`, req, res, next)) return;

    let reSetpasswordObj = {
      resetToken: token,
      newPassword: req.body.password,
    };
    try {
      const { data } = await http.server.post("/ForgetPassword", reSetpasswordObj);
      if (await validate_response(data, `/changepassword/${token}`, req, res, next)) return;
      res.redirect("/password-reset-success");
    } catch (error) {
      console.log(error);
      res.redirect("/error");
    }
  });

  return router;
};

const checkEmail = async (email, req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .messages({
        "any.required": local.forgotErrEmail[req.cookies.lang],
        "string.pattern.base": local.forgotErrEmail[req.cookies.lang],
      }),
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
    const { data } = await http.server.post("/ForgetPasswordRequest", { email });
    if (await validate_response(data, "/forget-password", req, res, next)) return;
    req.session.email = email;
    res.cookie("resetPassword_ID", data.response);
    res.redirect("/link-sent-password");
  } catch (err) {
    console.log(err.message);
    return next.render(req, res, "/forget-password", { serverError: err.response?.data || err.message });
  }
};
