import React from 'react';
import "./styles.css";
import { useState } from 'react';

const ErrorModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="error-modal">
      <h2>Invalid Link</h2>
      <p>Oops! The link you clicked is invalid.</p>
      <p>Please double-check the URL and try again.</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default ErrorModal;
