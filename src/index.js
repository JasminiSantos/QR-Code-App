import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApiProvider from './ContextAPI/APIProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiProvider>
    <App />
  </ApiProvider>
);
