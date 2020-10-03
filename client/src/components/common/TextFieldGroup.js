import React from "react";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  id,
  label,
  type,
  onChange,
  disabled,
  required
}) => {
  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <input
        type={type}
        className={classnames("form-control form-control-lg")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        id={id}
      />
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
