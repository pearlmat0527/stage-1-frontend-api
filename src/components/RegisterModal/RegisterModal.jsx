import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import closeIcon from "../../images/close.svg"; // ✅ Changed to SVG

function RegisterModal({ isOpen, onClose, onSignInClick, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onRegister(email, password, username);
    setEmail("");
    setPassword("");
    setUsername("");
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setErrors({});
    onClose();
  };

  const handleSignInClick = () => {
    setShowSuccess(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setErrors({});
    onSignInClick();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors({ ...errors, username: "" });
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="modal" onClick={handleClose}>
        <div
          className="modal__container modal__container_success"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal__close"
            onClick={handleClose}
            type="button"
            aria-label="Close"
          >
            <img src={closeIcon} alt="Close" className="modal__close-icon" />{" "}
            {/* ✅ Added alt text */}
          </button>
          <h2 className="modal__title modal__title_success">
            Registration successfully completed!
          </h2>
          <button
            type="button"
            className="modal__link modal__link_success"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign up"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      linkText="or Sign in"
      onLinkClick={onSignInClick}
    >
      <label className="modal__label">Email</label>
      <input
        type="email"
        className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label className="modal__label">Password</label>
      <input
        type="password"
        className={`modal__input ${
          errors.password ? "modal__input_error" : ""
        }`}
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}

      <label className="modal__label">Username</label>
      <input
        type="text"
        className={`modal__input ${
          errors.username ? "modal__input_error" : ""
        }`}
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />
      {errors.username && (
        <span className="modal__error">{errors.username}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
