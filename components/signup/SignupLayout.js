import React from "react";

const Signuplayout = ({ step, children }) => {
  function content() {
    switch (step) {
      case 1:
        return (
          <h1 className="Title_signup">
            SET UP YOUR FREE <br /> TRIAL OF{" "}
            <img src="/img/dexef_logo.svg" alt="logo" className="inline mb-1 mx-2" />
          </h1>
        );
        break;
      case 2:
        return <h1 className="Title_signup">ENTER THE 5-DIGIT CODE FROM YOUR SMS</h1>;
        break;
      case 3:
        return <h1 className="Title_signup">FINISH YOUR SIGN UP HERE</h1>;
        break;
      default:
        break;
    }
  }
  return (
    <div
      className="container row justify-content-between align-items-center"
      style={{ height: "75vh" }}
    >
      <div className="title col">
        <div className="max-w-md">{content()}</div>
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
      <div className="col" style={{ minWidth: 400 }}>
        {children}
      </div>
    </div>
  );
};

export default Signuplayout;
