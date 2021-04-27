import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import Input from "@Components/shared/Input";
import { client_error, api_error } from "lib";
import useLang from "../context/LangContext";

const ForgetPassword = ({ error: errObj }) => {
  const { lang, local } = useLang();
  const { error, body, apiErrors, serverError } = JSON.parse(errObj);
  const [data, setData] = useState({ ...body });
  return (
    <div className="forgot-password">
      <Head>
        <title>Forget Password</title>
      </Head>
      <div className="row">
        <div className="col-xl-5 col-md-6 div-space">
          <div className="forgot-content">
            <h1 className="title">{local.forgotHeadTitle[lang]}</h1>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          {serverError && <div className="text-danger">Server Error, try later</div>}
          <form className="div-forgot" method="POST" action="/ForgetPasswordRequest">
            <Input
              type="text"
              name="email"
              label={local.forgotEmail[lang]}
              value={data.email}
              onChange={setData}
              placeholder={local.forgotEmailPlacHolder[lang]}
              error={client_error(error, "email")}
              apiError={api_error(apiErrors, "Email")}
            />
            <Link href="/">
              <a className="remembere">{local.forgotRemembered[lang]}</a>
            </Link>
            <button className="btn-block btn-continue btn-blue d-block w-100">{local.forgotContinue[lang]}</button>
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
