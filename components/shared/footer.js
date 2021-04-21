import React from "react";

import useLang from "../../context/LangContext";

export default function Footer() {
  const { lang, local } = useLang();
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-12">
            <div className="info">
              <ul className="list-unstyled">
                <li>
                  <a href="#/">
                    <img src="/img/svg/dexef_sympol.svg" alt="dexef" />
                  </a>
                </li>
                <li>
                  <a href="#/">{local.footerContact[lang]}</a>
                </li>
                <li>
                  <a href="#/">{local.footerPrivacy[lang]}</a>
                </li>
                <li>
                  <a href="#/">{local.footerTerms[lang]}</a>
                </li>
                <li>
                  <a href="#/">{local.footerAccessibility[lang]}</a>
                </li>
                <li>
                  <a href="#/">{local.footerCookie[lang]}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-lg-4 col-md-12">
            <div className="copyRight">
              <p>
                © {2021} {local.footerCopyRight[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
