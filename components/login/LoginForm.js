import React, { useState } from "react";
import Link from "next/link";

import Input from "../shared/Input";
import getError from "../../lib/getError";
import getApiError from "../../lib/getApiError";

const LoginForm = ({ error, body, apiErrors }) => {
  const [data, setData] = useState({ ...body, stayloggedin: (body && body.stayloggedin) || "" });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form action="/login" method="POST" noValidate style={{ minWidth: 450, maxWidth: 600 }}>
      <Input
        name="userName"
        label="Email"
        type="email"
        placeholder="add mail"
        error={getError(error, "userName")}
        value={data.userName}
        onChange={handleChange}
        apiError={getApiError(apiErrors, "UserName")}
      />
      <Input
        name="password"
        label="Password"
        placeholder="enter password"
        type="password"
        error={getError(error, "password")}
        value={data.password}
        onChange={handleChange}
        apiError={getApiError(apiErrors, "Password")}
      />
      <div className="d-flex justify-content-between">
        <div className="form-check mt-3">
          <input
            type="checkbox"
            name="stayloggedin"
            id="stayloggedin"
            className="form-check-input"
            checked={data.stayloggedin}
            onChange={(e) => setData({ ...data, stayloggedin: e.target.checked })}
          />
          <label htmlFor="stayloggedin" className="form-check-label fw-bold">
            Stay Logged In
          </label>
        </div>
        <Link href="/forget-password">
          <a className="fw-bold p-0 m-0 text-decoration-none">Forget Password ?</a>
        </Link>
      </div>

      <button className="btn  d-block w-100 my-2 Rectangle-608 log-in">Log In</button>
      <div className="mt-2 text-center signup_text">
        don't have an account yet ?{" "}
        <Link href="/signup">
          <a className="text-style-1">sign up</a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
