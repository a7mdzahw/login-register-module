import React from "react";

const Input = ({ label, name, value, onChange, error, apiError = [], className, ...props }) => {
  return (
    <div className="my-2">
      <label htmlFor={name}>{label}</label>
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
            <strong key={apiErr.description}>{apiErr.description}</strong>
          ))}
        </p>
      )}
    </div>
  );
};

export default Input;
