const express = require("express");
const router = express.Router();

module.exports = function (next) {
  router.post("/ForgetPasswordRequest", async (req, res) => {
    const email = req.body.email;
    try {
      const { data } = http.post("/ForgetPasswordRequest", { email });
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
