import React from 'react';

import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './Contact.css';

function ContactPage() {
	const getWindowHeight = () => {
		console.log(window.innerHeight);
	};
	getWindowHeight();
	return (
		<div>
			<div>
				<Navbar />
				<div className='contact-container'>
					<Contact />
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default ContactPage;
