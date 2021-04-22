import React from "react";
import useLang from "../../context/LangContext";

const Signuplayout = ({ step, children }) => {
  const { lang, local } = useLang();
  function content() {
    switch (step) {
      case 1:
        return (
          <h1 className="title">
            {local.signupTitle[lang]}{" "}
            <img src="/img/dexef_logo.svg" style={{ height: 45 }} alt="logo" className="inline mb-1 mx-2" />
          </h1>
        );
        break;
      case 2:
        return <h1 className="title">{local.varifyPhoneTitle[lang]}</h1>;
        break;
      case 3:
        return <h1 className="title">{local.accountInfoTitle[lang]}</h1>;
        break;
      default:
        break;
    }
  }
  return (
    <div className="row">
      <div className="col-xl-5 col-md-6 div-space">
        <div className="signUp-content">
          {content()}
          <div className="steps">
            {step === 1 && (
              <>
                <span className="line active">1</span>
                <span className="line">2</span>
                <span>3</span>
              </>
            )}
            {step === 2 && (
              <>
                <span className="line done">1</span>
                <span className="line active">2</span>
                <span>3</span>
              </>
            )}
            {step === 3 && (
              <>
                <span className="line done">1</span>
                <span className="line done">2</span>
                <span className="active">3</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">{children}</div>
    </div>
  );
};

export default Signuplayout;
