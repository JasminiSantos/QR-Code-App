import React from "react";
import { FaStop } from "react-icons/fa";
import "./styles.css";

const StopButton = ({ onClick }) => {
  return (
    <button className="stop-button" onClick={onClick}>
      <FaStop className="stop-icon" />
    </button>
  );
};

export default StopButton;