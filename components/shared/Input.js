import React from "react";
import useLang from "../../context/LangContext";

const ErrorMessage = ({ error, apiError }) => {
  const { lang, localErrs } = useLang();
  return (
    <>
      {error && (
        <p className="text-danger" style={{ fontSize: "14px" }}>
          {error}
        </p>
      )}
      {apiError.length > 0 && (
        <p className="text-danger">
          {apiError.map((apiErr) => (
            <strong key={apiErr.description}>{localErrs[apiErr.code][lang]}</strong>
          ))}
        </p>
      )}
    </>
  );
};

const Input = ({ label, name, value, onChange, error, type, apiError = [], className, ...props }) => {
  if (type === "select") {
    return (
      <div className="select-div">
        <label className={error || apiError.length > 0 ? "text-danger labelName" : "labelName"}>{label}</label>
        <select
          id={name}
          name={name}
          value={value}
          defaultValue="none"
          onChange={onChange}
          {...props}
          className={error || apiError.length > 0 ? `${className} border border-danger input` : `${className} input`}
        >
          <option disabled value="none">
            {props.placeholder}
          </option>
          {props.workfields
            ? props.workfields.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.workField}
                  </option>
                );
              })
            : props.companysizes?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.range}
                  </option>
                );
              })}
        </select>
        <ErrorMessage error={error} apiError={apiError} />
      </div>
    );
  }
  return (
    <div className="input-div">
      <label htmlFor={name} className={error || apiError.length > 0 ? "text-danger labelName" : "labelName"}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        type={type || "text"}
        onChange={onChange}
        {...props}
        autoFocus={error}
        className={error || apiError.length > 0 ? `${className} border border-danger input` : `${className} input`}
      />
      <ErrorMessage error={error} apiError={apiError} />
    </div>
  );
};

export default Input;
