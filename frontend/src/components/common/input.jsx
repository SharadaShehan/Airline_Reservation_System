import React from "react";

const Input = ({ name, label, value, type, onChange, focus, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        name={name}
        value={value}
        id={name}
        autoFocus={focus}
        type={type}
        className="form-control"
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
