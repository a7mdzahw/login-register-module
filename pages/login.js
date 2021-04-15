import React from "react";
import Head from "next/head";

import LoginForm from "../components/login/LoginForm";
import http from "../lib/clientHttp";

const Login = ({ error }) => {
  const errObj = JSON.parse(error);

  return (
    <div className="container h-96">
      <Head>
        <title>Login</title>
      </Head>
      <div className="container lg:flex justify-between pt-8 items-center lg:pt-32">
        <h1 className="fw-bold Title_signup">
          SET UP YOUR FREE <br /> TRIAL OF{" "}
          <img
            src="/img/dexef_logo.svg"
            alt="logo"
            height="40px"
            className="inline-block"
            style={{ paddingBottom: 10 }}
          />
        </h1>
        <div>
          {errObj.serverError && (
            <p className="alert alert-danger">Server Error Try Again Later</p>
          )}
          <LoginForm
            error={errObj.error}
            body={errObj.body}
            apiErrors={errObj.apiErrors}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  // checking user login state
  if (req.cookies.email) {
    return {
      redirect: {
        destination: "/",
        fallback: "blocking",
      },
    };
  }

  if (req.cookies.dexefForgeryKey) return { props: { error: JSON.stringify(query) } };
  // fetching dexefkey on first render
  try {
    const { data } = await http.post("/LoginRequest");
    res.cookie("dexefForgeryKey", data.token);
    return { props: { error: JSON.stringify(query) } };
  } catch {
    return { props: { error: JSON.stringify(query) } };
  }
};

export default Login;
