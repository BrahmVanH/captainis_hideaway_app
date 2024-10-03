import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from '../src/utils/reportWebVitals';
// import ReactGA from 'react-ga';


import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// ReactGA.initialize('G-EM82CEXTEB');

// reportWebVitals((metric) => {
// 	ReactGA.send({
// 		hitType: 'event',
// 		eventCategory: 'Web Vitals',
// 		eventAction: metric.name,
// 		eventValue: Math.round(metric.value),
// 		nonInteraction: true,
// 	});
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

