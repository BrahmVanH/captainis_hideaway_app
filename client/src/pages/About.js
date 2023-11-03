import React, { useLayoutEffect, useRef } from 'react';

import AboutCard from '../components/AboutCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { createScrollSmoother } from '../utils/gsapHelpers';

function About() {
	const main = useRef();
	const smoother = useRef();

	useLayoutEffect(() => {
		createScrollSmoother(main, smoother);
	}, []);

	return (
		<div ref={main} id='smooth-wrapper'>
			<div id='smooth-content'>
				<Navbar />
				<div className='d-flex justify-content-center' style={{ width: '100%' }}>
					<AboutCard />
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default About;
