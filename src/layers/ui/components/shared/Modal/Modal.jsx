import "./Modal.scss";
import { useEffect } from "react";

const Modal = ({
  isOpen = false,
  onClose,
  title = "",
  children,
  footer = null,
  size = "md",
  closeButton = true,
  backdrop = true,
  className = "",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdrop) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal modal--${size} ${className}`}>
        {/* Header */}
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          {closeButton && (
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal__body">{children}</div>

        {/* Footer */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
