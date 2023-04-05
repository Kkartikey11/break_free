import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextState from './components/sidebar/context/ContextState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextState>
    <App />
  </ContextState>
);

