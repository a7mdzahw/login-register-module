import React, { useState } from "react";
import Link from "next/link";
import local from "../../public/assets/Localization.json";

import Input from "../shared/Input";
import getError from "../../lib/getError";
import getApiError from "../../lib/getApiError";
import useLang from "../../context/LangContext";

const LoginForm = ({ error, body, apiErrors }) => {
  const { lang, local } = useLang();
  const [data, setData] = useState({ ...body, stayloggedin: (body && body.stayloggedin) || "" });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form action="/login" method="POST" noValidate>
      <div className="login-input">
        <p id="e"></p>
        <Input
          name="userName"
          label={local.loginEmail[lang]}
          type="email"
          placeholder={local.loginEmailPlacHolder[lang]}
          error={getError(error, "userName")}
          value={data.userName}
          onChange={handleChange}
          apiError={getApiError(apiErrors, "UserName")}
        />
        <Input
          name="password"
          label={local.loginPassword[lang]}
          placeholder={local.loginPasswordPlacHolder[lang]}
          type="password"
          error={getError(error, "password")}
          value={data.password}
          onChange={handleChange}
          apiError={getApiError(apiErrors, "Password")}
        />
      </div>
      <div className="div-remember">
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="stayloggedin"
              id="stayloggedin"
              className="form-check-input rounded-0"
              checked={data.stayloggedin}
              onChange={(e) => setData({ ...data, stayloggedin: e.target.checked })}
            />
            <label htmlFor="stayloggedin" className="title">
              {local.loginStaySigned[lang]}
            </label>
          </label>
        </div>
        <Link href="/forget-password">
          <a className="forget">{local.loginForgetPassword[lang]}</a>
        </Link>
      </div>
      <div className="btn-submit d-flex flex-column">
        <button className="btn-login btn-block btn-blue">{local.loginBtn[lang]}</button>
        <p>
          {local.loginDontHaveAcc[lang]}
          {"  "}
          <Link href="/signup">
            <a className="text-decoration-none"> {local.loginSignUp[lang]}</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
