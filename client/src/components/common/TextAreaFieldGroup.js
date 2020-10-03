import React from "react";
import classnames from "classnames";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  onChange,
  required
}) => {
  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <textarea
        className={classnames("form-control form-control-lg")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextAreaFieldGroup;
