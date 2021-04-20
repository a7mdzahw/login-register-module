import React, { useState } from "react";
import useLang from "../../context/LangContext";
import getApiError from "../../lib/getApiError";
import getError from "../../lib/getError";

import Input from "../shared/Input";

const Step3Form = ({ error, body, apiErrors }) => {
  const { lang, local } = useLang();
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form action="/signup3" method="POST" noValidate>
      <Input
        name="companyName"
        label={local.accountInfoCompnayName[lang]}
        value={data.companyName || ""}
        onChange={handleChange}
        error={getError(error, "companyName")}
        apiError={getApiError(apiErrors, "Company Name")}
      />
      <div className="d-flex gap-1 justify-content-between">
        <Input
          name="workField"
          label={local.accountInfoField[lang]}
          className="dim-label"
          placeholder="choose field"
          type="number"
          value={data.workField || ""}
          onChange={handleChange}
          error={getError(error, "workField")}
          apiError={getApiError(apiErrors, "WorkField")}
        />
        <Input
          className="dim-label"
          placeholder="choose size"
          name="companySize"
          label={local.accountInfoCompanySize[lang]}
          type="number"
          value={data.companySize || ""}
          onChange={handleChange}
          error={getError(error, "companySize")}
          apiError={getApiError(apiErrors, "CompanySize")}
        />
      </div>
      <Input
        name="subDomain"
        label={local.accountInfoSubDomin[lang]}
        value={data.subDomain || ""}
        onChange={handleChange}
        error={getError(error, "subDomain")}
        apiError={getApiError(apiErrors, "SubDomain")}
      />
      <div style={{ margin: "50px 0" }}></div>
      <Input
        name="email"
        label={local.accountInfoEmail[lang]}
        value={data.email || ""}
        onChange={handleChange}
        error={getError(error, "email")}
        apiError={getApiError(apiErrors, "Email")}
      />
      <Input
        name="password"
        label={local.accountInfoPassword[lang]}
        type="password"
        value={data.password || ""}
        onChange={handleChange}
        error={getError(error, "password")}
        apiError={getApiError(apiErrors, "Password")}
      />
      <label className="fs-6">{local.accountInfoPasswordInfo[lang]}</label>
      <Input
        name="confirmpassword"
        type="password"
        label={local.accountInfoConfirmPassword[lang]}
        value={data.confirmpassword || ""}
        onChange={handleChange}
        error={getError(error, "confirmpassword")}
      />
      <button className="btn Rectangle-608 log-in d-block w-100">{local.accountInfoBtn[lang]}</button>
    </form>
  );
};

export default Step3Form;
