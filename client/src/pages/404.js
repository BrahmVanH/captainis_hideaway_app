import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

const NotFound = () => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	const notFoundImage = '../assets/img/NotFoundImage.png';
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100vw', height: '100vh' }}>
			<img alt='australian shepherd dog in brush with lake in background' style={{ maxWidth: '25%', transform: 'translateX("-200px")' }} src={notFoundImage} />
			<h1>404</h1>
			<h3>You look lost,</h3>
			<h5>better head back...</h5>
		</div>
	);
};

export default NotFound;
