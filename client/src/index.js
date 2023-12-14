import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
LogRocket.init('8ktxdj/captains_properties');

setupLogRocketReact(LogRocket);
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
