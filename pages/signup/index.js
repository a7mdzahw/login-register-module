import React from "react";
import Head from "next/head";

import * as http from "lib/http";

import Signuplayout from "@Components/signup/SignupLayout";
import PreRegisterationForm from "@Components/signup/PreRegisterationForm";

const Signup = ({ step, error, js }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="signUp">
      <Head>
        <title>Sign Up</title>
      </Head>

      <Signuplayout step={step}>
        {errObj.serverError && <div className="alert alert-danger">{errObj.serverError}</div>}
        <PreRegisterationForm
          error={errObj.error}
          body={errObj.body}
          apiErrors={errObj.apiErrors}
          phoneError={errObj.phoneError}
          js={js}
        />
      </Signuplayout>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  // checking login state and redirect if logged in
  if (req.cookies.token) return { redirect: { destination: "/", fallback: "blocking" } };
  // if (req.cookies.phoneValidationToken) return { redirect: { destination: "/signup/finish", fallback: "blocking" } };
  // fetching current step from server
  try {
    const { data } = await http.client.post("/signup");
    return {
      props: {
        step: query.step || data.step,
        error: JSON.stringify(query),
        js: query.js || "true",
        authState: "signup",
      },
    };
  } catch (err) {
    return {
      props: { step: query.step, error: JSON.stringify(query), js: query.js || "true", authState: "signup" },
    };
  }
};

export default Signup;
