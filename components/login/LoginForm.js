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
    <form action="/login" method="POST" noValidate style={{ minWidth: 450, maxWidth: 600 }}>
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
      <div className="flex items-center justify-between">
        <div className="form-check">
          <input
            type="checkbox"
            name="stayloggedin"
            id="stayloggedin"
            className="form-check-input"
            checked={data.stayloggedin}
            onChange={(e) => setData({ ...data, stayloggedin: e.target.checked })}
          />
          <label htmlFor="stayloggedin" className="form-check-label fw-bold">
            {local.loginStaySigned[lang]}
          </label>
        </div>
        <Link href="/forget-password">
          <a className="fw-bold p-0 m-0 text-decoration-none">{local.loginForgetPassword[lang]}</a>
        </Link>
      </div>

      <button className="btn d-block w-100 my-2 Rectangle-608 log-in">{local.loginBtn[lang]}</button>
      <div className="mt-2 text-center signup_text">
        {local.loginDontHaveAcc[lang]}{" "}
        <Link href="/signup">
          <a className="text-style-1">{local.loginSignUp[lang]}</a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
