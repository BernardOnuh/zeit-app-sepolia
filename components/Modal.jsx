// Modal.jsx
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Modal;
