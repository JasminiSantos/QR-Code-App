import React, { useRef, useState } from 'react';
import {QrReader} from 'react-qr-reader';
import "./styles.css";
import StopButton from '../StopButton/StopButton';
import { useContext } from "react";
import APIContext from '../../ContextAPI/APIContext';

const QRCodeReader = () => {
  //const [startScan, setStartScan] = useState(false);
  //const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const { isScannerVisible, setIsScannerVisible} = useContext(APIContext);

  const handleScan = async (scanData) => {
    //setLoadingScan(true); 
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      //setStartScan(false);
      //setLoadingScan(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  // this function is used to handle the result of qr code reader
  const handleResult = (result) => {
    if(result != null){
      const link = result['text']
      setData(link)
      setTimeout(function() {
        window.location.href = link;
      }, 3000);
    }
  };

  const handleCloseModal = (event) => {
    setIsScannerVisible(false)
  }

  return (
    <div className="qr-scanner-frame">
    {isScannerVisible && (
    <div className='scanner'>
      <QrReader
          facingMode={"environment"}
          delay={1000}
          onError={handleError}
          onScan={handleScan}
          onResult={handleResult}
          // chooseDeviceId={()=>selected}
          style={{ width: "300px" }}
          legacyMode={true}
        />
      <div className='button-container'>
        <StopButton onClick={handleCloseModal}/>
      </div>
      {data !== "" && 
      <div className='link-container'>
        <p>You can acess the link below:</p>
        <a className='link' href={data}>{data}</a>
      </div>
      }
    </div>
    )}

  </div>
  );
};

export default QRCodeReader;