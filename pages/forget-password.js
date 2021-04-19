import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Input from "../components/shared/Input";
import getError from "../lib/getError";
import getApiError from "../lib/getApiError";
import useLang from "../context/LangContext";

const ForgetPassword = ({ error: errObj }) => {
  const { lang, local } = useLang();
  const { error, body, apiErrors, serverError } = JSON.parse(errObj);
  const [data, setData] = useState({ ...body });
  return (
    <div className="container">
      <Head>
        <title>Forget Password</title>
      </Head>
      <div className="lg:flex space-y-2 pt-8 lg:pt-32 mx-auto justify-between items-center">
        <div className="forgot-content">
          <h1 className="title fw-bold fs-2">{local.forgotHeadTitle[lang]}</h1>
        </div>

        <div className="lg:w-1/2">
          {serverError && <div className="text-danger">Server Error, try later</div>}
          <form className="div-forgot" method="POST" action="/ForgetPasswordRequest">
            <Input
              type="text"
              name="email"
              label={local.forgotEmail[lang]}
              value={data.email}
              onChange={setData}
              placeholder={local.forgotEmailPlacHolder[lang]}
              error={getError(error, "email")}
              apiError={getApiError(apiErrors, "Email")}
            />
            <Link href="/">
              <a className="remembere font-bold mb-2">{local.forgotRemembered[lang]}</a>
            </Link>
            <button className="btn Rectangle-608 log-in d-block w-100 ">{local.forgotContinue[lang]}</button>
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
