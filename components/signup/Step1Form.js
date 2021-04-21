import React, { useState } from "react";
import Link from "next/link";

import Input from "../shared/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "../../lib/country";
import getError from "../../lib/getError";
import getApiError from "../../lib/getApiError";
import useLang from "../../context/LangContext";

const Step1Form = ({ error, body, apiErrors, phoneError, js }) => {
  const { lang, local } = useLang();
  const apiPhoneErr = getApiError(apiErrors, "Phone");
  const apiCountryErr = getApiError(apiErrors, "Country");
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form action="/signup1" method="POST" noValidate className="w-100">
        <Input
          name="fullName"
          type="text"
          label={local.signupFullName[lang]}
          error={getError(error, "fullName")}
          value={data.fullName || ""}
          onChange={handleChange}
        />
        <div className="input-div">
          <label htmlFor="countryCode" className="labelName">
            {local.signupCountry[lang]}
          </label>
          <select
            name="countryCode"
            placeholder="select country"
            style={{ border: 0 }}
            className={
              getError(error, "countryCode")
                ? "form-select form-select-lg  border border-danger"
                : "form-select form-select-lg mb-3"
            }
            defaultValue="none"
            value={data.countryCode}
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
          {getError(error, "countryCode") && <p className="text-danger">{local.signupErrCountry[lang]}</p>}
          {apiCountryErr && <p className="text-danger mt-1">{apiCountryErr.description}</p>}
        </div>
        <div className=" mb-3 input-div">
          <label htmlFor="phone-input" className="labelName">
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
              className: phoneError ? "form-control border border-danger" : "form-control",
            }}
          />
          {phoneError && <p className="text-danger mt-1">{local.signupErrPhone[lang]}</p>}
          {apiPhoneErr && <p className="text-danger mt-1">{apiPhoneErr.description}</p>}
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

export default Step1Form;
