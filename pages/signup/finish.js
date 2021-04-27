import React from "react";
import Head from "next/head";
import Signuplayout from "@Components/signup/SignupLayout";
import AccountInfoForm from "@Components/signup/AccountInfoForm";

import * as http from "lib/http";

const Signup = ({ step, error, workfields, companySizeData }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="signUp">
      <Head>
        <title>SignUp Finish</title>
      </Head>
      <div className="row">
        <Signuplayout step={step}>
          {errObj.serverError && <div className="alert alert-danger">{errObj.serverError}</div>}
          <AccountInfoForm
            error={errObj.error}
            body={errObj.body}
            apiErrors={errObj.apiErrors}
            workfields={workfields}
            companySizeData={companySizeData}
          />
        </Signuplayout>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  try {
    const {
      data: { response: workfields },
    } = await http.company.get("/CompanyWorkField/GetAll");
    const {
      data: { response: companySizeData },
    } = await http.company.get("/CompanySize/GetAll");
    const { data: data2 } = await http.client.post("/signup", { step: 3 });
    return {
      props: {
        step: query.step || data2.step,
        workfields,
        companySizeData,
        error: JSON.stringify(query),
        authState: "signup",
      },
    };
  } catch (err) {
    console.log(err.message);
    return { props: { step: query.step || 1, error: JSON.stringify(query), authState: "signup" } };
  }
  // setting sign up step to step 3
};

export default Signup;
