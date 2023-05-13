import React from "react";

const FormControl = ({ children, labelTitle, optionalLabel }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelTitle}</span>
        {optionalLabel ? (
          <span className="label-text opacity-60">( {optionalLabel} )</span>
        ) : null}
      </label>
      {children}
    </div>
  );
};

export default FormControl;
