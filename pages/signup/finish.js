import React from "react";
import Head from "next/head";
import Signuplayout from "../../components/signup/SignupLayout";
import Step3Form from "../../components/signup/Step3Form";

import http from "../../lib/clientHttp";
import companyHttp from "../../lib/companyHttp";

const Signup = ({ step, error, workfields, companySizeData }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="signUp">
      <Head>
        <title>SignUp Finish</title>
      </Head>
      <div className="row">
        <Signuplayout step={step}>
          {errObj.serverError && errObj.serverError.title}
          <Step3Form
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
    } = await companyHttp.get("http://192.168.1.7:5091/api/CompanyWorkField/GetAll");
    const {
      data: { response: companySizeData },
    } = await companyHttp.get("http://192.168.1.7:5091/api/CompanySize/GetAll");
    const { data: data2 } = await http.post("/signup", { step: 3 });
    return {
      props: {
        step: query.step || data2.step,
        workfields,
        companySizeData,
        error: JSON.stringify(query),
      },
    };
  } catch (err) {
    console.log(err.message);
    return { props: { step: query.step || 1, error: JSON.stringify(query) } };
  }
  // setting sign up step to step 3
};

export default Signup;
