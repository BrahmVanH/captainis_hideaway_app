import React from 'react';
import ReactDOM from 'react-dom/client';

import LogRocket from 'logrocket';

import App from './App';
import './index.css';

import setupLogRocketReact from 'logrocket-react';
LogRocket.init('8ktxdj/captains_properties');

setupLogRocketReact(LogRocket);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

