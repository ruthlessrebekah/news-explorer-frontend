// SuccessModal.jsx
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import closeIcon from "../../assets/images/close-icon-white.png";
import "./SuccessModal.css";

function SuccessModal({ onClose, onSignIn }) {
  return (
    <ModalWithForm onClose={onClose}>
      <div className="SuccessModal">
        <button onClick={onClose} className="SuccessModal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="SuccessModal__title">
          Registration successfully completed!
        </h2>
        <button
          type="button"
          onClick={onSignIn}
          className="SuccessModal__signin-link"
        >
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default SuccessModal;
