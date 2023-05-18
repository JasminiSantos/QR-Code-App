import React, { useState } from 'react';
import ApiContext from './APIContext';

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <ApiContext.Provider value={{ apiData, setApiData, isOpenModal, setIsOpenModal }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
