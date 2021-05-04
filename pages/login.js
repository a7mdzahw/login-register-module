import React from "react";
import Head from "next/head";

import LoginForm from "@Components/login/LoginForm";
import * as http from "lib/http";
import local from "../public/assets/Localization.json";
import useLang from "../context/LangContext";

const Login = ({ error }) => {
  const errObj = JSON.parse(error);
  const { lang } = useLang();

  return (
    <div className="login">
      <Head>
        <title>Login</title>
      </Head>

      <div className="row">
        <div className="col-xl-5 col-md-6 div-space">
          <div className="login-content">
            <h1 className="title">
              {local.loginHedTitle[lang]}
              <img className="dexef" src="/img/svg/dexef_logo.svg" alt="dexef" style={{ height: 45 }} />{" "}
            </h1>
          </div>
        </div>
        <div className="col-xl-4 col-md-6">
          {errObj.serverError && <p className="alert alert-danger">{errObj.serverError}</p>}
          <LoginForm error={errObj.error} body={errObj.body} apiErrors={errObj.apiErrors} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  // checking user login state
  if (req.cookies.token) {
    return {
      redirect: {
        destination: "/",
        fallback: "blocking",
      },
    };
  }

  if (req.cookies.dexefForgeryKey && req.cookies.dexefForgeryKey !== "undefined")
    return { props: { error: JSON.stringify(query), authState: "login" } };
  // fetching dexefkey on first render
  try {
    const { data } = await http.client.post("/LoginRequest");
    res.cookie("dexefForgeryKey", data.token);
    return { props: { error: JSON.stringify(query), authState: "login" } };
  } catch {
    return { props: { error: JSON.stringify(query), authState: "login" } };
  }
};

export default Login;
