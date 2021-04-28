import React, { useState } from "react";
import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";
import { client_error, api_error } from "lib";
import useLang from "../../context/LangContext";
import Input from "../shared/Input";

const VerifyCodeForm = ({ error, apiErrors, millseconds, serverError }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialTime, setInitialTime] = useState(millseconds);
  const { lang, local } = useLang();

  const handleButtonState = () => {
    const input = document.querySelector("#verifyCode");
    return input.value.length < 5 ? setIsDisabled(true) : setIsDisabled(false);
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setInitialTime(0);
      return (
        // <form action="/skip" method="POST" className="d-flex align-items-center w-100">
        <a
          className="btn-blue px-2 pt-2 text-decoration-none"
          disabled={false}
          href="/skip"
          style={{ width: "30%", textAlign: "center" }}
        >
          {local.varifyPhoneBtnSkip[lang]}
        </a>
        // </form>
      );
    } else {
      // Render a countdown
      return (
        <>
          <div className="fs-3 text-muted text-right">
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </div>
        </>
      );
    }
  };
  return (
    <>
      {serverError && <div className="text-red-500">{serverError}</div>}
      <form action="/verify_code" method="POST" className="w-full">
        <Input
          type="text"
          name="verifyCode"
          onChange={() => handleButtonState()}
          label={local.varifyPhoneVerifyCode[lang]}
          error={client_error(error, "verifyCode")}
          apiError={api_error(apiErrors, "VerifyCode")}
        />
        <Link href="/signup">
          <a className="changeNumber">{local.varifyPhoneChangeNumber[lang]}</a>
        </Link>
        <div className="btn-div">
          <button className="btn-verify btn-blue" disabled={isDisabled}>
            {local.varifyPhoneBtnVerify[lang]}
          </button>
          <Countdown date={Date.now() + initialTime} renderer={renderer} />
        </div>
      </form>
    </>
  );
};

export default VerifyCodeForm;
