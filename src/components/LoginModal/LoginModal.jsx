import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onSignUpClick, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onLogin function passed from App.jsx
    onLogin(email, password);
    // Clear form after submission
    setEmail("");
    setPassword("");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      buttonText="Sign in"
      onSubmit={handleSubmit}
      linkText="or Sign up"
      onLinkClick={onSignUpClick}
    >
      <label className="modal__label">Email</label>
      <input
        type="email"
        className="modal__input"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="modal__label">Password</label>
      <input
        type="password"
        className="modal__input"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
