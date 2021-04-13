import React from "react";
import Head from "next/head";
import Signuplayout from "../../components/signup/SignupLayout";
import Step3Form from "../../components/signup/Step3Form";

import http from "../../lib/clientHttp";

const Signup = ({ step, error }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="container">
      <Head>
        <title>SignUp Finish</title>
      </Head>
      <div className="container d-flex justify-content-around align-items-center" style={{ height: "75vh" }}>
        <Signuplayout step={step}>
          {errObj.serverError && errObj.serverError.title}
          <Step3Form error={errObj.error} body={errObj.body} apiErrors={errObj.apiErrors} />
        </Signuplayout>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  // setting sign up step to step 3
  const { data } = await http.post("/signup", { step: 3 });
  return { props: { step: query.step || data.step, error: JSON.stringify(query) } };
};

export default Signup;
