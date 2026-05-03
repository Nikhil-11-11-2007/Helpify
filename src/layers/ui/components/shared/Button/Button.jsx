import "./Button.scss";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="btn__loader">
          <span className="btn__loader-dot"></span>
          <span className="btn__loader-dot"></span>
          <span className="btn__loader-dot"></span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
