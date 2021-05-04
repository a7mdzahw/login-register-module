import React from "react";
import useLang from "../../context/LangContext";

const AccountVerified = () => {
  const { lang, local } = useLang();
  return (
    <div className="accountVerified">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/email_valid_art.svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/email_valid.svg" alt="icon" />
              <h2 className="headTitle">{local.linkVerifiedTitle[lang]}</h2>
              <p className="content">{local.linkVerifiedContent[lang]}</p>
              <a className="btn btn-primary btn-blue btn-resend btn-block" href="/login">
                {local.linkVerifiedBtn[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerified;
