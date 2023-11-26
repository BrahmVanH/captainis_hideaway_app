import React from 'react';

import ContactForm from './Form';
import ContactInformation from './Information';
import './style.css';

export default function Contact() {
	return (
		<div className='card contact-card align-self-center col-lg-6 col-11 '>
			<h3 className='contact-header-text text-center mb-4'>Send A Message</h3>
			<p>For all booking inquiries, please call us directly.</p>
			<div className='d-flex flex-lg-row flex-column align-items-center justify-content-around'>
				<ContactInformation />
				<ContactForm />
			</div>
		</div>
	);
}
