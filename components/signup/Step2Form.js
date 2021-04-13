import React from "react";
import Link from "next/link";
import getApiError from "../../lib/getApiError";
import getError from "../../lib/getError";

import Input from "../shared/Input";
import Countdown, { zeroPad } from "react-countdown";

const Step2Form = ({ error, apiErrors, millseconds }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <a className="btn-timer btn-blue" disabled={false} href="/signup/finish">
          skip
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
      <form action="/signup2" method="POST">
        <Input
          type="text"
          name="verifyCode"
          label="Verfiy Code"
          error={getError(error, "verifyCode")}
          apiError={getApiError(apiErrors, "VerifyCode")}
        />
        <div className="row align-items-center ms-1">
          <button className="btn Rectangle-608 log-in col-8">Verify</button>
          <div className="col-4">
            <Countdown date={Date.now() + millseconds} renderer={renderer} />
          </div>
        </div>
      </form>

      <Link href="/signup/finish">
        <a className="btn btn-primary mt-4">Skip</a>
      </Link>
    </>
  );
};

export default Step2Form;
