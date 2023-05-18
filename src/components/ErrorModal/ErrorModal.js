import React from 'react';
import "./styles.css";
import APIContext from '../../ContextAPI/APIContext';
import { useContext } from 'react';

const ErrorModal = () => {
  const { isOpenModal, setIsOpenModal} = useContext(APIContext);

  const handleClosedModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="error-modal">
      <h2>Invalid Link</h2>
      <p>Oops! The link you clicked is invalid.</p>
      <p>Please double-check the URL and try again.</p>
      <button onClick={handleClosedModal}>Close</button>
    </div>
  );
};

export default ErrorModal;
