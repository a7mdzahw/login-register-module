import React from "react";
import Head from "next/head";

import Signuplayout from "@Components/signup/SignupLayout";
import VerifyCodeForm from "@Components/signup/VerifyCodeForm";

import * as http from "lib/http";

const Signup = ({ step, error, timeRemaining }) => {
  const errObj = JSON.parse(error);
  const millseconds = timeRemaining * 60 * 1000 - 1000;
  return (
    <div className="signUp">
      <Head>
        <title>Verify Code</title>
      </Head>
      <div className="row">
        <Signuplayout step={step}>
          <VerifyCodeForm
            error={errObj.error}
            body={errObj.body}
            apiErrors={errObj.apiErrors}
            millseconds={millseconds}
            serverError={errObj.serverError}
          />
        </Signuplayout>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  if (req.cookies.phoneValidationToken) return { redirect: { destination: "/signup/finish", fallback: "blocking" } };

  const response = await http.client.get(`/PhoneVerificationCountDown/${req.cookies.validatePhoneToken}`);
  const { data } = await http.client.post("/signup", { step: 2 });

  return {
    props: {
      timeRemaining: response.data.time,
      step: query.step || data.step,
      error: JSON.stringify(query),
      authState: "signup",
    },
  };
};

export default Signup;
