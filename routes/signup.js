const express = require("express");
// error validation fns
const validateStep1 = require("../models/SignUpStep1");
const validateStep2 = require("../models/signUpStep2");
const validateStep3 = require("../models/SignUpStep3");
const { isValidPhoneNumber } = require("libphonenumber-js");
// lib modules
const http = require("../lib/serverHttp");
const check = require("../lib/check");
const checkValidaty = require("../lib/checkValidaty");
const countries = require("../lib/country");

module.exports = function signup(next) {
  const router = express.Router();

  // get routes
  router.get("/signup1", (req, res) => {
    res.redirect("/signup");
  });
  router.get("/signup2", (req, res) => {
    res.redirect("/signup/verify_code");
  });
  router.get("/signup3", (req, res) => {
    res.redirect("/signup/finish");
  });

  // post routes
  // first rendering of signup page
  router.post("/signup", async (req, res) => {
    res.send({ step: req.body.step || 1 });
  });

  // handling step 1 of signup process
  router.post("/signup1", async (req, res) => {
    const country = countries.find((c) => c.code === req.body.countryCode);
    const { error } = validateStep1(req.body, req.cookies.lang);
    const isValid = isValidPhoneNumber(req.body.phone);

    if (!isValid || error) {
      if (!isValid) {
        return next.render(req, res, "/signup", { error, body: req.body, phoneError: true });
      }
      return next.render(req, res, "/signup", { error, body: req.body });
    }
    try {
      const { data } = await http.post("/PreRegisteration", { ...req.body, country: country.name });
      console.log(data);
      if (await checkValidaty(data, "/signup", req, res, next)) return;
      req.session.preRegisterData = req.body;
      req.session.validatePhoneToken = data.response?.verifyPhoneToken;
      res.cookie("validatePhoneToken", data.response?.verifyPhoneToken);
      res.redirect("/signup/verify_code");
    } catch (err) {
      console.log(err.message);
      next.render(req, res, "/signup", { serverError: "Server Error Please Try Later" });
    }
  });

  // handling step 2 of signup process
  router.post("/signup2", async (req, res) => {
    if (await check(validateStep2, "/signup/verify_code", req, res, next)) return;
    try {
      const { data } = await http.post("/VerifyPhoneCode", {
        ...req.body,
        validatePhoneToken: req.session.validatePhoneToken,
      });
      if (await checkValidaty(data, "/signup/verify_code", req, res, next)) return;
      req.session.phoneValidationToken = data.response.phoneValidationToken || "not_activated";
      res.redirect("/signup/finish");
    } catch (err) {
      return next.render(req, res, "/signup/verify_code", { serverError: err });
    }
  });

  router.post("/skip", async (req, res) => {
    req.session.phoneValidationToken = "not_activated";
    res.redirect("/signup/finish");
  });

  // handling step 3 of signup process
  router.post("/signup3", async (req, res) => {
    if (await check(validateStep3, "/signup/finish", req, res, next)) return;
    const { phoneValidationToken, preRegisterData } = req.session;
    http
      .post("/SignUp", {
        ...req.body,
        ...preRegisterData,
        phoneValidationToken: phoneValidationToken,
      })
      .then(async ({ data }) => {
        if (await checkValidaty(data, "/signup/finish", req, res, next)) return;
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

  // get Count Down for current User
  router.get("/PhoneVerificationCountDown/:PhoneToken", async (req, res) => {
    http.get(`/PhoneVerificationCountDown?PhoneToken=${req.params.PhoneToken}`).then(({ data }) => {
      res.send({ time: data.response });
    });
  });

  return router;
};
