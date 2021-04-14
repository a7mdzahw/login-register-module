const express = require("express");
const router = express.Router();
const http = require("../lib/serverHttp");
const checkValidaty = require("../lib/checkValidaty");
const Joi = require("joi");

module.exports = function (next) {
  router.post("/ForgetPasswordRequest", async (req, res) => {
    const email = req.body.email || req.session.email;
    console.log(email);
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    const { error } = schema.validate({ email });
    if (error) {
      console.log(error);
      return next.render(req, res, "/forget-password", { error, body: { email } });
    }
    try {
      const { data } = http.post("/ForgetPasswordRequest", { email });
      if (await checkValidaty(data, "/forget-password", req, res, next)) return;
      req.session.email = email;
      req.session.resetPassword_ID = data.response;

      this.props.history.push("/link_sent_forgetPassword");
      res.redirect("/link-sent-password");
    } catch (err) {
      console.log(err.message);
      res.send({ err, status: "invalid_email" });
    }
  });

  return router;
};
