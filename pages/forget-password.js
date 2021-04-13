import React from "react";
import Link from "next/link";
import Input from "../components/shared/Input";

const ForgetPassword = () => {
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
            <Link href="/">
              <a className="remembere">Remembered Password ?</a>
            </Link>
            <button className="btn Rectangle-608 log-in d-block w-100 ">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
