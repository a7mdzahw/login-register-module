const express = require("express");
// error validation fns
const { validate_pre_register, validate_verify_code, validate_account_info } = require("../models/Register");
const { isValidPhoneNumber } = require("libphonenumber-js");
// lib modules
const http = require("../lib/http");
const { check, validate_response } = require("../lib");

const countries = require("../public/assets/countries");

module.exports = function signup(next) {
  const router = express.Router();

  // get routes
  router.get("/pre_register", (req, res) => {
    res.redirect("/signup");
  });
  router.get("/verify_code", (req, res) => {
    res.redirect("/signup/verify_code");
  });
  router.get("/account_info", (req, res) => {
    res.redirect("/signup/finish");
  });

  // get Count Down for current User
  router.get("/PhoneVerificationCountDown/:PhoneToken", async (req, res) => {
    http.server.get(`/PhoneVerificationCountDown?PhoneToken=${req.params.PhoneToken}`).then(({ data }) => {
      console.log(data);
      res.send({ time: data.response });
    });
  });

  // post routes
  // first rendering of signup page
  router.post("/signup", async (req, res) => {
    res.send({ step: req.body.step || 1 });
  });

  // handling step 1 of signup process
  router.post("/pre_register", async (req, res) => {
    const country = countries.find((c) => c.code === req.body.countryCode);
    const { error } = validate_pre_register(req.body, req.cookies.lang);
    const isValid = isValidPhoneNumber(req.body.phone);

    if (!isValid || error) {
      if (!isValid) {
        return next.render(req, res, "/signup", { error, body: req.body, phoneError: true });
      }
      return next.render(req, res, "/signup", { error, body: req.body });
    }
    try {
      const { data } = await http.server.post("/PreRegisteration", { ...req.body, country: country.name });
      if (await validate_response(data, "/signup", req, res, next)) return;
      req.session.preRegisterData = req.body;
      req.session.validatePhoneToken = data.response?.verifyPhoneToken || "server_down";
      res.cookie("validatePhoneToken", data.response?.verifyPhoneToken);
      res.redirect("/signup/verify_code");
    } catch (err) {
      console.log("signup", err);
      next.render(req, res, "/signup", { serverError: "Server Error Please Try Later" });
    }
  });

  // handling step 2 of signup process
  router.post("/verify_code", async (req, res) => {
    if (await check(validate_verify_code, "/signup/verify_code", req, res, next)) return;
    try {
      const { data } = await http.server.post("/VerifyPhoneCode", {
        ...req.body,
        validatePhoneToken: req.session.validatePhoneToken,
      });
      if (await validate_response(data, "/signup/verify_code", req, res, next)) return;
      req.session.phoneValidationToken = data.response.phoneValidationToken || "not_activated";
      res.redirect("/signup/finish");
    } catch (err) {
      return next.render(req, res, "/signup/verify_code", { serverError: err });
    }
  });

  // if user skips phone verfication
  router.get("/skip", async (req, res) => {
    req.session.phoneValidationToken = "not_activated";
    res.redirect("/signup/finish");
  });

  // handling step 3 of signup process
  router.post("/account_info", async (req, res) => {
    if (await check(validate_account_info, "/signup/finish", req, res, next)) return;
    const { phoneValidationToken, preRegisterData } = req.session;
    http.server
      .post("/SignUp", {
        ...req.body,
        ...preRegisterData,
        phoneValidationToken: phoneValidationToken,
      })
      .then(async ({ data }) => {
        if (await validate_response(data, "/signup/finish", req, res, next)) return;
        res.clearCookie("countDown");
        res.cookie("token", data.response);
        res.redirect("/link-sent");
      })
      .catch((err) => {
        next.render(req, res, "/signup/finish", {
          serverError: err.response?.data || err.message || err,
        });
      });
  });

  return router;
};
