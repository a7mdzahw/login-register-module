import React from "react";
import useLang from "../../context/LangContext";

const Input = ({ label, name, value, onChange, error, apiError = [], className, ...props }) => {
  const { lang, localErrs } = useLang();
  return (
    <div className="my-2">
      <label htmlFor={name} className={error || apiError.length > 0 ? "text-red-600 mb-1" : "mb-1"}>
        {label}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        type="text"
        onChange={onChange}
        {...props}
        autoFocus={error}
        className={
          error || apiError.length > 0 ? `${className} border border-danger form-control` : `${className} form-control`
        }
      />
      {error && <p className="text-danger">{error}</p>}
      {apiError.length > 0 && (
        <p className="text-danger">
          {apiError.map((apiErr) => (
            <strong key={apiErr.description}>{localErrs[apiErr.code][lang]}</strong>
          ))}
        </p>
      )}
    </div>
  );
};

export default Input;
