import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ContactManager from './ContactManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContactManager />
  </React.StrictMode>
);
