// src/components/QrCode.js

import { useState, useRef} from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from '../images/Logo-Desktop.svg';

function isValidURL(url) {
  var pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return pattern.test(url);
}

function checkURLExists(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error(error);
      return false;
    });
}

const QrCode = () => {
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

  return (
    <div className="qrcode__container">
       <div className="qrcode" ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleDownloadQRCode}>
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
            <button className="blue__button" type="file" accept="image/*" capture>
              Read QR Code
            </button>
          </div>
        </form>
    </div>
  );
};

export default QrCode;
