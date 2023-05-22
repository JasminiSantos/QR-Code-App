// src/components/QrCode.js

import { useContext, useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from '../Assets/Logo-Desktop.svg';
import QRCodeReader from './QRCodeReader/QRCodeReader'
import ErrorModal from "./ErrorModal/ErrorModal";
import validator from 'validator'
import APIContext from "../ContextAPI/APIContext";

const QrCode = () => {
  // Properties and functions that handle the qr code generator
  const { isOpenModal, setIsOpenModal, isScannerVisible, setIsScannerVisible} = useContext(APIContext);
  const [url, setUrl] = useState("");
  const qrRef = useRef();
  const [isMobile, setIsMobile] = useState(false)

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  useEffect(() => {
    if (isMobileDevice()) {
      setIsMobile(true)
      console.log("it is a mobile device");
    } else {
      console.log("QR code reader is only available on mobile devices.");
    }
  }, []);

  // Properties and functions that handle the QR Code Generator
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

  // function that handles the button press to show qr code scanner
  const handleButtonPress = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      setIsScannerVisible(true);
    })
    .catch(function (error) {
      console.log('Error accessing camera:', error);
    });
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

  // Function that handle the error modal
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
            {isMobile && <>
              <button className="blue__button" type="button" onClick={handleButtonPress}>
                Read QR Code
              </button>
              {isOpenModal && <ErrorModal/>}
              <div className="scanner">
              {isScannerVisible && <QRCodeReader/>}
              </div>
            </>}
          </div>
        </form>
    </div>
  );
};

export default QrCode;
