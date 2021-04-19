import React, { useState } from "react";
import useLang from "../../context/LangContext";

import getError from "../../lib/getError";
import Input from "../shared/Input";

const ChangePassword = ({ token, error, body }) => {
  const { lang, local } = useLang();
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  return (
    <div className="sm:mx-12 lg:mx-auto lg:max-w-7xl lg:h-64 lg:pt-40  flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-10/12">
        <div className="div-space w-full md:w-1/2">
          <div className="signUp-content">
            <h1 className="title font-bold uppercase text-3xl text-gray-700">{local.changePasswordTitle[lang]}</h1>
          </div>
        </div>
        <form className="w-full md:w-1/2" action={`/ChangePassword/${token}`} method="POST">
          <Input
            type="password"
            value={data.password}
            onChange={handleChange}
            error={getError(error, "password")}
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
            error={getError(error, "confirmPassword")}
            placeholder={local.changePasswordConfirmPassword[lang]}
          />
          <button className="px-4 py-2 bg-blue-400 text-blue-100 rounded-lg w-full">
            {local.changePasswordBtn[lang]}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
