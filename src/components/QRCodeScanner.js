import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { BrowserQRCodeReader } from '@zxing/library';

const QRCodeScanner = () => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const reader = new BrowserQRCodeReader();

    const scanQRCode = async () => {
      const videoElement = webcamRef.current.video;
      const canvasElement = document.createElement('canvas');
      const context = canvasElement.getContext('2d');

      context.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const imageData = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const luminanceSource = new ZXing.ImageDataLuminanceSource(
        imageData.data,
        imageData.width,
        imageData.height
      );
      const binaryBitmap = new ZXing.BinaryBitmap(
        new ZXing.HybridBinarizer(luminanceSource)
      );

      try {
        const result = await reader.decode(binaryBitmap);
        console.log('Scanned QR code:', result.text);
        // Handle the scanned QR code result
      } catch (error) {
        // QR code not detected, or other error occurred
      }

      requestAnimationFrame(scanQRCode);
    };

    scanQRCode(); // Start scanning

    return () => {
      reader.reset(); // Clean up the reader when the component unmounts
    };
  }, []);

  return <Webcam ref={webcamRef} />;
};

export default QRCodeScanner;
