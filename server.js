const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const next = require("next");
const router = require("./middleware/router");
const url = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const auth = require("./routes/auth");
const signup = require("./routes/signup");
const utils = require("./routes/utils");

app
  .prepare()
  .then(() => {
    const server = express();
    // middlewares
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(
      expressSession({
        secret: "fornow",
        resave: false,
        saveUninitialized: false,
      })
    );
    // static files
    server.get(/\.(png|svg)$/, express.static("./public/img"));
    // auth routes
    server.use("/", auth(app));
    server.use("/", signup(app));
    server.use("/", utils(app));
    // next pages
    server.get("*", router, (req, res) => {
      const lang = req.cookies.lang;
      if (!lang) res.cookie("lang", "en");
      return handle(req, res);
    });
    // server listening
    server.listen(process.env.PORT || 3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
