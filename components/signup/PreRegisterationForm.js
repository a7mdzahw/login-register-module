import React, { useState } from "react";
import Link from "next/link";

import Input from "../shared/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "../../public/assets/countries";
import { client_error, api_error } from "lib";
import useLang from "../../context/LangContext";

const PreRegisterationForm = ({ error, body, apiErrors, phoneError, js }) => {
  const { lang, local } = useLang();
  const apiPhoneErr = api_error(apiErrors, "Phone");
  const apiCountryErr = api_error(apiErrors, "Country");
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form action="/pre_register" method="POST" noValidate className="w-100">
        <Input
          name="fullName"
          label={local.signupFullName[lang]}
          placeholder={local.signupFullName[lang]}
          error={client_error(error, "fullName")}
          value={data.fullName || ""}
          onChange={handleChange}
        />
        <div className="select-div">
          <label
            htmlFor="countryCode"
            className={client_error(error, "countryCode") || apiCountryErr ? "error labelName" : "labelName"}
          >
            {local.signupCountry[lang]}
          </label>
          <select
            name="countryCode"
            placeholder="select country"
            className={
              client_error(error, "countryCode") || apiCountryErr ? "dim-label border-red input " : "dim-label input"
            }
            value={data.countryCode || "none"}
            onChange={handleChange}
          >
            <option value="none" disabled>
              {local.signupErrCountry[lang]}
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {client_error(error, "countryCode") && <p className="textError">{local.signupErrCountry[lang]}</p>}
          {apiCountryErr && <p className="textError">{apiCountryErr.description}</p>}
        </div>
        <div className=" mb-3 input-div">
          <label htmlFor="phone-input" className={phoneError || apiPhoneErr ? "error labelName" : "labelName"}>
            {local.signupPhoneNumber[lang]}
          </label>
          <PhoneInput
            country={data.countryCode?.toLowerCase() || "eg"}
            name="phone"
            value={data.phone}
            specialLabel=""
            onChange={(phone) => setData({ ...data, phone })}
            inputProps={{
              name: "phone",
              style: { width: "100%", fontFamily: "cairo-regular", height: "3rem" },
              required: true,
              id: "phone-input",
              className: phoneError || apiPhoneErr ? "form-control border-red" : "form-control",
            }}
          />
          <span className="info"> {local.signupPhoneInfo[lang]}</span>
          {phoneError && <p className="textError">{local.signupErrPhone[lang]}</p>}
          {apiPhoneErr && <p className="textError">{apiPhoneErr.description}</p>}
        </div>
        <p className="terms">
          {local.signupTerms1[lang]}{" "}
          <a href="/terms" target="_blank" className="text-decoration-none">
            {local.signupTerms2[lang]}
          </a>{" "}
          {local.signupTerms3[lang]}{" "}
          <a href="/conditions" target="_blank" className="text-decoration-none">
            {local.signupTerms4[lang]}
          </a>
          .
        </p>
        <button className="btn-submit btn-block btn-blue d-block w-100">{local.signupBtn[lang]}</button>
        <h6 className="haveAccount">
          {local.signupHaveAccount[lang]}{" "}
          <Link href="/login">
            <a className="text-decoration-none">{local.signupLogin[lang]}</a>
          </Link>
        </h6>
      </form>
    </>
  );
};

export default PreRegisterationForm;
