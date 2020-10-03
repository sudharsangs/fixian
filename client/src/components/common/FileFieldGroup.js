import React from "react";
import classnames from "classnames";

const FileFieldGroup = ({
  name,
  placeholder,
  value,
  id,
  label,
  accept,
  onChange,
  disabled,
  required
}) => {
  return (
    <div className="form-group">
      {label ? <label>{label}</label> : null}
      <input
        type="file"
        className={classnames("form-control-file form-control-lg")}
        accept={accept}
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

FileFieldGroup.defaultProps = {
  type: "text"
};

export default FileFieldGroup;
