const express = require("express");

const validate = require("../models/User");
const jwt = require("jsonwebtoken");

const { check } = require("../lib");
const http = require("../lib/http");
const { validate_response } = require("../lib");

module.exports = function (next) {
  const router = express.Router();
  // handling fisrt login rendering and add dexefkey to cookies
  router.post("/LoginRequest", async (req, res) => {
    try {
      const { data } = await http.server.post("/LoginRequest");
      res.send({ token: data.response });
    } catch (error) {
      res.send({ error: error.message });
    }
  });

  // handling login form submittion
  router.post("/login", async (req, res) => {
    if (await check(validate, "/login", req, res, next)) return;
    // calling api
    try {
      const { data } = await http.server.post("/Login", req.body, {
        headers: { dexefForgeryKey: req.cookies.dexefForgeryKey },
      });
      if (await validate_response(data, "/login", req, res, next)) return;
      const user = jwt.decode(data.response.token);
      if (req.body.stayloggedin) {
        res.cookie("token", data.response.token, { maxAge: 1000 * 60 * 60 * 24 * 30 });
      } else {
        res.cookie("token", data.response.token);
      }

      if (!user.email_verified) {
        return res.redirect("/link-sent");
      } else {
        setUserCookie(res, user);
        res.redirect("/");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      return next.render(req, res, "/login", { serverError: (err.response && err.response.data) || err });
    }
  });

  router.post("/ResendEmailVerification", async (req, res) => {
    if (!req.cookies.token) return res.redirect("/login");

    const user = jwt.decode(req.cookies.token);
    let email = user.email;
    const token = req.cookies.token;

    http.server.defaults.headers.Authorization = `Bearer ${token}`;
    http.server.post(`/ResendEmailVerification?Email=${email}`).then(({ data }) => {
      res.redirect("/link-sent");
    });
  });

  router.post("/EmailVerificationCountDown/:id", async (req, res) => {
    let id = req.params.id;
    http.server
      .get("/EmailVerificationCountDown?UserId=" + id)
      .then(({ data }) => {
        res.status(200).send({ time: data.response });
      })
      .catch((err) => res.send({}));
  });

  router.post("/VerifyUserEmail", (req, res) => {
    const EmailToken = req.body.EmailToken;
    http.server.post("/VerifyUserEmail?EmailToken=" + EmailToken).then(({ data }) => {
      res.send(data);
    });
  });

  return router;
};

const setUserCookie = (res, user) => {
  res.cookie("id", user.sub);
  res.cookie("email", user.email);
};
