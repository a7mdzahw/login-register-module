import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Input from "../components/shared/Input";
import getError from "../lib/getError";

const ForgetPassword = ({ error: errObj }) => {
  const { error, body } = JSON.parse(errObj);
  const [data, setData] = useState({ ...body });
  return (
    <div className="forgot-password container pt-8 lg:pt-32">
      <Head>
        <title>Forget Password</title>
      </Head>
      <div className="row">
        <div className="col-xl-5 col-md-6 div-space">
          <div className="forgot-content">
            <h1 className="title fw-bold fs-2">Enter your email & Phone Number</h1>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 ">
          <form className="div-forgot" method="POST" action="/ForgetPasswordRequest">
            <Input
              type="text"
              name="email"
              value={data.email}
              onChange={setData}
              placeholder="type in your mail"
              error={getError(error, "email")}
              label="Email"
            />
            <Link href="/">
              <a className="remembere font-bold mb-2">Remembered Password ?</a>
            </Link>
            <button className="btn Rectangle-608 log-in d-block w-100 ">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  return { props: { error: JSON.stringify(query) } };
}

export default ForgetPassword;
