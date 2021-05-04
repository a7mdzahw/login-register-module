import React from "react";
import Link from "next/link";
import useLang from "../../context/LangContext";

const PasswordSuccess = () => {
  const { lang, local } = useLang();
  return (
    <div>
      <div
        className="password-rest"
        id="passwordRest"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
      >
        <div className="modal-dialog  shadow">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src="/img/svg/succefull.svg" alt="Succefull" />
              <h2>{local.passwordRestTitle[lang]}</h2>
              <p>{local.passwordRestContent[lang]}</p>
              <Link href="/login">
                <a className="btn btn-green btn-signin d-block w-100">{local.passwordRestbtn[lang]}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSuccess;
