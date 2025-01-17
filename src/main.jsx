import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import useCountryStore from './store/countryStore';

// Apply dark mode from store on initial load
const darkMode = useCountryStore.getState().darkMode;
if (darkMode) {
  document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);