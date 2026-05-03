import "./Loader.scss";

const Loader = ({
  size = "md",
  variant = "spinner",
  fullscreen = false,
  text = "",
}) => {
  return (
    <div className={`loader ${fullscreen ? "loader--fullscreen" : ""}`}>
      <div className={`loader__content loader__${size}`}>
        {variant === "spinner" && (
          <div className="loader__spinner">
            <div className="loader__spinner-circle" />
          </div>
        )}

        {variant === "dots" && (
          <div className="loader__dots">
            <span className="loader__dot"></span>
            <span className="loader__dot"></span>
            <span className="loader__dot"></span>
          </div>
        )}

        {variant === "bar" && (
          <div className="loader__bar">
            <div className="loader__bar-fill"></div>
          </div>
        )}

        {text && <p className="loader__text">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
