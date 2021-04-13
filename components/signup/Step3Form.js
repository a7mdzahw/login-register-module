import React, { useState } from "react";
import getApiError from "../../lib/getApiError";
import getError from "../../lib/getError";

import Input from "../shared/Input";

const Step3Form = ({ error, body, apiErrors }) => {
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form action="/signup3" method="POST" noValidate>
      <Input
        name="companyName"
        label="Company Name"
        value={data.companyName}
        onChange={handleChange}
        error={getError(error, "companyName")}
        apiError={getApiError(apiErrors, "Company Name")}
      />
      <div className="d-flex gap-1 justify-content-between">
        <Input
          name="workField"
          label="Work Field"
          className="dim-label"
          placeholder="choose field"
          type="number"
          value={data.workField}
          onChange={handleChange}
          error={getError(error, "workField")}
          apiError={getApiError(apiErrors, "WorkField")}
        />
        <Input
          className="dim-label"
          placeholder="choose size"
          name="companySize"
          label="Company Size"
          type="number"
          value={data.companySize}
          onChange={handleChange}
          error={getError(error, "companySize")}
          apiError={getApiError(apiErrors, "CompanySize")}
        />
      </div>
      <Input
        name="subDomain"
        label="Subdomain Suggestion"
        value={data.subDomain}
        onChange={handleChange}
        error={getError(error, "subDomain")}
        apiError={getApiError(apiErrors, "SubDomain")}
      />
      <div style={{ margin: "50px 0" }}></div>
      <Input
        name="email"
        label="Email Address"
        value={data.email}
        onChange={handleChange}
        error={getError(error, "email")}
        apiError={getApiError(apiErrors, "Email")}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={getError(error, "password")}
        apiError={getApiError(apiErrors, "Password")}
      />
      <label className="fs-6">Use 8 or more characters with a mix of letters, numbers & symbols.</label>
      <Input
        name="confirmpassword"
        label="Confirm Password"
        value={data.confirmpassword}
        onChange={handleChange}
        error={getError(error, "confirmpassword")}
      />
      <button className="btn Rectangle-608 log-in d-block w-100">Let's Go</button>
    </form>
  );
};

export default Step3Form;
