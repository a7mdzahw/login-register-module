import React, { useState } from "react";
import useLang from "../../context/LangContext";

import { client_error } from "lib";
import Input from "../shared/Input";

const ChangePassword = ({ token, error, body }) => {
  const { lang, local } = useLang();
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  return (
    <div className="signUp">
      <div className="row">
        <div className="col-xl-5 col-md-6 div-space">
          <div className="signUp-content">
            <h1 className="title">{local.changePasswordTitle[lang]}</h1>
          </div>
        </div>
        <form className="col-xl-4 col-md-6" action={`/ChangePassword/${token}`} method="POST">
          <Input
            type="password"
            value={data.password}
            onChange={handleChange}
            error={client_error(error, "password")}
            name="password"
            label={local.changePasswordPassword[lang]}
            placeholder={local.changePasswordPassword[lang]}
          />
          <Input
            type="password"
            value={data.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            label={local.changePasswordConfirmPassword[lang]}
            error={client_error(error, "confirmPassword")}
            placeholder={local.changePasswordConfirmPassword[lang]}
          />
          <button className="btn-submit d-block w-100 btn-blue mt-5">{local.changePasswordBtn[lang]}</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
