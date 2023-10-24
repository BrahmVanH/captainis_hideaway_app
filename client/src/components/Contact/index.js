import React from 'react';

import ContactForm from './Form';
import ContactInformation from './Information';
import './style.css'

export default function Contact() {
	return (
		<div
			className='card contact-card align-self-center col-6 d-flex flex-row align-items-center justify-content-around'>
			<ContactInformation />
			<ContactForm />
		</div>
	);
}
