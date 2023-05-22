import React, { useState } from 'react';
import ApiContext from './APIContext';

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  // Propertires and functions that handle the error modal
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Properties and functions that handle the button click of scanner button
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  
  return (
    <ApiContext.Provider value={{ apiData, setApiData, isOpenModal, setIsOpenModal, isScannerVisible, setIsScannerVisible }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
