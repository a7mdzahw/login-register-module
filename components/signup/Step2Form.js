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
        <a className="btn-timer text-blue-600" disabled={false} href="/signup/finish">
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
        <div className="flex space-x-12 justify-between items-center">
          <button className="btn Rectangle-608 log-in col-8" disabled={isDisabled}>
            {local.varifyPhoneBtnVerify[lang]}
          </button>
          <Countdown date={Date.now() + millseconds} renderer={renderer} />
        </div>
      </form>

      {/* to be removed */}
      <Link href="/signup/finish">
        <a className="btn btn-primary mt-4">Skip</a>
      </Link>
    </>
  );
};

export default Step2Form;
