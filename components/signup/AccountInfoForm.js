import React, { useState } from "react";
import useLang from "../../context/LangContext";
import { client_error, api_error } from "lib";
import Input from "../shared/Input";
import * as http from "lib/http";

export const email_validation = (email) => {
  const regularExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExp.test(String(email).toLowerCase());
};

const AccountInfoForm = ({ error, body, apiErrors, workfields, companySizeData }) => {
  const { lang, local } = useLang();
  const [domainErr, setDomainErr] = useState(false);
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleCheckSubdomain = async () => {
    setDomainErr(false);
    try {
      const res = await http.company.post(`/Comapny/CheckAvailableSubDomain?SubDomain=${data.subDomain}`);
      if (res.data.state.code === "Status-System-1013") return;
      setDomainErr(res.data.response);
    } catch (err) {}
  };

  return (
    <form action="/account_info" method="POST" noValidate>
      <Input
        name="companyName"
        label={local.accountInfoCompnayName[lang]}
        value={data.companyName || ""}
        placeholder={local.accountInfoCompnayName[lang]}
        onChange={handleChange}
        error={client_error(error, "companyName")}
        apiError={api_error(apiErrors, "Company Name")}
      />
      <div className="div-colum">
        <Input
          name="workField"
          workfields={workfields}
          label={local.accountInfoField[lang]}
          className="dim-label"
          placeholder="Company Field"
          type="select"
          value={data.workField}
          onChange={handleChange}
          error={client_error(error, "workField")}
          apiError={api_error(apiErrors, "WorkField")}
        />
        <Input
          name="companySize"
          label={local.accountInfoCompanySize[lang]}
          type="select"
          companysizes={companySizeData}
          placeholder="Company size"
          className="dim-label"
          value={data.companySize}
          onChange={handleChange}
          error={client_error(error, "companySize")}
          apiError={api_error(apiErrors, "CompanySize")}
        />
      </div>
      <Input
        name="subDomain"
        onBlur={handleCheckSubdomain}
        label={local.accountInfoSubDomin[lang]}
        value={data.subDomain || ""}
        placeholder="dexef112.dexeferp.net"
        onChange={handleChange}
        error={client_error(error, "subDomain")}
        apiError={api_error(apiErrors, "SubDomain")}
      />
      {domainErr && (
        <p className="text-danger">
          ALready Exists Try: <span className="fw-bold">{domainErr}</span>
        </p>
      )}
      <Input
        name="email"
        label={local.accountInfoEmail[lang]}
        placeholder="mailbox@mail.com"
        value={data.email || ""}
        onChange={handleChange}
        error={client_error(error, "email")}
        apiError={api_error(apiErrors, "Email")}
      />
      <Input
        name="password"
        label={local.accountInfoPassword[lang]}
        type="password"
        placeholder={local.accountInfoPlacPassword[lang]}
        value={data.password || ""}
        onChange={handleChange}
        info={local.accountInfoPasswordInfo[lang]}
        error={client_error(error, "password")}
        apiError={api_error(apiErrors, "Password")}
      />
      <Input
        name="confirmpassword"
        type="password"
        label={local.accountInfoConfirmPassword[lang]}
        placeholder={local.accountInfoPlacConfirmPassword[lang]}
        value={data.confirmpassword || ""}
        onChange={handleChange}
        error={client_error(error, "confirmpassword")}
      />
      <button className="btn-go btn-block btn-blue d-block w-100">{local.accountInfoBtn[lang]}</button>
    </form>
  );
};

export default AccountInfoForm;

// const emailHandler = (e, inputName) => {
//   let email = e.target.value;
//   let validEmail = email_validation(email);

//   validEmail
//     ? http.post(`/CheckEmailNotExist?Email=${email}`).then((res) => {
//         console.log("Email result: ", res.data);
//         let noErrorsExisting = methods.response_has_errors(res.data);
//         if (noErrorsExisting) {
//           document.getElementById("email").classList.remove("error");
//           this.setState({ [inputName]: true });
//         }
//       })
//     : this.setState({ [inputName]: validEmail });
// };
