import React, { useRef, useState } from 'react';
import {QrReader} from 'react-qr-reader';
import "./styles.css";
import StopButton from '../StopButton/StopButton';

const QRCodeReader = ({isScannerVisible}) => {
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const [selected, setSelected] = useState("environment");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="qr-scanner">
      <div className="qr-scanner-frame">
        {isScannerVisible && (
        <>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }}
            legacyMode={true}
          />
          <StopButton/>
        </>
    )}
    {data !== "" && <p>{data}</p>}

      </div>
    </div>
  );
};

export default QRCodeReader;