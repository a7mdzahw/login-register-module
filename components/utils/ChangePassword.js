import React, { useState } from "react";

import getError from "../../lib/getError";
import Input from "../shared/Input";

const ChangePassword = ({ token, error, body }) => {
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  return (
    <div className="sm:mx-12 md:mx-auto md:max-w-6xl md:h-64  flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-10/12">
        <div className="div-space w-full md:w-1/2">
          <div className="signUp-content">
            <h1 className="title font-bold uppercase text-3xl text-gray-700">
              ENTER YOUR NEW PASSWORD
            </h1>
          </div>
        </div>
        <form className="w-full md:w-1/2" action={`/ChangePassword/${token}`} method="POST">
          <Input
            type="password"
            value={data.password}
            onChange={handleChange}
            error={getError(error, "password")}
            name="password"
            label="Password"
            placeholder="Enter Password"
          />
          <Input
            type="password"
            value={data.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            label="Confirm Password"
            error={getError(error, "confirmPassword")}
            placeholder="Confirm Password"
          />
          <button className="px-4 py-2 bg-blue-400 text-blue-100 rounded-lg w-full">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
