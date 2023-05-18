// src/components/QrCode.js

import { useState, useRef} from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from '../Assets/Logo-Desktop.svg';
import QRCodeReader from './QRCodeReader/QRCodeReader'
import ErrorModal from "./ErrorModal/ErrorModal";
import validator from 'validator'
import { useContext } from "react";
import APIContext from "../ContextAPI/APIContext";
import axios from "axios";

const QrCode = () => {
  // Properties and functions that handle the qr code generator
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  const handleDownloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const handleQRCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#ffffff"}
      level="H"
    />
  );

  // Properties and functions that handle the button click of scanner button
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleButtonPress = () => {
    setIsScannerVisible(true);
  };

  // Properties and functions that handle the url validation and error messages
  const [errorMessage, setErrorMessage] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validator.isURL(url)) {
      setErrorMessage('Is Valid URL')
      handleDownloadQRCode(e)
      console.log(errorMessage)
    } else {
      setErrorMessage('Is Not Valid URL')
      handleOpenModal()
      console.log(errorMessage)
    }
  };

  // Properties and functions that handle the error modal

  const { isOpenModal, setIsOpenModal} = useContext(APIContext);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };


  return (
    <div className="qrcode__container">
       <div className="qrcode" ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
          <input
            id="urlInput"
            type="text"
            value={url}
            onChange={handleQRCodeEncoder}
            placeholder="https://jasminisantos.netlify.app/"
          />
          <div className="button__container">
            <button className="dark__button" type="submit" disabled={!url}>
              Download QR code
            </button>
            <button className="blue__button" type="button" onClick={handleButtonPress}>
              Read QR Code
            </button>
            <div className="scanner">
              {isScannerVisible && <QRCodeReader isScannerVisible={isScannerVisible}/>}
              {isOpenModal && <ErrorModal/>}
            </div>
          </div>
        </form>
    </div>
  );
};

export default QrCode;
