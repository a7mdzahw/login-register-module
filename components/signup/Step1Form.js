import React, { useState } from "react";
import Link from "next/link";

import Input from "../shared/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "../../lib/country";
import getError from "../../lib/getError";
import getApiError from "../../lib/getApiError";

const Step1Form = ({ error, body, apiErrors, phoneError, js }) => {
  const apiPhoneErr = getApiError(apiErrors, "Phone");
  const apiCountryErr = getApiError(apiErrors, "Country");
  const [data, setData] = useState({ ...body });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form action="/signup1" method="POST" noValidate>
        <Input
          name="fullName"
          placeholder="enter your name"
          type="text"
          label="Full Name"
          error={getError(error, "fullName")}
          value={data.fullName || ""}
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="countryCode" className="form-label">
            Country
          </label>
          <select
            name="countryCode"
            placeholder="choose country"
            className={
              getError(error, "countryCode")
                ? "form-select form-select-lg  border border-danger"
                : "form-select form-select-lg mb-3"
            }
            value={data.countryCode}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              choose country
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {getError(error, "countryCode") && <p className="text-danger">{getError(error, "countryCode")}</p>}
          {apiCountryErr && <p className="text-danger mt-1">{apiCountryErr.description}</p>}
        </div>
        <div className=" mb-3">
          <PhoneInput
            country={(data.countryCode && data.countryCode.toLowerCase()) || "eg"}
            name="phone"
            value={data.phone}
            onChange={(phone) => setData({ ...data, phone })}
            inputProps={{
              name: "phone",
              style: { width: "100%", height: "2.8rem", fontFamily: "Cairo" },
              required: true,
              className: phoneError ? "form-control border border-danger" : "form-control",
            }}
          />
          {phoneError && <p className="text-danger mt-1">Wrong Phone Format</p>}
          {apiPhoneErr && <p className="text-danger mt-1">{apiPhoneErr.description}</p>}
        </div>
        <button className="btn Rectangle-608 log-in d-block w-100">Submit</button>
        <div className="mt-2 text-center signup_text">
          already have an account?{" "}
          <Link href="/login">
            <a className="text-style-1">sign in</a>
          </Link>
        </div>
      </form>
      {js === "true" && (
        <noscript>
          <div className="alert alert-warning mt-2">
            <img src="/delet_trai_acc.svg" alt="alert" className="me-2" />
            Please enable javascript for better experience
            <form action="/signup" method="GET">
              <input className="visually-hidden" type="text" value="false" name="js" onChange={handleChange} />
              <button className="btn btn-danger mt-1 d-block w-100">Agree and Close</button>
            </form>
          </div>
        </noscript>
      )}
    </>
  );
};

export default Step1Form;
