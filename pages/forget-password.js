import React from "react";
import Link from "next/link";
import Input from "../components/shared/Input";
import getError from "../lib/getError";

const ForgetPassword = ({ error }) => {
  const errObj = JSON.parse(error);
  return (
    <div className="forgot-password container">
      <div className="row">
        <div className="col-xl-5 col-md-6 div-space">
          <div className="forgot-content">
            <h1 className="title fw-bold fs-2">Enter your email & Phone Number</h1>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 ">
          <form className="div-forgot" method="POST" action="/ForgetPasswordRequest">
            <Input type="text" name="email" placeholder="type in your mail" label="Email" />
            {getError(errObj.error, "email") && (
              <div className="text-red-400">{getError(errObj.error, "email")}</div>
            )}
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
