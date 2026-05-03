import "./Input.scss";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      label = "",
      error = "",
      icon = null,
      value,
      onChange,
      disabled = false,
      required = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label className="input__label">
            {label}
            {required && <span className="input__required">*</span>}
          </label>
        )}

        <div className="input__container">
          {icon && <span className="input__icon">{icon}</span>}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`input ${icon ? "input--with-icon" : ""} ${
              error ? "input--error" : ""
            }`}
            {...props}
          />
        </div>

        {error && <span className="input__error">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
