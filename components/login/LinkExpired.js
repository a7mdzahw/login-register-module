import React from "react";
import useLang from "../../context/LangContext";

const LinkExpired = () => {
  const { lang, local } = useLang();
  return (
    <div className="linkexpired">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="background">
              <img src="/img/link_expired_art.svg" alt="background" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="boxLinkSent text-center">
              <img src="/img/link_expired.svg" alt="icon" />
              <h2 className="headTitle">{local.linkExpiredTitle[lang]}</h2>
              <p className="content">{local.linkExpiredContent[lang]}</p>
              <form action="/ResendEmailVerification" method="POST">
                <button className="btn btn-primary d-block w-100 btn-blue btn-resend btn-block">
                  {local.linkExpiredBtn[lang]}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkExpired;
