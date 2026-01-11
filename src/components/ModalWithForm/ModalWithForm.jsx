// ModalWithForm.jsx
// Note: This implementation assumes single modal usage.
// For nested modals, consider implementing a modal stack manager
// to coordinate focus management between modal instances.

import { useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./ModalWithForm.css";

function ModalWithForm({ children, onClose, ariaLabel }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus management and focus trap
  useEffect(() => {
    // Store the currently focused element to restore later
    previousFocusRef.current = document.activeElement;

    // Query all focusable elements within the modal
    // Performance note: For modals with 100+ focusable elements,
    // consider memoizing focusableElements with cache invalidation
    const getFocusableElements = () => {
      if (!modalRef.current) return [];
      const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(
        modalRef.current.querySelectorAll(focusableSelectors)
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
    };

    const focusableElements = getFocusableElements();

    // Focus first focusable element, or the modal itself if none exist
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else if (modalRef.current) {
      modalRef.current.focus();
    }

    // Handle focus trap on Tab key
    const handleTabKey = (e) => {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      // Shift + Tab on first element -> cycle to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element -> cycle to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        handleTabKey(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: restore focus to previous element
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Safety check: ensure element still exists in DOM before focusing
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  // Close on Escape key
  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  // Close when clicking the backdrop (but not when clicking inside the modal)
  const handleBackdropMouseDown = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className="ModalWithForm"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      tabIndex={-1}
      onMouseDown={handleBackdropMouseDown}
    >
      {children}
    </div>
  );
}

ModalWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
};

export default ModalWithForm;
