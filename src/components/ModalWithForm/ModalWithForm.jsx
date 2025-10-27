import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../images/close.png";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
  linkText,
  onLinkClick,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button
          className="modal__close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <img src={closeIcon} alt="" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {linkText && (
            <button type="button" className="modal__link" onClick={onLinkClick}>
              {linkText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
