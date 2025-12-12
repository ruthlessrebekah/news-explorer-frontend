// ModalWithForm.jsx
import React, { useEffect, useCallback } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, onClose }) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose && onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!onClose) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, onClose]);

  // Close when clicking the backdrop (but not when clicking inside the modal)
  const handleBackdropMouseDown = (e) => {
    if (e.currentTarget === e.target) {
      onClose && onClose();
    }
  };

  return (
    <div
      className="ModalWithForm"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdropMouseDown}
    >
      {children}
    </div>
  );
}

export default ModalWithForm;
