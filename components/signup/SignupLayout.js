import React from "react";
import useLang from "../../context/LangContext";

const Signuplayout = ({ step, children }) => {
  const { lang, local } = useLang();
  function content() {
    switch (step) {
      case 1:
        return (
          <h1 className="Title_signup font-bold text-gray-700">
            {local.signupTitle[lang]} <img src="/img/dexef_logo.svg" alt="logo" className="inline mb-1 mx-2" />
          </h1>
        );
        break;
      case 2:
        return <h1 className="Title_signup font-bold text-gray-700">{local.varifyPhoneTitle[lang]}</h1>;
        break;
      case 3:
        return <h1 className="Title_signup font-bold text-gray-700">{local.accountInfoTitle[lang]}</h1>;
        break;
      default:
        break;
    }
  }
  return (
    <div className="lg:flex justify-between items-center pt-8 lg:pt-24 w-full">
      <div className="title lg:w-1/2">
        <div className="lg:max-w-lg">
          {content()}
          <ul className="nav nav-pills d-flex gap-5 mt-3">
            <li className="nav-item">
              <a className={step === 1 ? " Rectangle-700 log-in" : "step"} aria-current="page">
                1
              </a>
            </li>
            <li className="nav-item">
              <a className={step === 2 ? " Rectangle-700 log-in" : "step"} aria-current="page">
                2
              </a>
            </li>
            <li className="nav-item">
              <a className={step === 3 ? " Rectangle-700 log-in" : "step"} aria-current="page">
                3
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:w-1/2">{children}</div>
    </div>
  );
};

export default Signuplayout;
