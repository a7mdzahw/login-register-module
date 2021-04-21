import React, { useState } from "react";
import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";
import getApiError from "../../lib/getApiError";
import getError from "../../lib/getError";
import useLang from "../../context/LangContext";
import Input from "../shared/Input";

const Step2Form = ({ error, apiErrors, millseconds, serverError }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { lang, local } = useLang();

  const handleButtonState = () => {
    if (typeof window === "undefined") return;
    const input = document.querySelector("#verifyCode");
    return input.value.length < 5 ? setIsDisabled(true) : setIsDisabled(false);
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <a className="btn-timer" disabled={false} href="/signup/finish">
          {local.varifyPhoneBtnSkip[lang]}
        </a>
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
      <form action="/signup2" method="POST" className="w-full">
        <Input
          type="text"
          name="verifyCode"
          onChange={() => handleButtonState()}
          label={local.varifyPhoneVerifyCode[lang]}
          error={getError(error, "verifyCode")}
          apiError={getApiError(apiErrors, "VerifyCode")}
        />
        <Link href="/signup">
          <a className="changeNumber">{local.varifyPhoneChangeNumber[lang]}</a>
        </Link>
        <div className="btn-div">
          <button className="btn-verify btn-blue" disabled={isDisabled}>
            {local.varifyPhoneBtnVerify[lang]}
          </button>
          <Countdown date={Date.now() + millseconds} renderer={renderer} />
        </div>
      </form>
    </>
  );
};

export default Step2Form;
