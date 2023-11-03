import React from 'react';

import AboutCard from '../components/AboutCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
	return (
		<div>
			<div>
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
